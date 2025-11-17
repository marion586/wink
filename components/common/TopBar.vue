<script setup lang="ts">
interface Props {
  logoUrl?: string;
}

withDefaults(defineProps<Props>(), {
  logoUrl: '/assets/images/logo.png',
});

const iconButtons = [
  { icon: 'i-heroicons-bell', tooltip: 'Notifications' },
  { icon: 'i-heroicons-chat-bubble-left-right', tooltip: 'Messages' },
  { icon: 'i-heroicons-question-mark-circle', tooltip: 'Help' },
];
</script>

<template>
  <div class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
    <div></div>

    <div class="flex items-center gap-10">
      <img v-if="logoUrl" src="/assets/images/logo.png" alt="WINK" class="h-[16px] mr-4 w-[50px]" />

      <div class="flex items-center gap-3">
        <CommonIconButton v-for="button in iconButtons" :key="button.icon" :icon="button.icon" :tooltip="button.tooltip" />
      </div>
    </div>
  </div>
</template>
