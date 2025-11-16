<!-- components/CompanyHeader.vue -->
<script setup lang="ts">
interface Props {
  companyName?: string;
  companyLogo?: string | null;
}

const props = defineProps<Props>();

const getInitials = () => {
  return props.companyName?.substring(0, 2).toUpperCase() || 'CO';
};
</script>

<template>
  <div class="flex items-center gap-2.5 py-2 px-3 border-2 border-gray-100 rounded-lg bg-white shadow-sm">
    <CommonAvatar :image-url="companyLogo" :initials="getInitials()" size="sm" type="company" />

    <div class="flex-1 text-sm font-medium text-gray-900 truncate">
      {{ companyName }}
    </div>

    <div class="flex items-center gap-1">
      <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
      <UIcon name="i-heroicons-arrows-pointing-out" class="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
    </div>
  </div>
</template>
