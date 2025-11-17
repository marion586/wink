<script setup lang="ts">
interface Props {
  icon?: string;
  label?: string;
}

interface Emits {
  (e: 'click'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <UButton variant="ghost" color="gray" :icon="props.icon || 'i-lucide-chevron-left'" size="sm" @click="handleClick">
    {{ props.label || 'Retour' }}
  </UButton>
</template>
