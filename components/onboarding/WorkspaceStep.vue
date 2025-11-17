<script setup lang="ts">
const { t } = useI18n();

interface WorkspaceData {
  logo: File | null;
  companyName: string;
  description: string;
  siteUrl: string;
  address: string;
  sector: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  photo: File | null;
}

interface Props {
  modelValue: WorkspaceData;
  profileData?: ProfileData;
}

interface Emits {
  (e: 'update:modelValue', value: WorkspaceData): void;
  (e: 'next'): void;
  (e: 'back'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const { errors, isValid, markAsTouched } = useWorkspaceValidation(localData);

const isSubmitting = ref(false);
const toast = useToast();

const photoPreviewUrl = ref<string | null>(null);
const logoPreviewUrl = ref<string | null>(null);

const companyNameDisplay = computed(() => localData.value.companyName);
const companyLogoDisplay = computed(() => logoPreviewUrl.value);

watch(
  () => props.profileData?.photo,
  (newPhoto) => {
    if (newPhoto) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreviewUrl.value = e.target?.result as string;
      };
      reader.readAsDataURL(newPhoto);
    } else {
      photoPreviewUrl.value = null;
    }
  },
  { immediate: true }
);

watch(
  () => localData.value.logo,
  (newLogo) => {
    if (newLogo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        logoPreviewUrl.value = e.target?.result as string;
      };
      reader.readAsDataURL(newLogo);
    } else {
      logoPreviewUrl.value = null;
    }
  },
  { immediate: true }
);

const handleNext = async () => {
  markAsTouched();

  if (!isValid.value) {
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
    const response = await $fetch('/api/onboarding/workspace', {
      method: 'POST',
      body: {
        workspace: {
          companyName: localData.value.companyName,
          description: localData.value.description,
          siteUrl: localData.value.siteUrl,
          address: localData.value.address,
          sector: localData.value.sector,
        },
      },
    });

    toast.add({
      title: t('onboarding.success.title'),
      description: t('onboarding.success.workspaceSaved'),
      color: 'green',
      icon: 'i-heroicons-check-circle',
    });

    emit('next');
  } catch (error: any) {
    console.error('Workspace save error:', error);

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

const handleBack = () => {
  emit('back');
};

const getFieldError = (fieldName: string) => {
  return errors.value[fieldName] || '';
};

const hasFieldError = (fieldName: string) => {
  return !!errors.value[fieldName];
};
</script>

<template>
  <div class="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
        <div class="order-2 lg:order-1">
          <div class="mb-6 sm:mb-8">
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {{ t('onboarding.steps.step2.title') }}
            </h2>
            <p class="text-sm sm:text-base text-gray-600">
              {{ t('onboarding.steps.step2.subtitle') }}
            </p>
          </div>

          <form @submit.prevent="handleNext" class="space-y-5 sm:space-y-6 lg:space-y-7">
            <div>
              <CommonPhotoUpload v-model="localData.logo" :label="t('onboarding.steps.step2.form.logoLabel')" initials="" size="md" class="w-full" />
            </div>

            <div>
              <label for="companyName" class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {{ t('onboarding.steps.step2.form.companyName') }}
                <span class="text-red-500 ml-1">*</span>
              </label>
              <UInput
                id="companyName"
                v-model="localData.companyName"
                :placeholder="t('onboarding.steps.step2.form.companyNamePlaceholder')"
                size="lg"
                class="w-full"
                :error="hasFieldError('companyName')"
                :aria-invalid="hasFieldError('companyName')"
                :aria-describedby="hasFieldError('companyName') ? 'companyName-error' : undefined"
                aria-required="true"
                autocomplete="organization" />
              <p v-if="hasFieldError('companyName')" id="companyName-error" class="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                <UIcon name="i-heroicons-exclamation-circle" class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{{ getFieldError('companyName') }}</span>
              </p>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {{ t('onboarding.steps.step2.form.description') }}
                <span class="text-red-500 ml-1">*</span>
              </label>
              <UTextarea
                id="description"
                v-model="localData.description"
                :placeholder="t('onboarding.steps.step2.form.descriptionPlaceholder')"
                :rows="4"
                size="lg"
                class="w-full resize-none"
                :error="hasFieldError('description')"
                :aria-invalid="hasFieldError('description')"
                :aria-describedby="hasFieldError('description') ? 'description-error' : undefined"
                aria-required="true" />
              <p v-if="hasFieldError('description')" id="description-error" class="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                <UIcon name="i-heroicons-exclamation-circle" class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{{ getFieldError('description') }}</span>
              </p>
            </div>

            <div>
              <label for="siteUrl" class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {{ t('onboarding.steps.step2.form.siteUrl') }}
              </label>
              <UInput
                id="siteUrl"
                v-model="localData.siteUrl"
                type="url"
                :placeholder="t('onboarding.steps.step2.form.siteUrlPlaceholder')"
                size="lg"
                class="w-full"
                :error="hasFieldError('siteUrl')"
                :aria-invalid="hasFieldError('siteUrl')"
                :aria-describedby="hasFieldError('siteUrl') ? 'siteUrl-error' : undefined"
                autocomplete="url">
                <template #leading>
                  <UIcon name="i-heroicons-globe-alt" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </template>
              </UInput>
              <p v-if="hasFieldError('siteUrl')" id="siteUrl-error" class="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1">
                <UIcon name="i-heroicons-exclamation-circle" class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{{ getFieldError('siteUrl') }}</span>
              </p>
            </div>

            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {{ t('onboarding.steps.step2.form.address') }}
              </label>
              <UInput id="address" v-model="localData.address" :placeholder="t('onboarding.steps.step2.form.addressPlaceholder')" size="lg" class="w-full" autocomplete="street-address">
                <template #leading>
                  <UIcon name="i-heroicons-map-pin" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </template>
              </UInput>
            </div>

            <div>
              <label for="sector" class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                {{ t('onboarding.steps.step2.form.sector') }}
              </label>
              <UInput id="sector" v-model="localData.sector" :placeholder="t('onboarding.steps.step2.form.sectorPlaceholder')" size="lg" class="w-full" autocomplete="organization-title" />
            </div>

            <div class="pt-2 sm:pt-4 lg:pt-6 flex flex-col sm:flex-row justify-between gap-3">
              <CommonBackButton @click="handleBack" icon="i-lucide-arrow-left" :disabled="isSubmitting" class="w-full sm:w-auto" />
              <UButton
                type="submit"
                size="lg"
                :disabled="!isValid || isSubmitting"
                :loading="isSubmitting"
                :ui="{
                  rounded: 'rounded-lg',
                  padding: { lg: 'px-6 py-3.5' },
                }"
                class="w-full sm:w-auto sm:min-w-[200px] bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 transition-all duration-200 font-semibold text-white shadow-sm hover:shadow-md text-sm sm:text-base">
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 sm:w-5 sm:h-5" v-if="!isSubmitting" />
                </template>

                {{ isSubmitting ? t('onboarding.steps.step2.submitting') : t('onboarding.steps.step2.continue') }}
              </UButton>
            </div>
          </form>
        </div>

        <div class="order-1 lg:order-2 lg:block">
          <div class="lg:sticky lg:top-8">
            <CommonAppPreview
              v-if="profileData"
              :first-name="profileData.firstName"
              :last-name="profileData.lastName"
              :photo-url="photoPreviewUrl"
              :company-name="companyNameDisplay"
              :company-logo="companyLogoDisplay"
              class="hidden md:block" />
            <CommonAppPreview v-else :company-name="companyNameDisplay" :company-logo="companyLogoDisplay" class="hidden md:block" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
