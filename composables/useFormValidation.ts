export const useFormValidation = () => {
  const { t } = useI18n();

  const validateEmail = (email: string): { valid: boolean; error?: string } => {
    if (!email) {
      return { valid: false, error: t('validation.email.required') };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: t('validation.email.invalid') };
    }
    return { valid: true };
  };

  const validateRequired = (value: string, fieldName: string): { valid: boolean; error?: string } => {
    if (!value || value.trim() === '') {
      return { valid: false, error: t('validation.required', { field: fieldName }) };
    }
    return { valid: true };
  };

  const validateUrl = (url: string): { valid: boolean; error?: string } => {
    if (!url) return { valid: true };

    try {
      new URL(url);
      return { valid: true };
    } catch {
      return { valid: false, error: t('validation.url.invalid') };
    }
  };

  const validateMinLength = (value: string, min: number, fieldName: string): { valid: boolean; error?: string } => {
    if (value.length < min) {
      return { valid: false, error: t('validation.minLength', { field: fieldName, min }) };
    }
    return { valid: true };
  };

  return {
    validateEmail,
    validateRequired,
    validateUrl,
    validateMinLength,
  };
};
