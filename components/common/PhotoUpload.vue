<script setup lang="ts">
import { withDefaults } from 'vue';

interface Props {
  modelValue: File | null;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  initials?: string;
}

interface Emits {
  (e: 'update:modelValue', value: File | null): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Photo de profil',
  size: 'md',
  initials: 'AP',
});

const emit = defineEmits<Emits>();

const photoInput = ref<HTMLInputElement | null>(null);
const photoPreview = ref<string | null>(props.modelValue ? URL.createObjectURL(props.modelValue) : null);

// Tailles selon la prop
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl',
  };
  return sizes[props.size];
});

const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files[0]) {
    const file = files[0];

    // Validation
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Format invalide. Utilisez PNG ou JPEG');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Fichier trop volumineux (max 5MB)');
      return;
    }

    emit('update:modelValue', file);

    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = () => {
  emit('update:modelValue', null);
  photoPreview.value = null;
  if (photoInput.value) {
    photoInput.value.value = '';
  }
};

const triggerFileInput = () => {
  photoInput.value?.click();
};

// Surveiller les changements de modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      photoPreview.value = null;
    }
  }
);
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-4">
      {{ label }}
    </label>

    <div class="flex items-center gap-4">
      <div class="relative flex-shrink-0">
        <div v-if="!photoPreview" :class="sizeClasses" class="rounded-full bg-gray-200 flex items-center justify-center font-bold border-[5px] border-white shadow-md text-gray-500">
          {{ initials }}
        </div>
        <img v-else :src="photoPreview" alt="Photo preview" :class="[sizeClasses, 'rounded-full object-cover', 'border-[5px] border-white shadow-md']" />
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <UButton type="button" color="white" size="md" icon="i-heroicons-arrow-up-tray" @click="triggerFileInput" class="border border-gray-200 font-semibold">
            {{ photoPreview ? 'Modifier la photo' : 'Ajouter une photo' }}
          </UButton>

          <UButton v-if="photoPreview" type="button" color="white" variant="ghost" size="md" class="border border-gray-200" @click="removePhoto">Supprimer</UButton>
        </div>

        <input ref="photoInput" type="file" accept=".png,.jpg,.jpeg" class="hidden" @change="handlePhotoUpload" />

        <p class="text-xs text-gray-500 mt-1">au format *.png ou *.jpeg max 5mo</p>
      </div>
    </div>
  </div>
</template>
