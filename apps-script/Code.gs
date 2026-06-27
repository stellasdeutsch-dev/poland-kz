/**
 * Lead receiver for the PolskaWay landing page.
 *
 * Flow:  website  ──POST JSON──▶  this Web App
 *                                   ├─ appends a row to the bound Google Sheet (the database)
 *                                   ├─ sends a Telegram message
 *                                   └─ sends a WhatsApp message (Meta Cloud API)
 *
 * SECRETS live in Script Properties (Project Settings ▸ Script Properties),
 * NEVER in the website code:
 *   TELEGRAM_TOKEN    bot token from @BotFather
 *   TELEGRAM_CHAT_ID  chat / group id that should receive leads
 *   WA_TOKEN          WhatsApp Cloud API access token
 *   WA_PHONE_ID       WhatsApp "Phone number ID" (Meta dashboard)
 *   WA_RECIPIENT      destination number, digits only, intl format (e.g. 77769771878)
 *   WA_TEMPLATE       (optional) approved template name. If empty → plain text
 *                     (plain text only works inside the 24h support window).
 *   WA_LANG           (optional) template language code, default "ru"
 *
 * After editing: Deploy ▸ New deployment ▸ Web app
 *   Execute as: Me      Who has access: Anyone
 * Copy the /exec URL into the website (VITE_LEAD_ENDPOINT or LEAD_ENDPOINT_FALLBACK).
 */

var SHEET_NAME = "Leads";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    saveRow(data);
    var text = formatMessage(data);
    notifyTelegram(text);
    notifyWhatsApp(data, text);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

// Lets you open the /exec URL in a browser to confirm it is deployed.
function doGet() {
  return json({ ok: true, status: "lead endpoint alive" });
}

function saveRow(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Дата",
      "Источник",
      "Имя",
      "Телефон",
      "Ответы квиза",
      "Страница",
    ]);
  }
  var answers = (data.answersReadable || [])
    .map(function (x) {
      return x.q + ": " + x.a;
    })
    .join("\n");

  sheet.appendRow([
    new Date(),
    data.source === "quiz" ? "Квиз" : "Форма",
    data.name || "",
    "'" + (data.phone || ""), // leading apostrophe keeps the phone as text
    answers,
    data.page || "",
  ]);
}

function formatMessage(data) {
  var lines = [];
  lines.push("🎓 Новая заявка — " + (data.source === "quiz" ? "Квиз" : "Форма"));
  lines.push("👤 Имя: " + (data.name || "—"));
  lines.push("📞 Телефон: +7 " + (data.phone || "—"));
  if (data.answersReadable && data.answersReadable.length) {
    lines.push("");
    lines.push("📋 Ответы:");
    data.answersReadable.forEach(function (x) {
      lines.push("• " + x.q + " — " + x.a);
    });
  }
  return lines.join("\n");
}

function notifyTelegram(text) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty("TELEGRAM_TOKEN");
  var chatId = props.getProperty("TELEGRAM_CHAT_ID");
  if (!token || !chatId) return;

  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
      disable_web_page_preview: true,
    }),
    muteHttpExceptions: true,
  });
}

function notifyWhatsApp(data, text) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty("WA_TOKEN");
  var phoneId = props.getProperty("WA_PHONE_ID");
  var to = props.getProperty("WA_RECIPIENT");
  if (!token || !phoneId || !to) return;

  var template = props.getProperty("WA_TEMPLATE");
  var lang = props.getProperty("WA_LANG") || "ru";
  var url = "https://graph.facebook.com/v21.0/" + phoneId + "/messages";

  var body;
  if (template) {
    // Business-initiated message → an approved template is required.
    // The template body should contain two variables: {{1}} name, {{2}} phone.
    body = {
      messaging_product: "whatsapp",
      to: to,
      type: "template",
      template: {
        name: template,
        language: { code: lang },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: data.name || "—" },
              { type: "text", text: "+7 " + (data.phone || "—") },
            ],
          },
        ],
      },
    };
  } else {
    // Plain text only delivers inside the 24h customer-service window.
    body = {
      messaging_product: "whatsapp",
      to: to,
      type: "text",
      text: { body: text },
    };
  }

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + token },
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
