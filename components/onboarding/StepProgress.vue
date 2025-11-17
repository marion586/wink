<script setup lang="ts">
import type { StepperItem } from '#ui/types';
interface StepType {
  number: number;
  label: string;
}

interface Props {
  currentStep: number;
  steps: Array<StepType>;
}

const props = defineProps<Props>();

const stepperItems = computed<StepperItem[]>(() => {
  return props.steps.map((step: StepType) => ({
    title: step.label,
  }));
});

const currentIndex = computed(() => props.currentStep - 1);
</script>

<template>
  <div class="mx-auto px-4 mb-4">
    <UStepper :model-value="currentIndex" :items="stepperItems" color="secondary" />
  </div>
</template>
