export const SESSION_COOKIE = "gx_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 14; // 14 dias

function getSecret() {
  const secret = process.env.SESSION_SECRET || process.env.DASHBOARD_PASSWORD || "dev-secret-troque-em-produção";
  return secret;
}

async function hmac(message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_DURATION_MS;
  const signature = await hmac(String(expires));
  return `${expires}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [expiresStr, signature] = token.split(".");
  if (!expiresStr || !signature) return false;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  const expected = await hmac(expiresStr);
  return expected === signature;
}

export function checkPassword(input: string): boolean {
  const real = process.env.DASHBOARD_PASSWORD;
  if (!real) return false;
  return input === real;
}
