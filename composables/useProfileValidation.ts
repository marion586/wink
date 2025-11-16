import { z } from 'zod';

const profileSchema = z.object({
  firstName: z.string().min(1, 'validation.required'),
  lastName: z.string().min(1, 'validation.required'),
  email: z.string().email('validation.invalidEmail'),
});

export const useProfileValidation = (data: any) => {
  const { t } = useI18n();
  const errors = ref<Record<string, string>>({});
  const isValid = ref(false);
  const isTouched = ref(false);

  const validate = () => {
    const result = profileSchema.safeParse(data.value);
    isValid.value = result.success;

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      errors.value = Object.keys(fieldErrors).reduce((acc, key) => {
        const errorKey = fieldErrors[key as keyof typeof fieldErrors]?.[0];
        acc[key] = errorKey ? t(errorKey) : t('validation.required');
        return acc;
      }, {} as Record<string, string>);
    } else {
      errors.value = {};
    }
  };

  const markAsTouched = () => {
    isTouched.value = true;
    validate();
  };

  watch(data, validate, { immediate: true, deep: true });

  return {
    errors: readonly(errors),
    isValid: readonly(isValid),
    isTouched: readonly(isTouched),
    validate,
    markAsTouched,
  };
};
