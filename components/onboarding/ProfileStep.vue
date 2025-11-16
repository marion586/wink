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
} = useFileUpload({
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
    return;
  }

  emit('next');
};
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div class="order-2 lg:order-1">
        <div class="mb-8">
          <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {{ t('onboarding.steps.step1.title') }}
          </h1>
          <p class="text-gray-600 text-base lg:text-lg">
            {{ t('onboarding.steps.step1.description') }}
          </p>
        </div>

        <UAlert v-if="fileError" type="error" :title="fileError" icon="i-heroicons-exclamation-triangle" class="mb-6" />

        <form @submit.prevent="handleNext" class="space-y-6 lg:space-y-8" novalidate>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              {{ t('onboarding.steps.step1.photo.title') }}
            </label>
            <CommonPhotoUpload
              v-model="localData.photo"
              :label="t('onboarding.steps.step1.photo.upload')"
              :initials="getInitials"
              :is-loading="isUploading"
              :formats="t('onboarding.steps.step1.photo.formats')"
              :preview-url="photoPreviewUrl"
              size="lg"
              @remove="handleRemovePhoto"
              class="w-full" />
          </div>
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('onboarding.steps.step1.form.firstName') }}
              <span class="text-red-500 ml-1">*</span>
            </label>
            <UInput
              id="firstName"
              v-model="localData.firstName"
              :placeholder="t('onboarding.steps.step1.form.firstNamePlaceholder')"
              size="lg"
              class="w-full"
              :aria-invalid="errors.firstName && isTouched"
              :aria-describedby="errors.firstName && isTouched ? 'firstName-error' : undefined"
              aria-required="true"
              autocomplete="given-name"
              @blur="markAsTouched" />
            <p v-if="errors.firstName && isTouched" id="firstName-error" class="text-red-500 text-sm mt-2 flex items-center gap-1">
              <UIcon name="i-heroicons-exclamation-circle" class="w-4 h-4" />
              {{ errors.firstName }}
            </p>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('onboarding.steps.step1.form.lastName') }}
              <span class="text-red-500 ml-1">*</span>
            </label>
            <UInput
              id="lastName"
              v-model="localData.lastName"
              :placeholder="t('onboarding.steps.step1.form.lastNamePlaceholder')"
              size="lg"
              class="w-full"
              :aria-invalid="errors.lastName && isTouched"
              :aria-describedby="errors.lastName && isTouched ? 'lastName-error' : undefined"
              aria-required="true"
              autocomplete="family-name"
              @blur="markAsTouched" />
            <p v-if="errors.lastName && isTouched" id="lastName-error" class="text-red-500 text-sm mt-2 flex items-center gap-1">
              <UIcon name="i-heroicons-exclamation-circle" class="w-4 h-4" />
              {{ errors.lastName }}
            </p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
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
              :aria-invalid="errors.email && isTouched"
              :aria-describedby="errors.email && isTouched ? 'email-error' : undefined"
              aria-required="true"
              autocomplete="email"
              @blur="markAsTouched">
              <template #leading>
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-gray-400" />
              </template>
            </UInput>
            <p v-if="errors.email && isTouched" id="email-error" class="text-red-500 text-sm mt-2 flex items-center gap-1">
              <UIcon name="i-heroicons-exclamation-circle" class="w-4 h-4" />
              {{ errors.email }}
            </p>
          </div>

          <div class="pt-4 lg:pt-6">
            <UButton
              type="submit"
              block
              size="lg"
              :disabled="!isValid || isUploading"
              :loading="isUploading"
              :ui="{
                rounded: 'rounded-lg',
                padding: { lg: 'px-6 py-3' },
              }"
              class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 transition-all duration-200 font-semibold text-white shadow-sm hover:shadow-md">
              <template #leading>
                <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" v-if="!isUploading" />
              </template>

              {{ isUploading ? t('common.loading') : t('common.continue') }}
            </UButton>

            <div v-if="isTouched && !isValid" class="mt-3 text-center">
              <p class="text-sm text-gray-500 flex items-center justify-center gap-1">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-amber-500" />
                {{ t('validation.formIncomplete') }}
              </p>
            </div>
          </div>
        </form>
      </div>

      <div class="hidden xl:block order-1 lg:order-2">
        <div class="sticky top-8">
          <CommonAppPreview :first-name="localData.firstName" :last-name="localData.lastName" :photo-url="photoPreviewUrl" :email="localData.email" />
        </div>
      </div>
    </div>
  </div>
</template>
