<script setup lang="ts">
const { t } = useI18n()

import type { ProfileData } from '@/types/types'

interface Props {
  modelValue: ProfileData
}

interface Emits {
  (e: 'update:modelValue', value: ProfileData): void
  (e: 'next'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localData = computed({
  get: () => props.modelValue,
  set: (value: any) => emit('update:modelValue', value)
})

const getInitials = () => {
  const first = localData.value.firstName.charAt(0).toUpperCase()
  const last = localData.value.lastName.charAt(0).toUpperCase()
  return first + last || 'AP'
}

const photoPreviewUrl = ref<string | null>(null)

watch(() => localData.value.photo, (newPhoto: Blob) => {
  if (newPhoto) {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreviewUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(newPhoto)
  } else {
    photoPreviewUrl.value = null
  }
}, { immediate: true })

const isValid = computed(() => {
  return localData.value.firstName.trim() !== '' &&
         localData.value.lastName.trim() !== '' &&
         localData.value.email.trim() !== '' &&
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localData.value.email)
})

const handleNext = () => {
  if (isValid.value) {
    emit('next')
  }
}
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-8">
          Faisons connaissance
        </h2>

        <form @submit.prevent="handleNext" class="space-y-6">
          <CommonPhotoUpload
            v-model="localData.photo"
            label="Photo de profil"
            :initials="getInitials()"
            size="md"
          />

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Prénom
            </label>
            <UInput
              v-model="localData.firstName"
              placeholder="Alain"
              size="lg"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nom
            </label>
            <UInput
              v-model="localData.lastName"
              placeholder="Provist"
              size="lg"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Adresse mail
            </label>
            <UInput
              v-model="localData.email"
              type="email"
              placeholder="alain.provist@peugeot.com"
              size="lg"
              class="w-full"
            >
              <template #leading>
                <UIcon name="i-heroicons-envelope" class="text-gray-400" />
              </template>
            </UInput>
          </div>

          <div class="pt-4">
            <UButton
              type="submit"
              block
              size="lg"
              :disabled="!isValid"
              color="primary"
              class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300"
            >
              Continuer
            </UButton>
          </div>
        </form>
      </div>

      <div class="hidden xl:block">
        <CommonAppPreview
          :first-name="localData.firstName"
          :last-name="localData.lastName"
          :photo-url="photoPreviewUrl"
        />
      </div>
    </div>
  </div>
</template>