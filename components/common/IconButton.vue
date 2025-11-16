<!-- components/IconButton.vue -->
<script setup lang="ts">
interface Props {
  icon: string;
  tooltip?: string;
}

defineProps<Props>();
</script>

<template>
  <button class="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" :title="tooltip">
    <UIcon :name="icon" class="w-full h-full" />
  </button>
</template>
