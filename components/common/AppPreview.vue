<script setup lang="ts">
interface Props {
  firstName?: string;
  lastName?: string;
  photoUrl?: string | null;
  companyName?: string;
  companyLogo?: string | null;
  height?: string;
  showTopBar?: boolean;
  logoUrl?: string;
}

withDefaults(defineProps<Props>(), {
  height: '550px',
  showTopBar: true,
  logoUrl: `/assets/images/logo.png`,
});
</script>

<template>
  <div class="overflow-hidden bg-white shadow-sm" :style="{ height }">
    <div class="flex h-full">
      <LayoutSidebarPreview :first-name="firstName" :last-name="lastName" :photo-url="photoUrl" :company-name="companyName" :company-logo="companyLogo" />

      <CommonMainContentArea :show-top-bar="showTopBar" logo-url="/assets/images/logo.png">
        <slot name="content"></slot>
      </CommonMainContentArea>
    </div>
  </div>
</template>
