# PolskaWay — лендинг «Поступление в вузы Польши без ЕНТ»

Продающий одностраничный лендинг для образовательного агентства, которое помогает
казахстанцам поступать в университеты Польши **без ЕНТ и без отработки**.

Дизайн в стиле Skillbox: чистый белый фон, крупная жирная типографика, скруглённые
карточки, точечные сочные акценты. Mobile-first.

## Стек

- **React + Vite + TypeScript** — SPA, один роут, секции скроллом
- **Tailwind CSS v4** — дизайн-токены в `@theme` (`src/index.css`)
- **lucide-react** — иконки
- Анимации — на чистом CSS (keyframes + transitions), без сторонних библиотек

## Запуск

```bash
npm install
npm run dev      # дев-сервер на http://localhost:5173
npm run build    # прод-сборка в dist/
npm run preview  # просмотр прод-сборки
```

## Структура

```
src/
  content.ts            # ← ВЕСЬ текст, цифры и цены в одном месте (правь здесь)
  index.css             # дизайн-токены, палитра, типографика, утилиты, анимации
  App.tsx               # сборка секций по порядку
  lib/scroll.ts         # плавный скролл к якорям
  components/
    PromoBar, Header, Hero, Quiz, ForWhom, WhyPoland, AdmissionPaths,
    Specialties, Process, Cases, Pricing, ParentPeace, Trust, FAQ,
    FinalForm, Footer, FloatingContact, MobileStickyCTA
    ui.tsx              # Section / SectionHead / Reveal
    Icon.tsx            # резолвер иконок по имени из content.ts
```

### Как менять контент

Все тексты, цены, кейсы, FAQ и контакты вынесены в [`src/content.ts`](src/content.ts).
Меняй цифры/цены/телефоны там — компоненты подтянут автоматически.

Контакты-плейсхолдеры (замени на реальные) — объект `site` в начале `content.ts`:
`whatsapp`, `telegram`, `instagram`, `phoneDisplay`, `email`.

### Формы

Квиз и обе формы сейчас отправляют заявку в заглушку (`console.log`).
Точки подключения помечены комментарием `// Заглушка:` в `Quiz.tsx` и `FinalForm.tsx` —
подставь туда Telegram-бот / CRM-webhook.

## Чеклист перед запуском рекламы

- [ ] Заменить плейсхолдеры на реальные цифры/цены/кейсы и контакты (`content.ts`)
- [ ] Подключить квиз и формы к приёмнику (Telegram-бот / CRM-webhook / email)
- [ ] Реальные фото студентов/команды вместо градиентных плейсхолдеров (`Cases.tsx`)
- [ ] Юр. реквизиты: ИП/ТОО, договор-оферта, политика конфиденциальности (`Footer.tsx`)
- [ ] Пиксели аналитики: Meta Pixel + Google Analytics/Tag Manager
- [ ] Проверить актуальные визовые требования консульств Польши
- [ ] Домен + хостинг (Vercel — быстро для Vite/React)
- [ ] PageSpeed: сжать картинки, lazy-load
- [ ] A/B-тест заголовка hero

> CTR-решения уже заложены: главный CTA = квиз «Оценить шансы», мессенджеры в hero +
> плавающая кнопка, sticky-CTA снизу на мобиле, трио цифр, гарантия «или вернём взнос»,
> лид-магнит «гайд в подарок», рассрочка Kaspi в промо-плашке.
