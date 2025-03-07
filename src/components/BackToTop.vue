<template>
  <button v-if="isVisible" @click="scrollToTop" class="fixed bottom-4 right-4 bg-gradient-to-r from-primary to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-opacity duration-300 hover:bg-blue-600 ">
    🔝
  </button>
</template>
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  const isVisible = ref(false)

  const handleScroll = () => {
    isVisible.value = window.scrollY > 300
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>
