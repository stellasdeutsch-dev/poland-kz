# Деплой на Cloudflare Pages

Сайт можно держать на Cloudflare Pages (быстрый CDN, бесплатно, удобные кастомные домены).
Проект уже подготовлен: на Cloudflare он раздаётся с корня домена (`/`), а GitHub Pages
продолжает работать из `/poland-kz/` — ничего не сломано, можно держать оба или оставить один.

```
GitHub репозиторий  ──push──▶  Cloudflare Pages  ──build (npm run build)──▶  poland-kz.pages.dev
```

---

## Способ A — через панель Cloudflare + GitHub (рекомендую)

Cloudflare сам собирает сайт при каждом `git push`. Настраивается один раз.

### Шаги
1. Зайдите на **[dash.cloudflare.com](https://dash.cloudflare.com)** (зарегистрируйтесь, если нет аккаунта — бесплатно).
2. Слева **Workers & Pages** → **Create** → вкладка **Pages** → **Connect to Git**.
3. Нажмите **Connect GitHub**, авторизуйтесь и выберите репозиторий **`stellasdeutsch-dev/poland-kz`**.
4. На экране настроек сборки укажите:
   | Поле | Значение |
   |------|----------|
   | Project name | `poland-kz` (адрес станет `poland-kz.pages.dev`) |
   | Production branch | `main` |
   | Framework preset | **Vite** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
5. **Save and Deploy**. Подождите ~1–2 минуты сборку.
6. Готово — сайт на **`https://poland-kz.pages.dev`**.

> ⚠️ **Не добавляйте** на Cloudflare переменную `GITHUB_PAGES` — без неё сайт правильно
> собирается с корня. Эта переменная нужна только сборке GitHub Pages.

> Версия Node берётся из файла `.nvmrc` (22). Если сборка ругнётся на Node — добавьте в
> настройках Cloudflare переменную окружения `NODE_VERSION` = `22`.

### Дальше
- Каждый `git push` в `main` → Cloudflare автоматически пересобирает и публикует.
- **Свой домен:** в проекте Pages → **Custom domains** → **Set up a domain** → введите домен
  и следуйте подсказкам (нужно, чтобы домен был у вас; Cloudflare подскажет DNS-записи).

---

## Способ B — через терминал (Wrangler CLI)

Если хотите деплоить вручную из консоли (без авто-сборки на пуш):

```bash
npm install -g wrangler         # один раз
wrangler login                  # откроет браузер, вход в ваш Cloudflare-аккаунт
npm run build                   # собрать сайт (база '/', т.к. без GITHUB_PAGES)
wrangler pages deploy dist --project-name poland-kz
```

Первый запуск создаст проект Pages, дальше команда `wrangler pages deploy dist ...` будет
обновлять сайт. Авторизация (`wrangler login`) выполняется только под вашим аккаунтом.

---

## Что с GitHub Pages?

- Можно **оставить оба** хоста — они не мешают друг другу.
- Если решите оставить только Cloudflare: в GitHub репозитории **Settings → Pages → Source: None**
  (или удалить файл `.github/workflows/deploy.yml`). Скажите — уберу workflow.

---

## Заявки и формы

Приём заявок (Google Таблица) работает одинаково на любом хосте — адрес Apps Script
абсолютный и от домена не зависит. Перенастраивать ничего не нужно.
