# Подключение заявок: Google Таблица + Telegram

Каждая заявка с квиза и формы попадает в **одну Google Таблицу** (это база) и сразу
приходит в **Telegram**. Токен бота хранится только в скрипте, на сайте его нет.

```
Сайт (GitHub Pages)  ──POST──▶  Google Apps Script  ──▶  Google Таблица (база)
                                                      └─▶  Telegram
```

Таблица: <https://docs.google.com/spreadsheets/d/1M_Io_Yumspp6AH0zFGbkUFvdWaWFIT22oZ9bJUIMuhs/edit>
Бот: **@Polsha_uchebaBOT**

---

## Шаг 1. Привязать скрипт к таблице

1. Откройте вашу таблицу (ссылка выше).
2. **Расширения → Apps Script**.
3. Удалите содержимое `Code.gs` и вставьте код из [`apps-script/Code.gs`](apps-script/Code.gs)
   этого репозитория. Сохраните (Ctrl/Cmd+S).

> Лист `Leads` с заголовками создаётся автоматически при первой заявке.

---

## Шаг 2. Секреты (Script Properties)

В Apps Script: слева **⚙ Project Settings → Script Properties → Add script property**.
Добавьте две строки:

| Property           | Значение                                              |
| ------------------ | ----------------------------------------------------- |
| `TELEGRAM_TOKEN`   | токен бота от [@BotFather](https://t.me/BotFather)    |
| `TELEGRAM_CHAT_ID` | id чата, куда слать заявки (см. Шаг 3)                |

> ⚠️ Токен вставляйте **только сюда**, никогда в код сайта. Если сомневаетесь, что он
> утёк, сделайте `/revoke` в @BotFather и впишите новый.

---

## Шаг 3. Telegram chat_id

1. Откройте бота **[@Polsha_uchebaBOT](https://t.me/Polsha_uchebaBOT)** и нажмите **Start**
   (или напишите любое сообщение).
   - Хотите, чтобы заявки падали **в группу команды** — создайте группу, добавьте туда
     бота и напишите там любое сообщение.
2. Узнать `chat_id`:
   - **Просто скажите мне «написал боту»** — я заберу ваш `chat_id` автоматически, или
   - вручную: откройте `https://api.telegram.org/bot<ТОКЕН>/getUpdates` →
     найдите `"chat":{"id": ...}` (для группы id будет отрицательным).
3. Впишите это число в `TELEGRAM_CHAT_ID` (Шаг 2).

---

## Шаг 4. Опубликовать скрипт

1. Apps Script: **Deploy → New deployment → ⚙ → Web app**.
2. **Execute as:** Me. **Who has access:** Anyone.
3. **Deploy** → разрешите доступ к аккаунту → скопируйте **Web app URL** (`.../exec`).
4. Проверка: откройте этот URL в браузере — должно показать
   `{"ok":true,"status":"lead endpoint alive"}`.

> Меняли код? Каждый раз делайте **Deploy → Manage deployments → ✎ → Version: New** —
> иначе правки не применятся.

---

## Шаг 5. Вставить адрес в сайт

Откройте [`src/lib/leads.ts`](src/lib/leads.ts) и замените заглушку:

```ts
const LEAD_ENDPOINT_FALLBACK = "https://script.google.com/macros/s/AKfyc.../exec";
```

Затем закоммитьте и запушьте — GitHub Actions пересоберёт сайт:

```bash
git add -A && git commit -m "feat: подключить приём заявок" && git push
```

> Можете прислать мне ваш `/exec` URL — я вставлю его в код, закоммичу и запушу за вас.

---

## Шаг 6. Проверка

1. Откройте сайт, пройдите квиз и оставьте телефон.
2. В Google Таблице появилась новая строка.
3. В Telegram пришло сообщение с заявкой.

Пока адрес не вставлен, сайт работает как обычно, а заявки пишутся в консоль браузера
(F12 → Console) — ничего не теряется во время настройки.
