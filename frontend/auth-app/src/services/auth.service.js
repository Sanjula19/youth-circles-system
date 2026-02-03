import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function mockDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const auth = {
  async login({ email, password, role }) {
    // If backend URL is provided, call it. Otherwise mock.
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/login`, { email, password, role });
      return res.data; // expected: { token, role }
    }

    await mockDelay();
    // minimal mock validation
    if (!email || !password) throw new Error("Email and password are required");
    return { token: "mock-token-login", role };
  },

  async register({ email, password }) {
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/register`, { email, password });
      return res.data; // expected: { token, role }
    }

    await mockDelay();
    if (!email || !password) throw new Error("Email and password are required");
    return { token: "mock-token-register", role: "YOUTH" };
  },

  async resetPassword({ email }) {
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/reset-password`, { email });
      return res.data; // expected: { ok: true }
    }

    await mockDelay();
    if (!email) throw new Error("Email is required");
    return { ok: true };
  },
};
