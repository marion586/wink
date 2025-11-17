<script setup lang="ts">
interface Props {
  show: boolean;
}

defineProps<Props>();
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div class="text-center">
        <div class="relative">
          <img src="/assets/images/logo.png" alt="WINK" class="h-[24px] w-[95px] object-contain animate-float mx-auto" />
        </div>

        <div class="flex justify-center space-x-1 mt-4">
          <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>

        <p class="mt-3 text-xs text-gray-500 font-medium">Chargement...</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
