<script setup>
  // import components asynchronously
  import { defineAsyncComponent } from 'vue'

  const NavBar = defineAsyncComponent(() => import('@/components/NavBar.vue'))
  const HeroSection = defineAsyncComponent(() => import('@/components/HeroSection.vue'))
  const ServicesSection = defineAsyncComponent(() => import('@/components/ServicesSection.vue'))
</script>

<template>
  <div class="bg-[#111827] min-h-screen">
    <NavBar />
    <HeroSection />
    <ServicesSection />
  </div>
</template>

<style scoped>

</style>
