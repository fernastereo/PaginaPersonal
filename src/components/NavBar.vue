<script setup>
  import { ref } from 'vue'

  const menu = ref([
    {
      name: 'Services',
      href: '#services'
    },
    {
      name: 'About Me',
      href: '#about'
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
    <div class="text-white text-3xl font-bold">LOGO</div>
    <!-- Mobile Toggle button -->
    <div class="md:hidden z-30">
      <button type="button" 
        class="block focus:outline-none"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span v-if="isMenuOpen" class="text-5xl">
          <img src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png" alt="close" width="50" height="50">
        </span>
        <span v-else class="text-5xl">
          <img src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png" alt="menu" width="50" height="50">
        </span>
      </button>
    </div>
    <!-- NavBar Link -->
    <nav :class="['fixed inset-0 z-20 flex flex-col items-center justify-center md:relative md:bg-transparent md:flex md:justify-between md:flex-row',
      isMenuOpen ? 'block' : 'hidden'
    ]">
      <ul class="flex flex-col items-center space-y-12 md:flex-row md:space-x-5 md:space-y-0">
        <li v-for="item in menu" :key="item.name">
          <a :href="item.href" 
            class="block text-white transition hover:text-primary ease-linear text-2xl md:text-lg"
            @click="scrollToSection(item.href)"
          >{{ item.name }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>