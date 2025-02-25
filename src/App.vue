<script setup>
  // import components asynchronously
  import { defineAsyncComponent } from 'vue'

  const NavBar = defineAsyncComponent(() => import('@/components/NavBar.vue'))
  const HeroSection = defineAsyncComponent(() => import('@/components/HeroSection.vue'))
  const ServicesSection = defineAsyncComponent(() => import('@/components/ServicesSection.vue'))
  const AboutSection = defineAsyncComponent(() => import('@/components/AboutSection.vue'))
  const ExperienceSection = defineAsyncComponent(() => import('@/components/ExperienceSection.vue'))
  const ProjectsSection = defineAsyncComponent(() => import('@/components/ProjectsSection.vue'))
</script>

<template>
  <div class="bg-[#111827] min-h-screen">
    <NavBar />
    <HeroSection />
    <ServicesSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
  </div>
</template>

<style scoped>

</style>
