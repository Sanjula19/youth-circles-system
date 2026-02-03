const STORAGE_KEY = "yc_auth_v1";
const ALLOWED_ROLES = ["YOUTH", "AGENT", "ADMIN"];

export function TokenSave(token, role) {
  if (typeof token !== "string" || token.trim().length === 0) {
    throw new Error("TokenSave: token must be a non-empty string");
  }
  if (!ALLOWED_ROLES.includes(role)) {
    throw new Error("TokenSave: invalid role");
  }

  const payload = { token: token.trim(), role };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
