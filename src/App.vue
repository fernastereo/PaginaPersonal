<script setup>
  // import components asynchronously
  import { defineAsyncComponent } from 'vue'
  import LoadingSpinner from './components/LoadingSpinner.vue'

  const NavBar = defineAsyncComponent(() => import('@/components/NavBar.vue'))
  const HeroSection = defineAsyncComponent(() => import('@/components/HeroSection.vue'))
  const ServicesSection = defineAsyncComponent(() => import('@/components/ServicesSection.vue'))
  const AboutSection = defineAsyncComponent(() => import('@/components/AboutSection.vue'))
  const ExperienceSection = defineAsyncComponent(() => import('@/components/ExperienceSection.vue'))
  const ProjectsSection = defineAsyncComponent(() => import('@/components/ProjectsSection.vue'))
  const ContactSection = defineAsyncComponent(() => import('@/components/ContactSection.vue'))
  const TestimonialsSection = defineAsyncComponent(() => import('@/components/TestimonialsSection.vue'))
  const FooterSection = defineAsyncComponent(() => import('@/components/FooterSection.vue'))
  const BackToTop = defineAsyncComponent(() => import('@/components/BackToTop.vue'))
</script>

<template>
  <div class="bg-[#111827] min-h-screen">
    <!-- Wrap components in Suspense to handle loading -->
    <Suspense>
      <template #default>
        <!-- Wrap all Components inside a single root element -->
        <div>
          <NavBar />
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
          <TestimonialsSection />
          <FooterSection />
          <BackToTop />
        </div>
      </template>
      <template #fallback>
        <div class="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style>
  *{
    scrollbar-width: thin;
    scrollbar-color: #111827 #f1f1f1;
  }
</style>
