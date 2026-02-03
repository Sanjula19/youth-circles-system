import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function mockDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAuthFromStorage() {
  try {
    const raw = localStorage.getItem("yc_auth_v1");
    if (!raw) return { token: null, role: "YOUTH" };
    const parsed = JSON.parse(raw);
    return {
      token: parsed?.token || null,
      role: parsed?.role || "YOUTH",
    };
  } catch {
    return { token: null, role: "YOUTH" };
  }
}

export const profile = {
  async getMyProfile() {
    const { token, role } = getAuthFromStorage();

    if (API_BASE_URL) {
      const res = await axios.get(`${API_BASE_URL}/profile/me`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    }

    await mockDelay();

    // Minimal mock profile
    if (role === "AGENT") {
      return {
        role: "AGENT",
        profile: {
          fullName: "Mock Agent",
          email: "agent@example.com",
          phone: "0771234567",
        },
        youthCircle: {
          name: "Colombo Youth Circle",
          district: "Colombo",
          status: "ACTIVE",
        },
      };
    }

    // Default to YOUTH for YOUTH/ADMIN in dummy stage
    return {
      role: "YOUTH",
      profile: {
        fullName: "Mock Youth",
        email: "youth@example.com",
        phone: "0710000000",
      },
      youthCircle: {
        name: "Gampaha Youth Circle",
        district: "Gampaha",
        status: "ACTIVE",
      },
    };
  },

  async updateMyProfile(payload) {
    const { token } = getAuthFromStorage();

    if (API_BASE_URL) {
      const res = await axios.put(`${API_BASE_URL}/profile/me`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    }

    await mockDelay();

    // Mock success most of the time
    if (!payload?.fullName || !payload?.email || !payload?.phone) {
      throw new Error("Required fields missing");
    }

    return { ok: true };
  },
};
