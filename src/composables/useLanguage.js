import { ref } from 'vue';

const laguage = ref('es');

export const useLanguage = () => {
  const setLanguage = (lang) => {
    laguage.value = lang;
    console.log("🚀 ~ setLanguage ~ laguage:", laguage.value)
    
  };

  return {
    laguage,
    setLanguage,
  };
}