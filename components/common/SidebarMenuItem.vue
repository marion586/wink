<script setup lang="ts">
interface Props {
  icon: string;
  label?: string;
  hasChevron?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hasChevron: false,
  isActive: false,
  isLoading: false,
});
</script>

<template>
  <div class="flex items-center gap-2.5 py-2 cursor-pointer hover:bg-gray-50 rounded px-2">
    <UIcon :name="icon" class="w-4 h-4 flex-shrink-0" :class="isActive ? 'text-blue-500' : 'text-gray-400'" />

    <div v-if="isLoading" class="flex-1 h-1.5 bg-gray-100 rounded"></div>
    <div v-else class="flex-1 text-sm font-medium text-gray-700">
      {{ label }}
    </div>

    <UIcon v-if="hasChevron" name="i-heroicons-chevron-down" class="w-3 h-3 text-gray-400" />
  </div>
</template>
