import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type IconName = string;

const BALLOON_EMOJIS = ["🎈", "🎀", "✨", "🎊", "🎉", "💜", "💗", "🌟"];

function FloatingBalloon({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <div className="floating-balloon" style={style}>
      {emoji}
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-purple-200/40" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="logo-text text-2xl font-black">🎈 ШарБум</div>
        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          {[["catalog", "Каталог"], ["sets", "Наборы"], ["delivery", "Доставка"], ["reviews", "Отзывы"], ["faq", "FAQ"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-link text-gray-600 hover:text-purple-600 transition-colors">
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+78001234567" className="hidden sm:flex items-center gap-1 font-bold text-purple-700 text-sm">
            <Icon name="Phone" size={15} /> 8-800-123-45-67
          </a>
          <button onClick={() => scrollTo("contacts")} className="btn-glow text-sm font-bold px-4 py-2 rounded-full text-white">
            Заказать
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const balloons = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    emoji: BALLOON_EMOJIS[i % BALLOON_EMOJIS.length],
    style: {
      left: `${5 + i * 6.5}%`,
      animationDuration: `${6 + (i % 5) * 1.8}s`,
      animationDelay: `${-(i * 0.9)}s`,
      fontSize: `${28 + (i % 4) * 14}px`,
      opacity: 0.18 + (i % 3) * 0.07,
    } as React.CSSProperties,
  }));

  return (
    <section className="hero-section relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="balloons-container">
        {balloons.map((b) => <FloatingBalloon key={b.id} emoji={b.emoji} style={b.style} />)}
      </div>
      <div className="absolute inset-0 hero-mesh" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="hero-left">
          <div className="inline-flex items-center gap-2 badge-yellow mb-6 text-sm font-black px-4 py-2 rounded-full">
            ⚡ Доставка за 2 часа по всему городу
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            Шары, которые<br />
            <span className="text-gradient-yellow">взрывают</span><br />
            <span className="text-pink-300">настроение</span> 🎉
          </h1>
          <p className="text-lg text-purple-200 mb-8 leading-relaxed max-w-md">
            Воздушные шары с гелием и доставкой — для дней рождений, свадеб, корпоративов и просто так. Оформляем любые праздники!
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["🎯 Гарантия качества", "🚀 Доставка 2 часа", "💝 Бесплатный монтаж", "📦 От 1 шара"].map((g) => (
              <span key={g} className="guarantee-chip text-white text-xs font-bold px-3 py-1.5 rounded-full">{g}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })} className="btn-glow text-white font-black text-lg px-8 py-4 rounded-full shadow-2xl">
              🎈 Смотреть каталог
            </button>
            <button onClick={() => document.getElementById("calc")?.scrollIntoView({ behavior: "smooth" })} className="btn-glass text-white font-bold text-base px-6 py-4 rounded-full">
              🧮 Калькулятор
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <div className="hero-image-wrap relative">
            <img
              src="https://cdn.poehali.dev/projects/c53a333a-40b6-492a-8c34-6115fdc41e8d/files/71381a93-0d19-41af-a950-77689f4b4c8b.jpg"
              alt="Шары ШарБум"
              className="hero-img rounded-3xl shadow-2xl"
            />
            <div className="floating-card card-one">
              <span className="text-2xl">🎈</span>
              <div>
                <div className="text-xs text-gray-500 font-semibold">Новинка</div>
                <div className="text-sm font-black text-gray-800">Фольга сердечко</div>
                <div className="text-pink-600 font-black text-sm">от 290 ₽</div>
              </div>
            </div>
            <div className="floating-card card-two">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="text-xs text-gray-500 font-semibold">Рейтинг</div>
                <div className="text-sm font-black text-gray-800">4.9 / 5.0</div>
                <div className="text-purple-600 font-black text-xs">847 отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const catalogItems = [
  { emoji: "🎈", name: "Воздушные шары", desc: "Латексные с гелием, любые цвета", price: "от 35 ₽", tag: "Хит" },
  { emoji: "⭐", name: "Фольгированные", desc: "Звёзды, сердца, цифры, буквы", price: "от 190 ₽", tag: "Популярно" },
  { emoji: "🎊", name: "Гирлянды", desc: "Арки и гирлянды из шаров", price: "от 1500 ₽", tag: "" },
  { emoji: "🌟", name: "Баблс", desc: "Прозрачные шары с конфетти", price: "от 350 ₽", tag: "Новинка" },
  { emoji: "💝", name: "Цифры из шаров", desc: "Большие фольгированные цифры", price: "от 450 ₽", tag: "" },
  { emoji: "🎀", name: "Тематические", desc: "По любому поводу и персонажу", price: "от 250 ₽", tag: "Хит" },
];

function Catalog() {
  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-header text-center mb-14">
          <div className="section-badge mb-4">🎈 Каталог</div>
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
            Шары для <span className="text-gradient-main">любого повода</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Более 500 видов шаров в наличии. Доставляем в любую точку города за 2 часа.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogItems.map((item) => (
            <div key={item.name} className="catalog-card group relative bg-white rounded-3xl p-6 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100 cursor-pointer">
              {item.tag && <span className="absolute top-4 right-4 badge-tag text-xs font-black px-3 py-1 rounded-full">{item.tag}</span>}
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-purple-700 font-black text-lg">{item.price}</span>
                <button className="btn-small text-white font-bold px-4 py-2 rounded-full text-sm">Заказать</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sets = [
  { name: "День рождения", emoji: "🎂", items: ["20 латексных шаров", "3 фольгированные звезды", "Гирлянда-буквы «С ДР»", "Доставка и надувание"], price: "2 490 ₽", color: "from-pink-500 to-rose-400" },
  { name: "Романтика", emoji: "💕", items: ["15 красных шаров", "2 фольгированных сердца", "Светящиеся шарики", "Доставка и оформление"], price: "3 190 ₽", color: "from-purple-500 to-pink-500", popular: true },
  { name: "Корпоратив", emoji: "🏆", items: ["50 шаров в цветах бренда", "Арка из шаров", "Фотозона", "Монтаж на месте"], price: "7 900 ₽", color: "from-blue-500 to-purple-500" },
];

function Sets() {
  return (
    <section id="sets" className="py-24 bg-light-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-header text-center mb-14">
          <div className="section-badge mb-4">🎁 Наборы</div>
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
            Готовые <span className="text-gradient-main">праздничные наборы</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Всё включено — выбери набор и мы привезём в нужное время</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sets.map((set) => (
            <div key={set.name} className={`set-card relative rounded-3xl overflow-hidden shadow-xl ${"popular" in set && set.popular ? "ring-4 ring-pink-400 scale-105" : ""}`}>
              {"popular" in set && set.popular && <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 badge-popular text-white text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap">🔥 Самый популярный</div>}
              <div className={`bg-gradient-to-br ${set.color} p-8 text-center`}>
                <div className="text-6xl mb-2">{set.emoji}</div>
                <h3 className="text-2xl font-black text-white">{set.name}</h3>
              </div>
              <div className="bg-white p-6">
                <ul className="space-y-3 mb-6">
                  {set.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 text-sm font-semibold">
                      <span className="text-green-500 font-black">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black text-gradient-main">{set.price}</div>
                  <button className="btn-glow text-white font-bold px-5 py-2.5 rounded-full text-sm">Выбрать</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const [area, setArea] = useState(20);
  const [density, setDensity] = useState<"low" | "medium" | "high">("medium");
  const [deliveryZone, setDeliveryZone] = useState<"1" | "2" | "3">("1");

  const densityMap = { low: 2.5, medium: 4.5, high: 7 };
  const deliveryCost: Record<string, number> = { "1": 299, "2": 499, "3": 799 };

  const balloonCount = Math.ceil(area * densityMap[density]);
  const balloonCost = balloonCount * 45;
  const total = balloonCost + deliveryCost[deliveryZone];

  return (
    <section id="calc" className="py-24 calc-section relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="section-header text-center mb-14">
          <div className="section-badge-light mb-4">🧮 Калькулятор</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Рассчитай <span className="text-yellow-300">стоимость</span> сам
          </h2>
          <p className="text-purple-300 text-lg">Укажи площадь помещения и мы посчитаем нужное количество шаров</p>
        </div>

        <div className="calc-card rounded-3xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="block text-white font-black mb-3 text-lg">
                  📐 Площадь помещения: <span className="text-yellow-300">{area} м²</span>
                </label>
                <input
                  type="range" min={5} max={200} value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="calc-slider w-full"
                />
                <div className="flex justify-between text-purple-300 text-xs mt-1">
                  <span>5 м²</span><span>200 м²</span>
                </div>
              </div>

              <div>
                <label className="block text-white font-black mb-3 text-lg">🎈 Плотность оформления</label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { key: "low", label: "Лёгкое", emoji: "😌", desc: "Несколько акцентов" },
                    { key: "medium", label: "Среднее", emoji: "😊", desc: "Красиво и ярко" },
                    { key: "high", label: "Пышное", emoji: "🤩", desc: "Максимум шаров" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setDensity(opt.key)}
                      className={`density-btn rounded-2xl p-3 text-center transition-all ${density === opt.key ? "density-active" : ""}`}
                    >
                      <div className="text-2xl">{opt.emoji}</div>
                      <div className="text-white font-bold text-xs mt-1">{opt.label}</div>
                      <div className="text-purple-300 text-xs">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-black mb-3 text-lg">🚗 Зона доставки</label>
                <div className="space-y-2">
                  {([
                    { key: "1", label: "Центр города", price: "299 ₽", time: "~45 мин" },
                    { key: "2", label: "Спальные районы", price: "499 ₽", time: "~1.5 часа" },
                    { key: "3", label: "Пригород", price: "799 ₽", time: "~2.5 часа" },
                  ] as const).map((zone) => (
                    <button
                      key={zone.key}
                      onClick={() => setDeliveryZone(zone.key)}
                      className={`zone-btn w-full flex items-center justify-between rounded-xl px-4 py-3 transition-all ${deliveryZone === zone.key ? "zone-active" : ""}`}
                    >
                      <span className="text-white font-semibold text-sm">{zone.label}</span>
                      <div className="text-right">
                        <div className="text-yellow-300 font-black text-sm">{zone.price}</div>
                        <div className="text-purple-300 text-xs">{zone.time}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="result-panel rounded-2xl p-6 mb-6">
                <h3 className="text-white font-black text-lg mb-6 text-center">📊 Результат расчёта</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-purple-500/30">
                    <span className="text-purple-200 font-semibold">Площадь</span>
                    <span className="text-white font-black">{area} м²</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-purple-500/30">
                    <span className="text-purple-200 font-semibold">Количество шаров</span>
                    <span className="text-yellow-300 font-black text-xl">~{balloonCount} шт</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-purple-500/30">
                    <span className="text-purple-200 font-semibold">Стоимость шаров</span>
                    <span className="text-white font-black">{balloonCost.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-purple-500/30">
                    <span className="text-purple-200 font-semibold">Доставка</span>
                    <span className="text-white font-black">{deliveryCost[deliveryZone]} ₽</span>
                  </div>
                  <div className="flex justify-between items-center py-4 bg-yellow-400/10 rounded-xl px-4">
                    <span className="text-white font-black text-lg">ИТОГО</span>
                    <span className="text-yellow-300 font-black text-3xl">{total.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button className="btn-glow w-full text-white font-black text-lg py-4 rounded-full">
                  🎈 Заказать {balloonCount} шаров
                </button>
                <p className="text-purple-300 text-xs text-center">Финальная цена зависит от выбранных шаров. Менеджер уточнит детали.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Delivery() {
  const steps = [
    { num: "01", emoji: "📱", title: "Оформи заказ", desc: "Позвони или напиши нам — расскажи о своём празднике" },
    { num: "02", emoji: "🎨", title: "Согласуем оформление", desc: "Подберём шары, цвета и стиль под твой праздник" },
    { num: "03", emoji: "🚗", title: "Доставим и оформим", desc: "Привезём и надуем шары прямо на месте в нужное время" },
    { num: "04", emoji: "🎉", title: "Ты счастлив!", desc: "Праздник удался — гарантируем восторг гостей" },
  ];

  return (
    <section id="delivery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-header text-center mb-14">
          <div className="section-badge mb-4">🚗 Доставка</div>
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
            Как это <span className="text-gradient-main">работает</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Всё просто — от заказа до праздника за 4 шага</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="relative bg-white rounded-3xl p-6 border border-purple-100 text-center hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-100 transition-all duration-300">
              <div className="text-5xl font-black text-purple-100 mb-2">{step.num}</div>
              <div className="text-4xl mb-3">{step.emoji}</div>
              <h3 className="text-lg font-black text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "Clock", label: "Доставка", value: "от 2 часов" },
            { icon: "MapPin", label: "Зона доставки", value: "весь город" },
            { icon: "Package", label: "Минимум заказа", value: "1 шар" },
            { icon: "Star", label: "Опыт работы", value: "7 лет" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 bg-purple-50 rounded-2xl p-5 text-center">
              <Icon name={item.icon} size={24} className="text-purple-500" />
              <div className="text-xs text-gray-500 font-semibold">{item.label}</div>
              <div className="text-lg font-black text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { name: "Анастасия К.", event: "День рождения", text: "Заказала шары на день рождения дочки — привезли вовремя, красиво надули, девочки были в восторге! Точно буду заказывать ещё.", stars: 5, emoji: "👩‍🦱" },
  { name: "Михаил Д.", event: "Корпоратив", text: "Оформили офис к корпоративу — шары в цветах компании, арка, фотозона. Всё профессионально и быстро.", stars: 5, emoji: "👨‍💼" },
  { name: "Юля и Саша", event: "Свадьба", text: "Украсили зал шарами — это было что-то невероятное! Все гости фотографировались. Спасибо огромное!", stars: 5, emoji: "👰" },
  { name: "Татьяна М.", event: "Детский праздник", text: "Быстро, красиво, недорого. Заказывала уже третий раз. Дети всегда в восторге от шаров с персонажами.", stars: 5, emoji: "👩" },
  { name: "Денис Р.", event: "Предложение руки", text: "Помогли с сюрпризом для любимой — шары с запиской внутри. Она была в слезах от счастья 😭❤️", stars: 5, emoji: "🧔" },
  { name: "Ольга П.", event: "Выпускной", text: "Заказала для школы на выпускной. Менеджер помог выбрать цвета, монтаж сделали за час. Всё отлично!", stars: 5, emoji: "👩‍🏫" },
];

function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-light-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-header text-center mb-14">
          <div className="section-badge mb-4">⭐ Отзывы</div>
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
            Нам <span className="text-gradient-main">доверяют</span> 2000+ клиентов
          </h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="flex">{[1,2,3,4,5].map(i => <span key={i} className="text-2xl">⭐</span>)}</div>
            <span className="text-2xl font-black text-gray-800">4.9</span>
            <span className="text-gray-500">• 847 отзывов</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white rounded-3xl p-6 border border-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100 transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => <span key={i} className="text-yellow-400">⭐</span>)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5 font-medium">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{r.emoji}</div>
                <div>
                  <div className="font-black text-gray-900 text-sm">{r.name}</div>
                  <div className="text-purple-500 text-xs font-semibold">{r.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Как быстро вы доставляете шары?", a: "Стандартная доставка — 2 часа с момента оформления заказа. Есть экспресс-доставка за 1 час (+200 ₽ к стоимости доставки)." },
  { q: "Сколько держатся шары с гелием?", a: "Латексные шары с гелием держатся 12–24 часа. Фольгированные — от 5 до 10 дней. Мы используем Hi-Float для продления жизни шаров." },
  { q: "Можно ли сделать заказ на завтра?", a: "Конечно! Вы можете оформить заказ с доставкой на конкретное время — хоть сегодня, хоть через неделю." },
  { q: "Вы надуваете шары на месте?", a: "Да, наш мастер приедет с оборудованием и надует все шары прямо на месте праздника. Надувание включено в стоимость." },
  { q: "Можно ли указать конкретное время доставки?", a: "Да, при оформлении заказа вы указываете желаемое время. Мы стараемся точно его соблюдать." },
  { q: "Есть ли минимальная сумма заказа?", a: "Минимальная сумма заказа — 500 ₽. Мы работаем даже с маленькими заказами — от 1 шара!" },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="section-header text-center mb-14">
          <div className="section-badge mb-4">❓ FAQ</div>
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
            Частые <span className="text-gradient-main">вопросы</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open === i ? "border-purple-300 shadow-md shadow-purple-100" : "border-gray-200"}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-black text-gray-900 text-sm pr-4">{faq.q}</span>
                <span className={`text-purple-500 font-black text-xl transition-transform duration-300 flex-shrink-0 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed font-medium border-t border-purple-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="py-24 contacts-section relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="section-badge-light mb-6">📞 Контакты</div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Готовы сделать<br />
          <span className="text-yellow-300">твой праздник</span> незабываемым!
        </h2>
        <p className="text-purple-200 text-lg mb-12 max-w-xl mx-auto">Свяжись с нами любым удобным способом — ответим за 5 минут</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: "Phone", label: "Телефон", value: "8-800-123-45-67", sub: "Бесплатно, 8:00–22:00" },
            { icon: "MessageCircle", label: "WhatsApp", value: "+7 (999) 123-45-67", sub: "Напиши прямо сейчас" },
            { icon: "MapPin", label: "Адрес", value: "ул. Праздничная, 7", sub: "Самовывоз возможен" },
          ].map((c) => (
            <div key={c.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Icon name={c.icon} size={28} className="text-yellow-300 mx-auto mb-3" />
              <div className="text-white font-black mb-1">{c.label}</div>
              <div className="text-yellow-200 font-bold text-sm mb-1">{c.value}</div>
              <div className="text-purple-300 text-xs">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-xl mx-auto">
          <h3 className="text-white font-black text-xl mb-6">✉️ Оставить заявку</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Ваше имя" className="contact-input w-full rounded-xl px-4 py-3 text-white placeholder-purple-300 text-sm font-semibold" />
            <input type="tel" placeholder="Телефон" className="contact-input w-full rounded-xl px-4 py-3 text-white placeholder-purple-300 text-sm font-semibold" />
            <textarea placeholder="Расскажите о своём празднике..." rows={3} className="contact-input w-full rounded-xl px-4 py-3 text-white placeholder-purple-300 text-sm font-semibold resize-none" />
            <button className="btn-yellow w-full font-black text-gray-900 text-lg py-4 rounded-full">
              🎈 Отправить заявку
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark py-10 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="logo-text text-2xl font-black mb-3">🎈 ШарБум</div>
        <p className="text-purple-400 text-sm mb-4">Шары с доставкой за 2 часа • 7 лет на рынке • 2000+ довольных клиентов</p>
        <div className="flex justify-center gap-6 text-purple-500 text-xs font-semibold flex-wrap">
          <span>© 2024 ШарБум</span>
          <span>•</span>
          <span>Политика конфиденциальности</span>
          <span>•</span>
          <span>Договор оферты</span>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="sharboom">
      <Header />
      <Hero />
      <Catalog />
      <Sets />
      <Calculator />
      <Delivery />
      <Reviews />
      <FAQ />
      <Contacts />
      <Footer />
    </div>
  );
}