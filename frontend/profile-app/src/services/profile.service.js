import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function mockDelay(ms = 550) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAuth() {
  const token = localStorage.getItem("auth.token");
  const role = localStorage.getItem("auth.role") || "YOUTH";
  return { token, role };
}

function storageKey(role) {
  return `yc_profile_v1_${String(role || "YOUTH").toLowerCase()}`;
}

function readStored(role) {
  try {
    const raw = localStorage.getItem(storageKey(role));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeStored(role, payload) {
  localStorage.setItem(storageKey(role), JSON.stringify(payload));
}

function shouldFailEmail(email) {
  return typeof email === "string" && email.toLowerCase().includes("fail");
}

function defaultMock(role) {
  if (role === "AGENT") {
    return {
      role: "AGENT",
      profile: {
        fullName: "Mock Agent",
        agentId: "AG-10021",
        designation: "District Officer",
        office: "Colombo District Office",
        district: "Colombo",
        email: "agent@example.com",
        phone: "0771234567",
      },
      account: {
        role: "AGENT",
        status: "ACTIVE",
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 120,
        updatedAt: Date.now() - 1000 * 60 * 10,
      },
    };
  }

  // default youth
  return {
    role: "YOUTH",
    profile: {
      fullName: "Mock Youth",
      nic: "982340123V",
      dob: "2000-05-12",
      gender: "Male",
      email: "youth@example.com",
      phone: "0710000000",
      address: "No. 12, Main Street",
    },
    youthCircle: {
      name: "Gampaha Youth Circle",
      district: "Gampaha",
      status: "ACTIVE",
      memberRole: "Member",
    },
    account: {
      role: "YOUTH",
      status: "ACTIVE",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
      updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    },
  };
}

export const profile = {
  async getMyProfile() {
    const { token, role } = getAuth();

    if (API_BASE_URL) {
      const res = await axios.get(`${API_BASE_URL}/profile/me`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    }

    await mockDelay();

    // Use persisted data if exists
    const stored = readStored(role);
    if (stored) return stored;

    const fresh = defaultMock(role === "AGENT" ? "AGENT" : "YOUTH");
    writeStored(role, fresh);
    return fresh;
  },

  async updateMyProfile(payload) {
    const { token, role } = getAuth();

    if (API_BASE_URL) {
      const res = await axios.put(`${API_BASE_URL}/profile/me`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    }

    await mockDelay();

    // Mock failure trigger
    if (shouldFailEmail(payload?.email)) {
      throw new Error("Mock: email is already used");
    }

    // Basic validation (UI already validates too)
    if (!payload?.fullName || !payload?.email || !payload?.phone) {
      throw new Error("Required fields missing");
    }

    const current = readStored(role) || defaultMock(role === "AGENT" ? "AGENT" : "YOUTH");

    const next = {
      ...current,
      profile: {
        ...(current.profile || {}),
        ...(payload || {}),
      },
      account: {
        ...(current.account || {}),
        updatedAt: Date.now(),
      },
    };

    writeStored(role, next);
    return { ok: true };
  },
};
