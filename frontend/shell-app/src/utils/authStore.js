const STORAGE_KEY = "yc_auth_v1";

const ALLOWED_ROLES = ["YOUTH", "AGENT", "ADMIN"];

let authState = {
  token: null,
  role: "YOUTH", // default role for dummy stage
};

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isValidRole(role) {
  return ALLOWED_ROLES.includes(role);
}

function loadFromStorage() {
  if (typeof window === "undefined" || !window.localStorage) return;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const parsed = safeParse(raw);
  if (!parsed) return;

  const { token, role } = parsed;

  if (role && isValidRole(role)) authState.role = role;
  authState.token = typeof token === "string" && token.length > 0 ? token : null;
}

// Load once on module import
loadFromStorage();

function saveToStorage() {
  if (typeof window === "undefined" || !window.localStorage) return;

  const payload = { token: authState.token, role: authState.role };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getAuth() {
  return { ...authState };
}

export function setAuth(token, role) {
  if (typeof token !== "string" || token.trim().length === 0) {
    throw new Error("setAuth(token, role): token must be a non-empty string");
  }
  if (!isValidRole(role)) {
    throw new Error(`setAuth(token, role): role must be one of ${ALLOWED_ROLES.join(", ")}`);
  }

  authState = { token: token.trim(), role };
  saveToStorage();
}

export function clearAuth() {
  authState = { token: null, role: "YOUTH" };
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function isLoggedIn() {
  return !!authState.token;
}

export function getRole() {
  return authState.role;
}
