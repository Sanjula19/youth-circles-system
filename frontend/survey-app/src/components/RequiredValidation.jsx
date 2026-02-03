export function validateRequiredAnswers(questions, answers) {
  const errors = {};

  (questions || []).forEach((q) => {
    if (!q.required) return;

    const v = answers?.[q.id];

    // Required rules per type
    if (q.type === "multi") {
      if (!Array.isArray(v) || v.length === 0) errors[q.id] = "Required";
      return;
    }

    if (q.type === "text") {
      if (typeof v !== "string" || v.trim().length === 0) errors[q.id] = "Required";
      return;
    }

    // single / likert
    if (v === undefined || v === null || v === "") errors[q.id] = "Required";
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
