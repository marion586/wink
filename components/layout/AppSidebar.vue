<template>
  <aside class="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4">
    <div class="flex flex-col items-center space-y-4 flex-1">
      <UButton
        v-for="item in menuItems"
        :key="item.id"
        :icon="item.icon"
        variant="ghost"
        color="gray"
        :aria-label="item.label"
        class="w-10 h-10"
      />
    </div>

    <div class="mt-auto">
      <UDropdown
        :items="userMenuItems"
        :popper="{ placement: 'right-start' }"
      >
        <UAvatar
          :alt="userName"
          :ui="{ size: { sm: 'w-8 h-8' } }"
        />
      </UDropdown>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const userName = computed(() => authStore.userName || 'Utilisateur')

const menuItems = [
  { id: 'home', icon: 'i-heroicons-home', label: 'Accueil' },
  { id: 'list', icon: 'i-heroicons-list-bullet', label: 'Liste' },
  { id: 'user', icon: 'i-heroicons-user', label: 'Utilisateur' },
  { id: 'folder', icon: 'i-heroicons-folder', label: 'Dossiers' },
  { id: 'document', icon: 'i-heroicons-document', label: 'Documents' }
]

const userMenuItems = [
  [{
    label: userName.value,
    icon: 'i-heroicons-user-circle'
  }],
  [{
    label: 'Déconnexion',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    click: () => authStore.logout()
  }]
]
</script>

