export function validateRequired(values, requiredFields) {
  const errors = {};

  requiredFields.forEach((field) => {
    const v = values?.[field];
    if (typeof v !== "string" || v.trim().length === 0) {
      errors[field] = "Required";
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
