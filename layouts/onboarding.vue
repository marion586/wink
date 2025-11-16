<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-50 ">
        <div class=" py-6 h-[24px] flex justify-center items-center bg-[#fff] border-b border-gray-200">
          <img 
            src="/assets/images/logo.png" 
            alt="WINK" 
            class="h-[24px] w-[95px]"            
          />
        </div>
    <div class=" px-4 !w-[80%] mx-auto mt-[80px] bg-white  rounded-2xl  shadow-sm  p-8 !pr-0 !border-r-0 md:p-12  border border-gray-200">
      <slot />
    </div>
  </div>
</template>

<style scoped>
</style>