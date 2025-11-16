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

const photoPreviewUrl = ref<string | null>(null);
const logoPreviewUrl = ref<string | null>(null);

// Computed values for reactive preview
const companyNameDisplay = computed(() => localData.value.companyName);
const companyLogoDisplay = computed(() => logoPreviewUrl.value);

// Watch for profile photo from previous step
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

// Watch for company logo changes
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

const isValid = computed(() => {
  return localData.value.companyName?.trim() !== '' && localData.value.description?.trim() !== '';
});

const handleNext = () => {
  if (isValid.value) {
    emit('next');
  }
};

const handleBack = () => {
  emit('back');
};
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Side - Form -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Créez votre espace de travail</h2>

        <form @submit.prevent="handleNext" class="space-y-6">
          <!-- Logo de l'entreprise -->
          <CommonPhotoUpload v-model="localData.logo" label="Logo de l'entreprise" initials="" size="md" />

          <!-- Nom de l'entreprise -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise
              <span class="text-red-500">*</span>
            </label>
            <UInput v-model="localData.companyName" placeholder="Renseignez le nom de votre entreprise" size="lg" class="w-full" />
          </div>

          <!-- Description de l'entreprise -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description de l'entreprise
              <span class="text-red-500">*</span>
            </label>
            <UTextarea
              v-model="localData.description"
              placeholder="Décrivez votre entreprise brièvement :

• Histoire et chiffres clés
• Produits ou services commercialisés
• Culture et valeurs"
              :rows="6"
              size="lg"
              class="w-full" />
          </div>

          <!-- Site internet -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Site internet</label>
            <UInput v-model="localData.siteUrl" placeholder="https://votre-entreprise.com" size="lg" class="w-full">
              <template #leading>
                <UIcon name="i-heroicons-globe-alt" class="text-gray-400" />
              </template>
            </UInput>
          </div>

          <!-- Adresse du siège social -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Adresse du siège social</label>
            <UInput v-model="localData.address" placeholder="Renseignez l'adresse de votre entreprise" size="lg" class="w-full">
              <template #leading>
                <UIcon name="i-heroicons-map-pin" class="text-gray-400" />
              </template>
            </UInput>
          </div>

          <!-- Secteur d'activité -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
            <UInput v-model="localData.sector" placeholder="Renseignez le secteur d'activité de votre entreprise" size="lg" class="w-full" />
          </div>

          <!-- Buttons -->
          <div class="pt-4 flex justify-between gap-3">
            <CommonBackButton @click="handleBack" icon="i-lucide-arrow-left" />
            <UButton type="submit" size="md" :disabled="!isValid" color="primary" class="w-[50%] bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300">Continuer</UButton>
          </div>
        </form>
      </div>

      <!-- Right Side - App Interface Preview (Mockup) -->
      <div class="hidden xl:block">
        <CommonAppPreview
          v-if="profileData"
          :first-name="profileData.firstName"
          :last-name="profileData.lastName"
          :photo-url="photoPreviewUrl"
          :company-name="companyNameDisplay"
          :company-logo="companyLogoDisplay" />
        <CommonAppPreview v-else :company-name="companyNameDisplay" :company-logo="companyLogoDisplay" />
      </div>
    </div>
  </div>
</template>
