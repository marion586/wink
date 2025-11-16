<!-- components/Sidebar.vue -->
<script setup lang="ts">
interface Props {
  firstName?: string;
  lastName?: string;
  photoUrl?: string | null;
  companyName?: string;
  companyLogo?: string | null;
}

const props = defineProps<Props>();

const mainMenuItems = [
  { icon: 'i-heroicons-squares-2x2', label: 'Dashboard' },
  { icon: 'i-heroicons-folder', label: 'Projects', hasChevron: true },
  { icon: 'i-heroicons-user', label: 'Team' },
  { icon: 'i-heroicons-envelope', label: 'Messages' },
  { icon: 'i-heroicons-chart-bar', label: 'Analytics' },
];

const secondaryMenuItems = [
  { icon: 'i-heroicons-user-group', label: 'Users' },
  { icon: 'i-heroicons-chat-bubble-left-right', label: 'Chat' },
  { icon: 'i-heroicons-clock', label: 'History' },
];
</script>

<template>
  <div class="w-56 bg-white border-r border-gray-100 flex flex-col py-3 px-2">
    <div class="mb-4 px-2">
      <CommonCompanyHeader :company-name="companyName" :company-logo="companyLogo" />
    </div>

    <div class="flex-1 space-y-0 px-2">
      <CommonSidebarMenuItem v-for="item in mainMenuItems" :key="item.icon" :icon="item.icon" :label="item.label" :has-chevron="item.hasChevron" />
    </div>

    <div>
      <CommonSidebarMenuItem v-for="item in secondaryMenuItems" :key="item.icon" :icon="item.icon" :label="item.label" />

      <div v-if="firstName && lastName" class="mt-3 pt-3 border-t border-gray-100 px-2">
        <CommonUserProfile :first-name="firstName" :last-name="lastName" :photo-url="photoUrl" />
      </div>
    </div>
  </div>
</template>
