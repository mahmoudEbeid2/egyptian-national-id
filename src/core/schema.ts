export const NationalIdRegex = /^[2-3]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-4]|1[1-9]|2[1-9]|3[1-5]|88)\d{5}$/;

export const NationalIdSchemaMap = {
  pattern: NationalIdRegex,
  errorMessage: "National ID must be exactly 14 valid digits.",
};
