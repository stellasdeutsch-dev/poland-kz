/**
 * Lead receiver + auto-formatted mini-CRM sheet for the PolskaWay landing page.
 *
 * Flow:  website  ──POST JSON──▶  this Web App  ──▶  Google Sheet "Leads" (formatted)
 *
 * Each submission becomes one tidy row with quiz answers split into separate
 * columns, a Status dropdown, a Comment column, alternating row colors and a
 * frozen styled header — so the sheet reads like a CRM, not a data dump.
 *
 * FIRST-TIME / RE-FORMAT:
 *   In the editor choose the function `setup` in the toolbar and press Run once.
 *   It (re)builds a clean, formatted "Leads" sheet. ⚠ It removes the old "Leads"
 *   sheet first (clears previous/test rows) — run it before you have real leads.
 *
 * AFTER EDITING THIS CODE: redeploy so the live site uses it —
 *   Deploy ▸ Manage deployments ▸ ✎ (edit) ▸ Version: New version ▸ Deploy.
 *   The /exec URL stays the same, the website needs no changes.
 *
 * (Optional) Telegram: add Script Properties TELEGRAM_TOKEN + TELEGRAM_CHAT_ID
 * to also get each lead in Telegram. Off by default.
 */

var SHEET_NAME = "Leads";

var HEADERS = [
  "Дата",
  "Источник",
  "Имя",
  "Телефон",
  "Кто заполняет",
  "Образование",
  "Язык",
  "Бюджет",
  "Когда поступать",
  "Статус",
  "Комментарий",
  "Источник трафика",
];

var COL_WIDTHS = [140, 80, 150, 130, 130, 170, 160, 120, 140, 130, 240, 220];

var STATUSES = ["Новый", "Написали", "Консультация", "Думает", "Договор", "Отказ"];

// Quiz answer code → short human label, keyed by the stable step id.
var ANSWER_LABELS = {
  who: { parent: "Родитель", applicant: "Абитуриент" },
  education: {
    school: "11 класс",
    college: "Колледж / школа",
    student: "Студент вуза",
    graduate: "Есть высшее",
  },
  language: {
    "eng-cert": "Англ. сертификат",
    "pl-cert": "Польск. сертификат",
    "need-courses": "Нужны курсы",
  },
  budget: { low: "до 2000€", mid: "2000–4000€", high: "от 4000€", grant: "Грант" },
  start: { "2026": "2026", "2027": "2027", research: "Изучает" },
};

// ── Web app entry points ──────────────────────────────────────────────────────

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet();
    var row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, HEADERS.length).setValues([buildRow(data)]);
    maybeNotifyTelegram(data);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, status: "lead endpoint alive" });
}

// ── One-time setup / reformat ────────────────────────────────────────────────

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var old = ss.getSheetByName(SHEET_NAME);
  if (old) ss.deleteSheet(old);
  formatSheet(ss.insertSheet(SHEET_NAME));
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = formatSheet(ss.insertSheet(SHEET_NAME));
  return sheet;
}

function buildRow(data) {
  return [
    new Date(),
    data.source === "quiz" ? "Квиз" : "Форма",
    data.name || "",
    "'" + (data.phone || ""), // leading apostrophe keeps the phone as text
    label(data, "who"),
    label(data, "education"),
    label(data, "language"),
    label(data, "budget"),
    label(data, "start"),
    "Новый",
    "",
    data.page || "",
  ];
}

function label(data, id) {
  var v = (data.answers || {})[id];
  if (!v) return "";
  return (ANSWER_LABELS[id] && ANSWER_LABELS[id][v]) || v;
}

function formatSheet(sheet) {
  var maxRows = sheet.getMaxRows();

  // Header values + style
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  var header = sheet.getRange(1, 1, 1, HEADERS.length);
  header
    .setBackground("#2826ff")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  // Column widths
  for (var i = 0; i < COL_WIDTHS.length; i++) {
    sheet.setColumnWidth(i + 1, COL_WIDTHS[i]);
  }

  // Date + time format on column A (from row 2 down)
  sheet.getRange(2, 1, maxRows - 1, 1).setNumberFormat("dd.MM.yyyy  HH:mm");

  // Vertical align everything to top; wrap the two long text columns
  sheet.getRange(1, 1, maxRows, HEADERS.length).setVerticalAlignment("top");
  sheet
    .getRange(1, 11, maxRows, 2)
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

  // Status dropdown (column J)
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUSES, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 10, maxRows - 1, 1).setDataValidation(rule);

  // Alternating row colors, then re-assert the blue header
  removeBandings(sheet);
  sheet
    .getRange(1, 1, maxRows, HEADERS.length)
    .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, true, false);
  header.setBackground("#2826ff").setFontColor("#ffffff").setFontWeight("bold");

  // Color the Status cells by value
  applyStatusColors(sheet);

  // Remove unused columns on the right for a clean look
  var extra = sheet.getMaxColumns() - HEADERS.length;
  if (extra > 0) sheet.deleteColumns(HEADERS.length + 1, extra);

  return sheet;
}

function removeBandings(sheet) {
  var bandings = sheet.getBandings();
  for (var i = 0; i < bandings.length; i++) bandings[i].remove();
}

function applyStatusColors(sheet) {
  var range = [sheet.getRange(2, 10, sheet.getMaxRows() - 1, 1)];
  var colors = {
    Новый: "#fff3cd",
    Написали: "#e2e3ff",
    Консультация: "#cfe2ff",
    Думает: "#fde2c4",
    Договор: "#d1f5d3",
    Отказ: "#f7d4d4",
  };
  var rules = [];
  for (var k in colors) {
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(k)
        .setBackground(colors[k])
        .setRanges(range)
        .build(),
    );
  }
  sheet.setConditionalFormatRules(rules);
}

// ── Optional Telegram (off unless Script Properties are set) ───────────────────

function maybeNotifyTelegram(data) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty("TELEGRAM_TOKEN");
  var chatId = props.getProperty("TELEGRAM_CHAT_ID");
  if (!token || !chatId) return;

  var text =
    "🎓 Новая заявка (" +
    (data.source === "quiz" ? "Квиз" : "Форма") +
    ")\n👤 " +
    (data.name || "—") +
    "\n📞 +7 " +
    (data.phone || "—");

  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ chat_id: chatId, text: text }),
    muteHttpExceptions: true,
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
