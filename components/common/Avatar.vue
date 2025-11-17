<script setup lang="ts">
interface Props {
  imageUrl?: string | null;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'user' | 'company';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  type: 'user',
});

const sizeClasses = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-12 h-12 text-sm',
};

const avatarClasses = computed(() => [
  sizeClasses[props.size],
  props.type === 'company' ? 'rounded' : 'rounded-full',
  'bg-gray-100 flex items-center justify-center font-bold text-gray-700 overflow-hidden',
]);
</script>

<template>
  <div :class="avatarClasses">
    <img v-if="imageUrl" :src="imageUrl" :alt="initials" class="w-full h-full object-cover" :class="type === 'company' ? 'rounded' : 'rounded-full'" />
    <span v-else>{{ initials }}</span>
  </div>
</template>
