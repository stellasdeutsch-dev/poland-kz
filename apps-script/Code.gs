/**
 * Lead receiver for the PolskaWay landing page.
 *
 * Flow:  website  ──POST JSON──▶  this Web App
 *                                   ├─ appends a row to the bound Google Sheet (the database)
 *                                   └─ sends a Telegram message
 *
 * SECRETS live in Script Properties (Project Settings ▸ Script Properties),
 * NEVER in the website code:
 *   TELEGRAM_TOKEN    bot token from @BotFather
 *   TELEGRAM_CHAT_ID  chat / group id that should receive leads
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
    notifyTelegram(formatMessage(data));
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

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
