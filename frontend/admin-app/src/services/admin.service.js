import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function mockDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// In-memory mock stores (v0.1)
let usersStore = [
  { id: "u1", name: "Admin User", email: "admin@example.com", role: "ADMIN", status: "ACTIVE" },
  { id: "u2", name: "Agent User", email: "agent@example.com", role: "AGENT", status: "ACTIVE" },
  { id: "u3", name: "Youth User", email: "youth@example.com", role: "YOUTH", status: "INACTIVE" },
];

let surveysStore = [
  { id: "s1", title: "Monthly Feedback", status: "ACTIVE", questions: ["How was your month?"] },
  { id: "s2", title: "Event Survey", status: "INACTIVE", questions: ["Did you enjoy the event?"] },
];

function newId(prefix) {
  return `${prefix}${Math.random().toString(16).slice(2, 8)}`;
}

export const admin = {
  async listUsers() {
    if (API_BASE_URL) {
      const res = await axios.get(`${API_BASE_URL}/admin/users`);
      return res.data;
    }
    await mockDelay();
    return [...usersStore];
  },

  async activateUser(userId) {
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/admin/users/${userId}/activate`);
      return res.data;
    }
    await mockDelay();
    usersStore = usersStore.map((u) => (u.id === userId ? { ...u, status: "ACTIVE" } : u));
    return { ok: true };
  },

  async deactivateUser(userId) {
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/admin/users/${userId}/deactivate`);
      return res.data;
    }
    await mockDelay();
    usersStore = usersStore.map((u) => (u.id === userId ? { ...u, status: "INACTIVE" } : u));
    return { ok: true };
  },

  surveysCRUD: {
    async list() {
      if (API_BASE_URL) {
        const res = await axios.get(`${API_BASE_URL}/admin/surveys`);
        return res.data;
      }
      await mockDelay();
      return [...surveysStore];
    },

    async get(id) {
      if (API_BASE_URL) {
        const res = await axios.get(`${API_BASE_URL}/admin/surveys/${id}`);
        return res.data;
      }
      await mockDelay();
      return surveysStore.find((s) => s.id === id) || null;
    },

    async create(payload) {
      if (API_BASE_URL) {
        const res = await axios.post(`${API_BASE_URL}/admin/surveys`, payload);
        return res.data;
      }
      await mockDelay();
      const created = {
        id: newId("s"),
        title: payload.title,
        status: "INACTIVE",
        questions: payload.questions || [],
      };
      surveysStore = [created, ...surveysStore];
      return created;
    },

    async update(id, payload) {
      if (API_BASE_URL) {
        const res = await axios.put(`${API_BASE_URL}/admin/surveys/${id}`, payload);
        return res.data;
      }
      await mockDelay();
      surveysStore = surveysStore.map((s) =>
        s.id === id ? { ...s, title: payload.title, questions: payload.questions || [] } : s
      );
      return { ok: true };
    },

    async activate(id) {
      if (API_BASE_URL) {
        const res = await axios.post(`${API_BASE_URL}/admin/surveys/${id}/activate`);
        return res.data;
      }
      await mockDelay();
      surveysStore = surveysStore.map((s) => (s.id === id ? { ...s, status: "ACTIVE" } : s));
      return { ok: true };
    },

    async deactivate(id) {
      if (API_BASE_URL) {
        const res = await axios.post(`${API_BASE_URL}/admin/surveys/${id}/deactivate`);
        return res.data;
      }
      await mockDelay();
      surveysStore = surveysStore.map((s) => (s.id === id ? { ...s, status: "INACTIVE" } : s));
      return { ok: true };
    },
  },
};
