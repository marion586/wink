<template>
  <div class="fixed bottom-8 right-8 z-50">
    <div class="bg-white rounded-lg px-4 py-2 flex items-center gap-3 shadow-lg border border-gray-200">
      <div v-if="!photoUrl" class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm">
        {{ initials }}
      </div>
      <img v-else :src="photoUrl" :alt="fullName" class="w-10 h-10 rounded-full object-cover" />

      <span class="font-medium text-gray-900 text-sm">
        {{ fullName }}
      </span>

      <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-gray-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
}

const props = defineProps<Props>();

const fullName = computed(() => `${props.firstName} ${props.lastName}`);
const initials = computed(() => {
  const first = props.firstName.charAt(0).toUpperCase();
  const last = props.lastName.charAt(0).toUpperCase();
  return first + last;
});
</script>
