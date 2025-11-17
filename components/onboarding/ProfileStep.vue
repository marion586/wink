<script setup lang="ts">
import type { ProfileData } from '~/types/onboarding';

interface Props {
  modelValue: ProfileData;
}

interface Emits {
  (e: 'update:modelValue', value: ProfileData): void;
  (e: 'next'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { t } = useI18n();
const toast = useToast();

const localData = computed({
  get: () => props.modelValue,
  set: (value: ProfileData) => emit('update:modelValue', value),
});

const {
  previewUrl: photoPreviewUrl,
  handleFileUpload,
  error: fileError,
  isLoading: isUploading,
  reset: reset,
} = useFileUploadCustom({
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  onError: (error) => {
    toast.add({
      title: t('common.error'),
      description: error,
      color: 'red',
      icon: 'i-heroicons-exclamation-triangle',
    });
  },
});

const { errors, isValid, isTouched, markAsTouched } = useProfileValidation(localData);
const isSubmitting = ref(false);

watch(
  () => localData.value.photo,
  async (newPhoto, oldPhoto) => {
    if (newPhoto) {
      const success = await handleFileUpload(newPhoto);
      if (!success) {
        localData.value.photo = null;
        reset();
      }
    } else if (oldPhoto && !newPhoto) {
      reset();
    }
  },
  { immediate: true }
);

const getInitials = computed(() => {
  const first = localData.value.firstName?.charAt(0).toUpperCase() || '';
  const last = localData.value.lastName?.charAt(0).toUpperCase() || '';
  return first + last || 'AP';
});

const handleRemovePhoto = () => {
  localData.value.photo = null;
  reset();
};

const handleNext = async () => {
  markAsTouched();

  if (!isValid.value) {
    const firstErrorElement = document.querySelector('[aria-invalid="true"]');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    toast.add({
      title: t('onboarding.validation.error'),
      description: t('onboarding.validation.fillRequired'),
      color: 'red',
      icon: 'i-heroicons-exclamation-circle',
    });
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch('/api/onboarding/profile', {
      method: 'POST',
      body: {
        profile: {
          firstName: localData.value.firstName,
          lastName: localData.value.lastName,
          email: localData.value.email,
        },
      },
    });

    toast.add({
      title: t('onboarding.success.title'),
      description: t('onboarding.success.profileSaved'),
      color: 'green',
      icon: 'i-heroicons-check-circle',
    });

    emit('next');
  } catch (error: any) {
    console.error('Profile save error:', error);

    toast.add({
      title: t('onboarding.error.title'),
      description: error.data?.statusMessage || t('onboarding.error.genericError'),
      color: 'red',
      icon: 'i-heroicons-exclamation-circle',
    });
  } finally {
    isSubmitting.value = false;
  }
};

const getFieldError = (fieldName: string) => {
  return errors.value[fieldName] || '';
};

const hasFieldError = (fieldName: string) => {
  return !!errors.value[fieldName] && isTouched.value;
};
</script>

<template>
  <div class="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
        <div class="order-2 lg:order-1">
          <div class="mb-6 sm:mb-8">
            <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {{ t('onboarding.steps.step1.title') }}
            </h1>
            <p class="text-sm sm:text-base text-gray-600">
              {{ t('onboarding.steps.step1.subtitle') }}
            </p>
          </div>

          <UAlert v-if="fileError" type="error" :title="fileError" icon="i-heroicons-exclamation-triangle" class="mb-4 sm:mb-6" />

          <form @submit.prevent="handleNext" class="space-y-5 sm:space-y-6 lg:space-y-7" novalidate>
            <div>
              <CommonPhotoUpload
                v-model="localData.photo"
                :label="t('onboarding.steps.step1.photo.title')"
                :initials="getInitials"
                :is-loading="isUploading"
                :formats="t('onboarding.steps.step1.photo.formats')"
                :preview-url="photoPreviewUrl"
                size="lg"
                @remove="handleRemovePhoto"
                class="w-full" />
            </div>

            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {{ t('onboarding.steps.step1.form.firstName') }}
                <span class="text-red-500 ml-1">*</span>
              </label>
              <UInput
                id="firstName"
                v-model="localData.firstName"
                :placeholder="t('onboarding.steps.step1.form.firstNamePlaceholder')"
                size="lg"
                class="w-full"
                :error="hasFieldError('firstName')"
                :aria-invalid="hasFieldError('firstName')"
                :aria-describedby="hasFieldError('firstName') ? 'firstName-error' : undefined"
                aria-required="true"
                autocomplete="given-name"
                @blur="markAsTouched" />
              <p v-if="hasFieldError('firstName')" id="firstName-error" class="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                <UIcon name="i-heroicons-exclamation-circle" class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{{ getFieldError('firstName') }}</span>
              </p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {{ t('onboarding.steps.step1.form.lastName') }}
                <span class="text-red-500 ml-1">*</span>
              </label>
              <UInput
                id="lastName"
                v-model="localData.lastName"
                :placeholder="t('onboarding.steps.step1.form.lastNamePlaceholder')"
                size="lg"
                class="w-full"
                :error="hasFieldError('lastName')"
                :aria-invalid="hasFieldError('lastName')"
                :aria-describedby="hasFieldError('lastName') ? 'lastName-error' : undefined"
                aria-required="true"
                autocomplete="family-name"
                @blur="markAsTouched" />
              <p v-if="hasFieldError('lastName')" id="lastName-error" class="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                <UIcon name="i-heroicons-exclamation-circle" class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{{ getFieldError('lastName') }}</span>
              </p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {{ t('onboarding.steps.step1.form.email') }}
                <span class="text-red-500 ml-1">*</span>
              </label>
              <UInput
                id="email"
                v-model="localData.email"
                type="email"
                :placeholder="t('onboarding.steps.step1.form.emailPlaceholder')"
                size="lg"
                class="w-full"
                :error="hasFieldError('email')"
                :aria-invalid="hasFieldError('email')"
                :aria-describedby="hasFieldError('email') ? 'email-error' : undefined"
                aria-required="true"
                autocomplete="email"
                @blur="markAsTouched">
                <template #leading>
                  <UIcon name="i-heroicons-envelope" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </template>
              </UInput>
              <p v-if="hasFieldError('email')" id="email-error" class="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                <UIcon name="i-heroicons-exclamation-circle" class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{{ getFieldError('email') }}</span>
              </p>
            </div>

            <div class="pt-2 sm:pt-4 lg:pt-6">
              <UButton
                type="submit"
                block
                size="lg"
                :disabled="!isValid || isUploading || isSubmitting"
                :loading="isUploading || isSubmitting"
                :ui="{
                  rounded: 'rounded-lg',
                  padding: { lg: 'px-6 py-3.5' },
                }"
                class="bg-[#0072FF] hover:bg-[#0072FF] disabled:bg-gray-300 transition-all duration-200 font-semibold text-white shadow-sm hover:shadow-md text-sm sm:text-base">
                <template #leading>
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 sm:w-5 sm:h-5" v-if="!isUploading && !isSubmitting" />
                </template>

                {{ isSubmitting ? t('onboarding.steps.step1.submitting') : t('common.continue') }}
              </UButton>

              <div v-if="isTouched && !isValid" class="mt-3">
                <p class="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-1">
                  <UIcon name="i-heroicons-exclamation-triangle" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
                  <span>{{ t('validation.formIncomplete') }}</span>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div class="order-1 lg:order-2 lg:block">
          <div class="lg:sticky lg:top-8">
            <CommonAppPreview :first-name="localData.firstName" :last-name="localData.lastName" :photo-url="photoPreviewUrl" :email="localData.email" class="hidden md:block" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
