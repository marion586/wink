<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const items = ref<StepperItem[]>([
  {
    title: 'Faisons connaissance',
  },
  {
    title: 'Créer votre espace de travail',
  },
  {
    title: 'Pour mieux vous connaître',
  }
])
</script>

<template>
  <UStepper color="secondary" :items="items" class="w-full" />
</template>
