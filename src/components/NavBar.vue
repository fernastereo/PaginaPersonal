<script setup>
  import { ref } from 'vue'
  import LanguageSelector from './LanguageSelector.vue'

  const menu = ref([
    {
      name: 'About Me',
      href: '#about'
    },
    {
      name: 'Services',
      href: '#services'
    },
    {
      name: 'Skills',
      href: '#skills'
    },
    {
      name: 'Projects',
      href: '#projects'
    },
    {
      name: 'Testimonials',
      href: '#testimonials'
    },
    {
      name: 'Contact',
      href: '#contact'
    }
  ])

  const isMenuOpen = ref(false)
  const scrollToSection = (href) => {
    isMenuOpen.value = false
    const section = document.querySelector(href)
    if(section){
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
</script>

<template>
  <header class="flex justify-between items-center p-6 bg-opacity-50 relative z-20">
    <div class="text-textBaseColor text-3xl font-bold">LOGO</div>
    <!-- Mobile Toggle button -->
    <div class="md:hidden z-30">
      <button type="button" 
        class="block focus:outline-none"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span v-if="isMenuOpen" class="text-5xl">
          <img src="https://img.icons8.com/ios-filled/100/111827/delete-sign.png" alt="close" width="50" height="50">
        </span>
        <span v-else class="text-5xl">
          <img src="https://img.icons8.com/ios-filled/100/111827/menu--v6.png" alt="menu" width="50" height="50">
        </span>
      </button>
    </div>
    <!-- NavBar Link -->
    <nav :class="['w-dvw h-dvh md:h-auto fixed inset-0 z-20 flex flex-col items-center justify-evenly bg-background md:relative md:bg-transparent md:flex md:justify-start md:flex-row-reverse md:gap-8',
      isMenuOpen ? 'block' : 'hidden'
    ]">
      <LanguageSelector/>
      <ul class="flex flex-col items-center space-y-12 md:flex-row md:space-x-12 md:space-y-0">
        <li v-for="item in menu" :key="item.name">
          <a :href="item.href" 
            class="block text-textBaseColor font-semibold transition hover:text-primary ease-linear text-2xl md:text-lg"
            @click="scrollToSection(item.href)"
          >{{ item.name }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>