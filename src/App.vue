<script setup>
  // import components asynchronously
  import { defineAsyncComponent } from 'vue'

  const NavBar = defineAsyncComponent(() => import('@/components/NavBar.vue'))
</script>

<template>
  <div class="bg-[#111827] min-h-screen">
    <NavBar />
   </div>
</template>

<style scoped>

</style>
