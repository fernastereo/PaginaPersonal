<script setup>
  import AOS from 'aos'
  import 'aos/dist/aos.css'

  AOS.init()

</script> 

<template>
  <section class="relative w-full mt-20 py-20" data-aos="zoom-in-up">
    <div class="absolute top-0 inset-x-0 h-64 flex items-start">
      <div class="h-24 w-2/3 bg-gradient-to-br from-[#570cac] blur-2xl invisible opacity-40"></div>
      <div class="h-20 w-3/5 bg-gradient-to-r from-[#670ccf] opacity-40 blur-2xl"></div>
    </div>
    <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-screen-lg lg:max-w-screen-xl mx-auto relative">
      <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 relative pt-24 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto">
        <div class="lg:py-6">
          <div class="text-center lg:text-left">
            <h1 class="pt-4 text-white font-bold text-4xl md:text-5xl lg:text-6xl">
              Hi, I'm 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
                Fernando Cueto
              </span>
            </h1>
          </div>
          <p class="text-gray-300 pt-8 text-center lg:text-left mx-auto max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae accusantium amet ab, tenetur nulla mollitia magni rerum. Quia, vero hic corporis, labore neque eos, dolorem voluptatem unde doloribus modi molestias.
          </p>
          <div class="flex items-center gap-3 pt-9 flex-col sm:flex-row sm:justify-center sm:w-mx sm:mx-auto lg:mx-0">
            <button class="px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center">
              <span class="absolute inset-0 rounded-3xl group-hover:scale-105 origin-center transition-all ease-in-out bg-primary border-2 border-transparent"></span>
              <span class="relative flex items-center justify-center text-white">
                Hire me!
              </span>
            </button>
            <button class="border border-primary px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center">
              <div class="hover:scale-105 transition-all ease-in-out flex justify-center items-center relative">
                <div class="svg-container">
                  <svg class="download-icon" width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="download-arrow" d="M13 9L9 13M9 13L5 9M9 13V1" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129
                    20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213
                    20.1213C16.6839 19.5587 17 18.7956 17 18V17" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="download-loader text-white hidden"></div>
                </div>
                <a href="/resume.pdf" download="resume.pdf" class="pl-2 text-primary"> Download Resume</a>
              </div>
            </button>
          </div>
        </div>
        <div class="lg:h-full md:flex">
          <div class="flex w-full h-96 min-h-[24rem] lg:min-h-[none] lg:w-full lg:h-full items-center relative">
            <div class="absolute z-0 top-1/2 -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-25 from-[#570cac] to-primary blur-2xl"></div>
            <div class="absolute h-full z-10 p-2 -translate-y-1/2 top-1/2 lg:right-3 md:right:40 sm:right-16 rounded-full shadow-lg border border-primary">
              <img src="@/assets/me-TO.jpg" alt="Hero pic" width="500" height="auto" loading="lazy"
                class="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>