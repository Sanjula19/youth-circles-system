const TOKEN_KEY = "auth.token";
const ROLE_KEY = "auth.role";
const ALLOWED_ROLES = ["YOUTH", "AGENT", "ADMIN"];

export function TokenSave(token, role) {
  if (typeof token !== "string" || token.trim().length === 0) {
    throw new Error("TokenSave: token must be a non-empty string");
  }
  if (!ALLOWED_ROLES.includes(role)) {
    throw new Error("TokenSave: invalid role");
  }

  localStorage.setItem(TOKEN_KEY, token.trim());
  localStorage.setItem(ROLE_KEY, role);
}

export function TokenClear() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthRole() {
  return localStorage.getItem(ROLE_KEY);
}
