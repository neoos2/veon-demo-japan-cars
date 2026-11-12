// E2E smoke for the demo homepage. Uses puppeteer-core + Chrome from ~/.veon/tools (no project dependency).
// Usage: node tests/e2e/smoke.mjs http://localhost:4321/
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";

const tools = path.join(os.homedir(), ".veon", "tools");
const require = createRequire(path.join(tools, "package.json"));
const puppeteer = require("puppeteer-core");
let chrome = process.env.CHROME_PATH;
try { chrome ||= JSON.parse(fs.readFileSync(path.join(os.homedir(), ".veon", "env.json"), "utf8")).chrome_path; } catch { /* default below */ }
const url = process.argv[2] || "http://localhost:4321/";
const H1 = "Запчастини для японських і корейських авто з підбором за VIN";
const SECTIONS = ["hero", "vin", "brands", "groups", "delivery", "guarantee", "faq", "contacts"];
let failed = 0;
const ok = (cond, name) => { console.log(`${cond ? "PASS" : "FAIL"} ${name}`); if (!cond) failed += 1; };

const browser = await puppeteer.launch({ executablePath: chrome || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
try {
  for (const w of [320, 375, 390, 768, 1024, 1440]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w < 768 ? 812 : 900 });
    await page.goto(url, { waitUntil: "networkidle0" });
    const r = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
      out: [...document.querySelectorAll("header a, header button:not([hidden]), .hero a, .mbar a")].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.left < 0 || b.right > innerWidth); }).length,
    }));
    ok(r.sw <= r.cw, `${w}px: no horizontal scroll (${r.sw}/${r.cw})`);
    ok(r.out === 0, `${w}px: header, hero and bar controls inside the screen`);
    await page.close();
  }
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(url, { waitUntil: "networkidle0" });
  ok((await page.$eval("h1", (e) => e.textContent.replace(/\s+/g, " ").trim())) === H1, "H1 text matches veon-concept");
  ok(JSON.stringify(await page.$$eval("main > section", (s) => s.map((x) => x.id))) === JSON.stringify(SECTIONS), "sections in concept order");
  const hrefs = await page.$$eval("a[href]", (a) => a.map((x) => x.getAttribute("href")));
  ok(!hrefs.some((h) => /japan-cars\.com\.ua/i.test(h) && !h.startsWith("mailto:")), "no links to the current client site");
  ok(hrefs.includes("tel:+380636776563") && hrefs.includes("https://t.me/japancarscomuabot"), "call and Telegram links present");
  ok(await page.$eval("a[href^='tel:'].btn--primary", (e) => e.getBoundingClientRect().bottom < innerHeight), "390: call button in the first screen");
  // VIN field
  await page.click("#vin-input");
  await page.keyboard.type("jtmbfrev1hj000001");
  await new Promise((r) => setTimeout(r, 450));
  ok((await page.$eval("#vin-status", (e) => e.textContent)).includes("17 з 17"), "VIN: 17 characters accepted");
  ok(await page.$eval("[data-vin-mail]", (e) => !e.hidden && e.href.includes("JTMBFREV1HJ000001")), "VIN: mailto carries the VIN");
  await page.keyboard.press("Backspace"); await page.keyboard.type("O");
  await new Promise((r) => setTimeout(r, 200));
  ok((await page.$eval("#vin-status", (e) => e.textContent)).includes("I, O і Q"), "VIN: O rejected");
  // menu
  await page.click(".menu-toggle");
  ok(!(await page.$eval("#menu", (e) => e.hidden)), "menu opens");
  await page.keyboard.press("Escape");
  ok(await page.$eval("#menu", (e) => e.hidden), "menu closes on Esc");
  // FutureLink and FAQ
  ok(await page.$$eval(".future-link", (f) => f.every((x) => x.getAttribute("aria-disabled") === "true" && !x.hasAttribute("href"))), "FutureLink inactive");
  ok(await page.$$eval("details .answer", (a) => a.every((x) => x.textContent.trim().length > 20)), "FAQ answers present in HTML");
} finally {
  await browser.close();
}
console.log(failed ? `RESULT: FAIL (${failed})` : "RESULT: PASS");
process.exit(failed ? 1 : 0);
