<!-- components/UserProfile.vue -->
<script setup lang="ts">
interface Props {
  firstName?: string;
  lastName?: string;
  photoUrl?: string | null;
}

const props = defineProps<Props>();

const getInitials = () => {
  if (!props.firstName || !props.lastName) return 'AP';
  const first = props.firstName.charAt(0).toUpperCase();
  const last = props.lastName.charAt(0).toUpperCase();
  return first + last;
};

const displayName = computed(() => {
  if (props.firstName && props.lastName) {
    return `${props.firstName} ${props.lastName}`;
  }
  return '';
});
</script>

<template>
  <div class="flex items-center gap-2 px-2 py-2 bg-white border-2 border-blue-500 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
    <CommonAvatar :image-url="photoUrl" :initials="getInitials()" size="md" type="user" />

    <div class="flex-1 min-w-0">
      <p class="text-xs font-semibold text-gray-900 truncate">{{ displayName }}</p>
    </div>

    <UIcon name="i-heroicons-chevron-down" class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
  </div>
</template>
