<template>
  <div class="flex flex-row justify-evenly w-4/5 md:max-w-1/8">
    <button @click="setLanguage('es')"><img src="@/assets/001-colombia.png" alt="Spanish"></button>
    <button @click="setLanguage('en')"><img src="@/assets/002-usa.png" alt="English"></button>
    <button @click="setLanguage('de')"><img src="@/assets/003-germany.png" alt="Deutsch"></button>
  </div>
</template>
<script setup>
  import { useLanguage } from '@/composables/useLanguage';

  const { setLanguage } = useLanguage()
</script>
