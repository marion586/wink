<script setup lang="ts">
interface Props {
  showTopBar?: boolean;
  logoUrl?: string;
}

withDefaults(defineProps<Props>(), {
  showTopBar: true,
  logoUrl: '/assets/images/logo.png',
});
</script>

<template>
  <div class="flex-1 flex flex-col bg-gray-50">
    <CommonTopBar v-if="showTopBar" :logo-url="logoUrl" />
    <div class="flex-1 bg-gray-50">
      <slot>
        <div class="flex-1 bg-gray-50"></div>
      </slot>
    </div>
  </div>
</template>
