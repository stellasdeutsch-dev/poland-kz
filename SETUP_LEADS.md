# Подключение заявок: Google Таблица + Telegram + WhatsApp

Каждая заявка с квиза и формы попадает в **одну Google Таблицу** (это база) и
сразу приходит в **Telegram** и **WhatsApp**. Токены хранятся только в скрипте,
на сайте их нет.

```
Сайт (GitHub Pages)  ──POST──▶  Google Apps Script  ──▶  Google Таблица (база)
                                                      ├─▶  Telegram
                                                      └─▶  WhatsApp (Meta Cloud API)
```

---

## Шаг 1. Google Таблица + скрипт

1. Создайте таблицу: [sheets.new](https://sheets.new). Назовите, например, `Заявки PolskaWay`.
2. В таблице: **Расширения → Apps Script**.
3. Удалите содержимое `Code.gs` и вставьте код из файла
   [`apps-script/Code.gs`](apps-script/Code.gs) этого репозитория. Сохраните (Ctrl/Cmd+S).

> Лист `Leads` с заголовками создаётся автоматически при первой заявке.

---

## Шаг 2. Секреты (Script Properties)

В Apps Script: **слева ⚙ Project Settings → Script Properties → Add script property**.
Добавьте по строке на каждый ключ:

| Property           | Значение                                                            |
| ------------------ | ------------------------------------------------------------------- |
| `TELEGRAM_TOKEN`   | токен бота от [@BotFather](https://t.me/BotFather)                   |
| `TELEGRAM_CHAT_ID` | id чата, куда слать заявки (см. Шаг 3)                               |
| `WA_TOKEN`         | access token WhatsApp Cloud API (Шаг 4)                             |
| `WA_PHONE_ID`      | Phone number ID из кабинета Meta (Шаг 4)                            |
| `WA_RECIPIENT`     | номер получателя, только цифры: `77769771878`                       |
| `WA_TEMPLATE`      | (опц.) имя одобренного шаблона; пусто = обычный текст в 24-ч окне    |
| `WA_LANG`          | (опц.) язык шаблона, по умолчанию `ru`                              |

> ⚠️ Токен бота, что вы прислали в чат, **никогда не вставляйте в код сайта** —
> только сюда. Если сомневаетесь, что он утёк, сделайте `/revoke` в @BotFather и
> впишите новый.

---

## Шаг 3. Telegram chat_id

1. Создайте бота (если ещё нет) у [@BotFather](https://t.me/BotFather) → получите токен → впишите в `TELEGRAM_TOKEN`.
2. Куда слать заявки:
   - **Себе в личку:** напишите боту любое сообщение, затем откройте
     `https://api.telegram.org/bot<ТОКЕН>/getUpdates` — там будет `"chat":{"id": ...}`.
   - **В группу команды:** добавьте бота в группу, напишите там сообщение, откройте тот же
     `getUpdates`, возьмите отрицательный `id` группы.
3. Впишите это число в `TELEGRAM_CHAT_ID`.

---

## Шаг 4. WhatsApp Business API (Meta Cloud API)

1. [developers.facebook.com](https://developers.facebook.com) → создайте App типа **Business**.
2. Добавьте продукт **WhatsApp** → раздел **API Setup**. Там сразу есть тестовый номер,
   временный **Access token** и **Phone number ID** → впишите в `WA_TOKEN` и `WA_PHONE_ID`.
3. В **API Setup** добавьте номер-получатель (ваш WhatsApp) в список разрешённых и подтвердите кодом.
4. **Шаблон уведомления** (нужен, чтобы писать первым вне 24-ч окна):
   WhatsApp Manager → **Message templates** → New → категория **Utility**.
   Тело с двумя переменными, например:
   ```
   Новая заявка с сайта. Имя: {{1}}. Телефон: {{2}}.
   ```
   После одобрения впишите имя шаблона в `WA_TEMPLATE`, а язык — в `WA_LANG`.
5. Временный токен живёт ~24 часа. Для постоянной работы выпустите **permanent token**
   (System User в Business Settings) и обновите `WA_TOKEN`.

> Если оставить `WA_TEMPLATE` пустым — уйдёт обычный текст, но WhatsApp доставит его
> только если получатель писал боту за последние 24 часа. Для надёжных уведомлений
> менеджеру используйте шаблон.

---

## Шаг 5. Опубликовать скрипт

1. Apps Script: **Deploy → New deployment → ⚙ → Web app**.
2. **Execute as:** Me. **Who has access:** Anyone.
3. **Deploy** → разрешите доступ к аккаунту → скопируйте **Web app URL** (`.../exec`).
4. Проверка: откройте этот URL в браузере — должно показать `{"ok":true,"status":"lead endpoint alive"}`.

> Меняли код? Каждый раз делайте **Deploy → Manage deployments → ✎ → Version: New** —
> иначе правки не применятся.

---

## Шаг 6. Вставить адрес в сайт

Откройте [`src/lib/leads.ts`](src/lib/leads.ts) и замените заглушку:

```ts
const LEAD_ENDPOINT_FALLBACK = "https://script.google.com/macros/s/AKfyc.../exec";
```

Затем закоммитьте и запушьте — GitHub Actions пересоберёт сайт:

```bash
git add -A && git commit -m "feat: подключить приём заявок" && git push
```

Альтернатива (без правки кода): задать переменную окружения `VITE_LEAD_ENDPOINT`
в окружении сборки.

---

## Шаг 7. Проверка

1. Откройте сайт, пройдите квиз и оставьте телефон.
2. В Google Таблице появилась новая строка.
3. В Telegram пришло сообщение с заявкой.
4. В WhatsApp пришло уведомление (или строка ошибки в Apps Script → **Executions**, если шаблон/токен не настроены).

Пока адрес не вставлен, сайт работает как обычно, а заявки пишутся в консоль браузера
(F12 → Console) — ничего не теряется во время настройки.
