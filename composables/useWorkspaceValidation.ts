import { z } from 'zod';

const workspaceSchema = z.object({
  companyName: z.string().min(1, 'validation.required'),
  description: z.string().min(10, 'validation.minLength'),
  siteUrl: z.string().url('validation.invalidWebsite').optional().or(z.literal('')),
  address: z.string().optional(),
  sector: z.string().optional(),
});

export const useWorkspaceValidation = (data: any) => {
  const { t } = useI18n();
  const errors = ref<Record<string, string>>({});
  const isValid = ref(false);
  const isTouched = ref(false);

  const validate = () => {
    const result = workspaceSchema.safeParse(data.value);
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
