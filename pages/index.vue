
<template>
  <div class=" ">
    <OnboardingStepProgress 
      :current-step="currentStep" 
      :steps="steps" 
    />
    <div v-if="currentStep > 1" class=" px-2 mb-6">
      <CommonBackButton 
        @click="currentStep === 2 ? handleWorkspaceBack() : handlePreferencesBack()"
      />
    </div>
    <div >
      <OnboardingProfileStep
        v-if="currentStep === 1"
        v-model="profileData"
        @next="handleProfileNext"
      />
      <OnboardingWorkspaceStep
        v-else-if="currentStep === 2"
        v-model="workspaceData"
        :profile-data="profileData"
        @next="handleWorkspaceNext"
        @back="handleWorkspaceBack"
      />

      <OnboardingPreferencesStep
        v-else-if="currentStep === 3"
        v-model="preferencesData"
        @submit="handleSubmit"
        @back="handlePreferencesBack"
      />
    </div>

    <OnboardingUserBadge
      v-if="currentStep === 1 && profileData.firstName && profileData.lastName"
      :first-name="profileData.firstName"
      :last-name="profileData.lastName"
      :photo-url="photoPreview"
    />
  </div>
</template>
<script setup lang="ts">
import {stepData} from "../utils/stepData"
definePageMeta({
  layout: 'onboarding'
})

const { t } = useI18n()

const currentStep = ref(1)

const profileData = ref({
  firstName: 'Alain',
  lastName: 'Provist',
  email: 'alain.provist@peugeot.com',
  photo: null as File | null
})

const workspaceData = ref({
  logo: null as File | null,
  companyName: '',
  description: '',
  siteUrl: '',
  address: '',
  sector: ''
})

const preferencesData = ref({
  role: '',
  teamSize: '',
  goals: [] as string[]
})


const steps = computed(() => stepData)


const photoPreview = ref<string | null>(null)

watch(() => profileData.value.photo, (newPhoto) => {
  if (newPhoto) {
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(newPhoto)
  } else {
    photoPreview.value = null
  }
}, { immediate: true })


const handleProfileNext = () => {
  currentStep.value = 2
}

const handleWorkspaceNext = () => {
  currentStep.value = 3
}

const handleWorkspaceBack = () => {
  currentStep.value = 1
}

const handlePreferencesBack = () => {
  currentStep.value = 2
}

const handleSubmit = async () => {
  console.log('Submitting onboarding data:', {
    profile: profileData.value,
    workspace: workspaceData.value,
    preferences: preferencesData.value
  })
  

  await new Promise(resolve => setTimeout(resolve, 1000))

  alert('Inscription terminée ! Redirection vers le dashboard...')
}
</script>