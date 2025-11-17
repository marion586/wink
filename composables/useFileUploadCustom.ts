import type { FileUploadOptions, FileUploadReturn } from '~/types/file';

export const useFileUploadCustom = (options: FileUploadOptions = {}): FileUploadReturn => {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'], onError } = options;

  const { t } = useI18n();

  const previewUrl = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const validateFile = (file: File): boolean => {
    error.value = null;

    if (file.size > maxSize) {
      error.value = t('fileUpload.errors.fileTooLarge', {
        maxSize: Math.round(maxSize / 1024 / 1024),
      });
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      error.value = t('fileUpload.errors.invalidType', {
        types: allowedTypes.map((type) => type.split('/')[1]).join(', '),
      });
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file: File): Promise<boolean> => {
    if (!validateFile(file)) {
      onError?.(error.value!);
      return false;
    }

    isLoading.value = true;
    error.value = null;

    try {
      if (previewUrl.value && previewUrl.value.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl.value);
      }

      await new Promise<void>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          previewUrl.value = e.target?.result as string;
          resolve();
        };

        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
      });

      return true;
    } catch (err) {
      error.value = t('fileUpload.errors.uploadFailed');
      onError?.(error.value);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    if (previewUrl.value && previewUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl.value);
    }

    previewUrl.value = null;
    error.value = null;
    isLoading.value = false;
  };

  return {
    previewUrl: readonly(previewUrl),
    isLoading: readonly(isLoading),
    error: readonly(error),
    handleFileUpload,
    reset,
  };
};
