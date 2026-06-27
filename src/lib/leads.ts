import { quiz } from "../content";

/**
 * Lead capture layer.
 *
 * Every quiz / form submission is POSTed to a single endpoint (a Google
 * Apps Script Web App). That script stores the lead as a row in a Google
 * Sheet (the "database") and forwards it to Telegram + WhatsApp.
 *
 * The endpoint URL is NOT a secret (it is just a webhook address), so it
 * can live in the client. The Telegram/WhatsApp tokens stay server-side in
 * the Apps Script and are never shipped to the browser.
 *
 * Configure the URL one of two ways:
 *   1. Set VITE_LEAD_ENDPOINT in the build environment, or
 *   2. Paste it into LEAD_ENDPOINT_FALLBACK below.
 */
const LEAD_ENDPOINT_FALLBACK = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

const LEAD_ENDPOINT =
  (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined) ||
  LEAD_ENDPOINT_FALLBACK;

export type ReadableAnswer = { q: string; a: string };

export type LeadPayload = {
  source: "quiz" | "final-form";
  name: string;
  phone: string;
  /** Raw quiz answers keyed by step id (quiz only). */
  answers?: Record<string, string>;
  /** Human-readable question/answer pairs (quiz only). */
  answersReadable?: ReadableAnswer[];
};

/** Map raw quiz answer codes to the labels a human actually picked. */
export function readableAnswers(
  answers: Record<string, string>,
): ReadableAnswer[] {
  return quiz.steps
    .filter((s) => answers[s.id])
    .map((s) => ({
      q: s.question,
      a:
        s.options.find((o) => o.value === answers[s.id])?.label ??
        answers[s.id],
    }));
}

function endpointConfigured() {
  return Boolean(LEAD_ENDPOINT) && !LEAD_ENDPOINT.startsWith("PASTE_");
}

/**
 * Send a lead to the backend. Never throws — a failed network call must not
 * break the on-screen "thank you" flow. Returns whether delivery succeeded so
 * the caller can decide whether to retry or log.
 *
 * Uses Content-Type: text/plain on purpose: it keeps the request a CORS
 * "simple request", so the browser does not fire a preflight that Apps Script
 * cannot answer.
 */
export async function submitLead(
  payload: LeadPayload,
): Promise<{ ok: boolean }> {
  const body = JSON.stringify({
    ...payload,
    ts: new Date().toISOString(),
    page: typeof location !== "undefined" ? location.href : undefined,
  });

  if (!endpointConfigured()) {
    // Not wired up yet: log so nothing is lost during setup, but let the UI
    // continue to its success state.
    console.warn("[lead] endpoint not configured yet — payload:", body);
    return { ok: false };
  }

  try {
    await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    return { ok: true };
  } catch (err) {
    console.error("[lead] submit failed:", err);
    return { ok: false };
  }
}
