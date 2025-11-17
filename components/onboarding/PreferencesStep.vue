<script setup lang="ts">
const { t } = useI18n();

interface PreferencesData {
  role: string;
  teamSize: string;
  goals: string[];
}

interface Props {
  modelValue: PreferencesData;
}

interface Emits {
  (e: 'update:modelValue', value: PreferencesData): void;
  (e: 'next'): void;
  (e: 'back'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const isSubmitting = ref(false);
const toast = useToast();

const roleOptions = [
  { value: 'founder', label: t('onboarding.steps.step3.roles.founder') },
  { value: 'manager', label: t('onboarding.steps.step3.roles.manager') },
  { value: 'developer', label: t('onboarding.steps.step3.roles.developer') },
  { value: 'designer', label: t('onboarding.steps.step3.roles.designer') },
  { value: 'other', label: t('onboarding.steps.step3.roles.other') },
];

const teamSizeOptions = [
  { value: '1', label: t('onboarding.steps.step3.teamSizes.solo') },
  { value: '2-10', label: t('onboarding.steps.step3.teamSizes.small') },
  { value: '11-50', label: t('onboarding.steps.step3.teamSizes.medium') },
  { value: '51-200', label: t('onboarding.steps.step3.teamSizes.large') },
  { value: '200+', label: t('onboarding.steps.step3.teamSizes.enterprise') },
];

const goalOptions = [
  { value: 'project_management', label: t('onboarding.steps.step3.goals.projectManagement'), icon: 'i-heroicons-chart-bar' },
  { value: 'team_collaboration', label: t('onboarding.steps.step3.goals.teamCollaboration'), icon: 'i-heroicons-users' },
  { value: 'task_tracking', label: t('onboarding.steps.step3.goals.taskTracking'), icon: 'i-heroicons-clipboard-document-check' },
  { value: 'time_management', label: t('onboarding.steps.step3.goals.timeManagement'), icon: 'i-heroicons-clock' },
  { value: 'resource_planning', label: t('onboarding.steps.step3.goals.resourcePlanning'), icon: 'i-heroicons-calendar' },
  { value: 'reporting', label: t('onboarding.steps.step3.goals.reporting'), icon: 'i-heroicons-document-chart-bar' },
];

const isValid = computed(() => {
  return localData.value.role !== '' && localData.value.teamSize !== '' && localData.value.goals.length > 0;
});

const toggleGoal = (goalValue: string) => {
  const index = localData.value.goals.indexOf(goalValue);
  if (index > -1) {
    localData.value.goals.splice(index, 1);
  } else {
    localData.value.goals.push(goalValue);
  }
};

const isGoalSelected = (goalValue: string) => {
  return localData.value.goals.includes(goalValue);
};

const handleSubmit = async () => {
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
    const response = await $fetch('/api/onboarding/preferences', {
      method: 'POST',
      body: {
        preferences: localData.value,
      },
    });

    toast.add({
      title: t('onboarding.success.title'),
      description: t('onboarding.success.preferencesComplete'),
      color: 'green',
      icon: 'i-heroicons-check-circle',
    });

    emit('next');
  } catch (error: any) {
    console.error('Preferences save error:', error);

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
</script>

<template>
  <div class="w-full max-w-3xl mx-auto">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        {{ t('onboarding.steps.step3.title') }}
      </h2>
      <p class="text-gray-600">
        {{ t('onboarding.steps.step3.subtitle') }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">
          {{ t('onboarding.steps.step3.form.role') }}
          <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            v-for="option in roleOptions"
            :key="option.value"
            type="button"
            @click="localData.role = option.value"
            :class="[
              'px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all',
              localData.role === option.value ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300',
            ]">
            {{ option.label }}
          </button>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">
          {{ t('onboarding.steps.step3.form.teamSize') }}
          <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            v-for="option in teamSizeOptions"
            :key="option.value"
            type="button"
            @click="localData.teamSize = option.value"
            :class="[
              'px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all',
              localData.teamSize === option.value ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300',
            ]">
            {{ option.label }}
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">
          {{ t('onboarding.steps.step3.form.goals') }}
          <span class="text-red-500">*</span>
        </label>
        <p class="text-sm text-gray-500 mb-3">
          {{ t('onboarding.steps.step3.form.goalsHint') }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            v-for="option in goalOptions"
            :key="option.value"
            type="button"
            @click="toggleGoal(option.value)"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all text-left',
              isGoalSelected(option.value) ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300',
            ]">
            <UIcon :name="option.icon" class="text-xl flex-shrink-0" />
            <span>{{ option.label }}</span>
            <UIcon v-if="isGoalSelected(option.value)" name="i-heroicons-check-circle-solid" class="ml-auto text-indigo-600" />
          </button>
        </div>
      </div>

      <div class="pt-4 flex justify-between gap-3">
        <CommonBackButton @click="handleBack" icon="i-lucide-arrow-left" :disabled="isSubmitting" />
        <UButton type="submit" size="md" :disabled="!isValid || isSubmitting" :loading="isSubmitting" color="primary" class="w-[50%] bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300">
          {{ isSubmitting ? t('onboarding.steps.step3.submitting') : t('onboarding.steps.step3.complete') }}
        </UButton>
      </div>
    </form>
  </div>
</template>
