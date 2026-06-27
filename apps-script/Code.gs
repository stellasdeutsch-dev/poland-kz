/**
 * Lead receiver for the PolskaWay landing page.
 *
 * Flow:  website  ──POST JSON──▶  this Web App  ──▶  Google Sheet (the database)
 *
 * Every quiz / form submission is appended as a row to the bound Google Sheet.
 * That is all that is required — no tokens, no Script Properties.
 *
 * (Optional) Telegram notifications are OFF by default. To turn them on later,
 * add two Script Properties — TELEGRAM_TOKEN and TELEGRAM_CHAT_ID — and every
 * new lead will also be sent to Telegram. Nothing else to change.
 *
 * Deploy ▸ New deployment ▸ Web app
 *   Execute as: Me      Who has access: Anyone
 * Copy the /exec URL into the website (VITE_LEAD_ENDPOINT or LEAD_ENDPOINT_FALLBACK).
 */

var SHEET_NAME = "Leads";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    saveRow(data);
    maybeNotifyTelegram(data); // no-op unless Telegram is configured
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

// ── Optional Telegram notifications ───────────────────────────────────────────
// Disabled until TELEGRAM_TOKEN and TELEGRAM_CHAT_ID exist in Script Properties.
function maybeNotifyTelegram(data) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty("TELEGRAM_TOKEN");
  var chatId = props.getProperty("TELEGRAM_CHAT_ID");
  if (!token || !chatId) return; // off for now — sheet-only

  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: formatMessage(data),
      disable_web_page_preview: true,
    }),
    muteHttpExceptions: true,
  });
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

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
