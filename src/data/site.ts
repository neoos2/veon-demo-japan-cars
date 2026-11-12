// Contacts and facts of Japan Cars — only from veon/client.json (see veon/client-digest.md).
export interface Phone { label: string; href: string; }

export const phones: Phone[] = [
  { label: "(063) 677-65-63", href: "tel:+380636776563" },
  { label: "(066) 692-37-24", href: "tel:+380666923724" },
  { label: "(067) 445-45-96", href: "tel:+380674454596" },
];
export const mainPhone = phones[0];
export const telegram = "https://t.me/japancarscomuabot";
export const email = "info@japan-cars.com.ua";
export const mapUrl = "https://maps.app.goo.gl/kovGNkjq6WxaLq4g7";
export const address = "Київ, вул. Вишгородська, 52";
export const hours = "пн–пт 09:00–19:00, сб–нд 10:00–16:00";
export const NOTE = "Розділ у розробці";

const mailBody = ["VIN: ", "Марка, модель, рік: ", "Перелік і кількість деталей: ", "Ваш телефон: "].join("\n");
export const mailtoVin = `mailto:${email}?subject=${encodeURIComponent("Підбір за VIN")}&body=${encodeURIComponent(mailBody)}`;

export const navAnchors = [
  { href: "#vin", label: "Підбір за VIN" },
  { href: "#brands", label: "Марки" },
  { href: "#groups", label: "Що замовляють" },
  { href: "#delivery", label: "Доставка" },
  { href: "#guarantee", label: "Гарантія" },
  { href: "#contacts", label: "Контакти" },
];

export const brandsJ = ["Toyota", "Nissan", "Mitsubishi", "Mazda", "Honda", "Lexus", "Subaru", "Suzuki", "Infiniti", "Acura", "Daihatsu", "Isuzu"];
export const brandsK = ["Hyundai", "KIA", "SsangYong", "Daewoo"];

export const popularGroups = ["Олива й фільтри", "Гальмівні колодки й диски", "Повітряний фільтр", "Сайлентблоки", "Свічки", "Амортизатори"];
export const catalogGroups = [
  "Запчастини для ТО", "Гальмівна система", "Двигун",
  "Підвіска і кермо", "КПП і зчеплення", "Охолодження і кондиціонування",
  "Електрика і освітлення", "Кузов і скло", "Оливи та рідини",
];

export interface Faq { q: string; a: string[]; }
export const faqs: Faq[] = [
  {
    q: "Де знайти VIN автомобіля?",
    a: [
      "VIN завжди є в техпаспорті авто. Також його вибивають на деяких елементах кузова і вказують на табличці під лобовим склом.",
      "Це 17 букв і цифр, серед яких не буває літер I, O і Q.",
    ],
  },
  {
    q: "Чи можна приїхати до вас в офіс?",
    a: [
      "Так, у Києві на вул. Вишгородській, 52, але тільки за попереднім погодженням: асортимент в офісі не зберігається. Подзвоніть менеджеру перед візитом.",
    ],
  },
  {
    q: "Як замовити запчастини?",
    a: [
      "Якщо номер деталі відомий, назвіть його менеджеру будь-яким зручним способом: телефоном, у Telegram або листом.",
      "Якщо номера немає, надішліть VIN і перелік деталей. Менеджер безкоштовно підбере їх за дилерськими каталогами. Замовлення з-за кордону — за передоплатою.",
    ],
  },
  {
    q: "Чи доставляєте по Україні?",
    a: [
      "Так, Новою Поштою. Вартість доставки не входить у ціну товару: її визначає перевізник, а оплачуєте ви при отриманні у відділенні.",
    ],
  },
  {
    q: "Чи можна надіслати перелік деталей на e-mail?",
    a: [
      "Так. Напишіть на info@japan-cars.com.ua: VIN, марку, модель і рік авто, перелік і кількість деталей та свій телефон для зв’язку.",
    ],
  },
];
