import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const SUBMIT_PREFIX = "yc_survey_submitted_";
const SUBMISSION_PREFIX = "yc_survey_submission_";

function mockDelay(ms = 550) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_SURVEYS = [
  {
    id: "s1",
    title: "Monthly Feedback",
    description: "Tell us how your month went and where NYSC can improve.",
    estMinutes: 3,
    status: "AVAILABLE", // AVAILABLE | CLOSED
    questions: [
      { id: "q1", type: "single", text: "Overall satisfaction?", required: true, options: ["Good", "OK", "Bad"] },
      { id: "q2", type: "likert", text: "How motivated are you?", required: true },
      { id: "q3", type: "text", text: "Any suggestions?", required: false },
    ],
  },
  {
    id: "s2",
    title: "Event Survey",
    description: "Quick feedback on the last event you attended.",
    estMinutes: 4,
    status: "CLOSED",
    questions: [
      { id: "q1", type: "multi", text: "What did you like?", required: true, options: ["Talks", "Food", "Networking"] },
      { id: "q2", type: "likert", text: "Rate the event overall", required: true },
      { id: "q3", type: "text", text: "What should improve?", required: false },
    ],
  },
];

function submittedKey(id) {
  return `${SUBMIT_PREFIX}${id}`;
}

function submissionKey(id) {
  return `${SUBMISSION_PREFIX}${id}`;
}

export function hasSubmitted(id) {
  return localStorage.getItem(submittedKey(id)) === "1";
}

export function markSubmitted(id) {
  localStorage.setItem(submittedKey(id), "1");
}

export function saveSubmission(id, answers) {
  const payload = {
    submittedAt: Date.now(),
    answers: answers || {},
  };
  localStorage.setItem(submissionKey(id), JSON.stringify(payload));
}

export function getSubmission(id) {
  try {
    const raw = localStorage.getItem(submissionKey(id));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const survey = {
  async listAvailable() {
    if (API_BASE_URL) {
      const res = await axios.get(`${API_BASE_URL}/surveys/available`);
      return res.data;
    }

    await mockDelay();

    // Return list view model
    return MOCK_SURVEYS.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      estMinutes: s.estMinutes,
      status: s.status, // AVAILABLE/CLOSED
    }));
  },

  async getSurvey(id) {
    if (API_BASE_URL) {
      const res = await axios.get(`${API_BASE_URL}/surveys/${id}`);
      return res.data;
    }

    await mockDelay();
    const found = MOCK_SURVEYS.find((s) => s.id === id);
    if (!found) throw new Error("Survey not found");

    // If closed, still allow view but block submit (UI handles)
    return found;
  },

  async submitSurvey(id, payload) {
    if (API_BASE_URL) {
      const res = await axios.post(`${API_BASE_URL}/surveys/${id}/submit`, payload);
      return res.data;
    }

    await mockDelay();
    if (hasSubmitted(id)) {
      throw new Error("You already submitted this survey");
    }

    const surveyMeta = MOCK_SURVEYS.find((s) => s.id === id);
    if (surveyMeta?.status === "CLOSED") {
      throw new Error("This survey is closed");
    }

    if (!payload || typeof payload !== "object") throw new Error("Invalid payload");

    markSubmitted(id);
    saveSubmission(id, payload.answers);
    return { ok: true };
  },
};
