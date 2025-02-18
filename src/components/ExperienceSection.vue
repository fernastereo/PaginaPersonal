<template>
  <section class="text-white mt-18" id="skills">
    <div class="absolute right-0 top-[110rem] h-full w-full justify-end">
      <span class="flex opacity-20">
        <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
        <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
      </span>
    </div>
    <div class="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 xl:px-16">
      <div class="mt-4 md:mt-0 text-left flex flex-col z-10 h-full w-[80%]">
        <h2 class="text-4xl font-bold text-white text-left mb-4">My
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Skills</span>
        </h2>
        <div class="mt-8" v-for="skill in skills" :key="skill.id">
          <div class="flex items-end justify-between" data-aos="fade-right">
            <h4 class="font-semibold uppercase text-white">
              {{ skill.name }}
            </h4>
            <h3 class="text-2xl font-bold text-white">{{ skill.level }}</h3>
          </div>
          <div class="mt-2 h-1 w-full bg-[#131d30] rounded-full">
            <div class="h-1 rounded-full bg-primary" :style="`width: ${skill.level}`"></div>
          </div>
        </div>
      </div>
      <div data-aos="flip-left">
        <h2 class="text-4xl font-bold text-white text-left mb-8 md:text-center md:mt-0 mt-8">My Experience</h2>
        <div class="space-y-8 py-8" data-aos="fade-left">
          <div v-for="experience in experiences" :key="experience.id" class="flex items-center rounded-xl p-4 bg-[#111a3e] shadow-lg border border-[#1f1641]">
            <div class="w-1/4">
              <img src="https://img.icons8.com/ios-filled/100/ffffff/lawyer.png" alt="lawyer">
            </div>
            <div class="w-3/4 pl-4">
              <h3 class="text-2xl font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to bg-secondary">
                {{ experience.role }}
              </h3>
              <p class="text-white">{{ experience.company }}</p>
              <p class="text-white">{{ experience.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue';

  const skills = ref([
    {
      id: 1,
      name: 'HTML',
      icon: 'https://img.icons8.com/ios-filled/100/ffffff/html-5--v1.png',
      level: '90%'
    },
    {
      id: 2,
      name: 'CSS',
      icon: 'https://img.icons8.com/ios-filled/100/ffffff/css3.png',
      level: '80%'
    },
    {
      id: 3,
      name: 'JavaScript',
      icon: 'https://img.icons8.com/ios-filled/100/ffffff/javascript--v1.png',
      level: '85%'
    },
    {
      id: 4,
      name: 'Vue.js',
      icon: 'https://img.icons8.com/ios-filled/100/ffffff/vue-js.png',
      level: '90%'
    },
    {
      id: 5,
      name: 'React.js',
      icon: 'https://img.icons8.com/ios-filled/100/ffffff/react-native.png',
      level: '85%'
    },
    {
      id: 6,
      name: 'Node.js',
      icon: 'https://img.icons8.com/ios-filled/100/ffffff/nodejs.png',
      level: '80%'
    },
    {
      id: 7,
      name: 'MongoDB',
      icon: 'https://img.icons8.com/color/100/ffffff/mongodb.png',
      level: '75%'
    },
    {
      id: 8,
      name: 'Git',
      icon: 'https://img.icons8.com/ios-filled/100/ffffff/git.png',
      level: '85%'
    },

  ])

  const experiences = ref([
    {
      id: 1,
      role: 'Frontend Developer',
      company: 'Google',
      date: '2019 - 2021',
    },
    {
      id: 3,
      role: 'Fullstack Developer',
      company: 'Amazon',
      date: '2015 - 2017',
    },
    {
      id: 4,
      role: 'Web Developer',
      company: 'Microsoft',
      date: '2013 - 2015',
    },
    {
      id: 5,
      role: 'Frontend Developer',
      company: 'Google',
      date: '2019 - 2021',
    },
  ])
</script>