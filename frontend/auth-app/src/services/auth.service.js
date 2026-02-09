import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function mockDelay(ms = 550) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldFail(identifier) {
  return typeof identifier === "string" && identifier.toLowerCase().includes("fail");
}

export const auth = {
  async login({ role, identifier, password }) {
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/login`, { role, identifier, password });
      return res.data; // { token, role }
    }

    await mockDelay();

    if (!role) throw new Error("User type is required");
    if (!identifier) throw new Error("Email / Username is required");
    if (!password) throw new Error("Password is required");
    if (String(password).length < 6) throw new Error("Password must be at least 6 characters");

    if (shouldFail(identifier) || String(password).toLowerCase() === "fail") {
      throw new Error("Mock: invalid credentials");
    }

    return { token: `mock-token-${role.toLowerCase()}`, role };
  },

  async register(payload) {
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/register`, payload);
      return res.data; // { token, role }
    }

    await mockDelay();

    // Minimal realistic validation (UI already validates more)
    if (!payload?.fullName) throw new Error("Full name is required");
    if (!payload?.email) throw new Error("Email is required");
    if (!payload?.phone) throw new Error("Phone number is required");
    if (!payload?.nic) throw new Error("NIC is required");
    if (!payload?.district) throw new Error("District is required");
    if (!payload?.address) throw new Error("Address is required");
    if (!payload?.educationLevel) throw new Error("Education level is required");
    if (!Array.isArray(payload?.interests) || payload.interests.length === 0) {
      throw new Error("Select at least one interest");
    }

    if (shouldFail(payload.nic)) throw new Error("Mock: account already exists");

    return { token: "mock-token-register", role: "YOUTH" };
  },

  async resetPassword({ identifier }) {
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/reset-password`, { identifier });
      return res.data; // { ok: true }
    }

    await mockDelay();

    if (!identifier) throw new Error("Email / Username / NIC is required");
    if (shouldFail(identifier)) throw new Error("Mock: account not found");

    return { ok: true };
  },
};
