import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.testimonials': 'Testimonials',
      'nav.contact': 'Contact',
      'nav.skills': 'Skills',

      // Hero Section
      'hero.greeting': "Hello, I'm",
      'hero.name': 'Fernando Cueto',
      'hero.role': 'Full Stack Developer',
      'hero.description':
        'I transform ideas into scalable digital solutions, powered by technology, innovation, and Artificial Intelligence.',
      'hero.viewProjects': 'View my Work',
      'hero.getInTouch': 'Contact me',
      'hero.download': 'Download CV',
      'hero.scrollDown': 'Scroll down to discover more',

      // About Section
      'about.title': 'About Me',
      'about.subtitle': 'Get to know me better',
      'about.description1':
        'I’m <bold>Fernando E. Cueto</bold>, a Fullstack Developer with over 10 years of experience building modern, scalable web applications. I’ve worked in corporate environments, startups, and as a freelancer, which has given me a broad perspective on how to adapt technology to different needs and contexts.',
      'about.description2':
        'My approach goes beyond coding: I strive to create solutions that deliver real value, optimizing processes and crafting memorable digital experiences. I’m passionate about continuous learning, working with technologies such as PHP, Laravel, C#, Javascript,Typescript, Node.js, Vue.js, and React, while exploring how Artificial Intelligence can enhance automation, performance, and personalization in applications.',
      'about.stats.projects': 'Successful Projects',
      'about.stats.clients': 'Happy Clients',
      'about.stats.experience': 'Years Experience',
      'about.stats.technologies': 'Used Technologies',

      // Services Section
      'services.title': 'Services',
      'services.subtitle': 'What I can do for you',
      'services.frontend.title': 'Frontend Development',
      'services.frontend.description':
        'Creating responsive and interactive user interfaces',
      'services.backend.title': 'Backend Development',
      'services.backend.description':
        'Building robust server-side applications and APIs',
      'services.fullstack.title': 'Full Stack Solutions',
      'services.fullstack.description':
        'Complete web application development from start to finish',

      // Skills Section
      'skills.title': 'Skills & Technologies',
      'skills.subtitle': 'Technologies I work with',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Tools',

      // Experience Section
      'experience.title': 'Work Experience',
      'experience.subtitle': 'My professional journey',

      // Projects Section
      'projects.title': 'Featured Projects',
      'projects.subtitle': 'Some of my recent work',
      'projects.viewProject': 'View Project',
      'projects.viewCode': 'View Code',

      // Testimonials Section
      'testimonials.title': 'Testimonials',
      'testimonials.subtitle': 'What clients say about my work',

      // Contact Section
      'contact.title': 'Get In Touch',
      'contact.subtitle': "Let's work together",
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.success':
        "Message sent successfully! I'll get back to you soon.",
      'contact.info': 'Contact me',
      'contact.info.email': 'Email',
      'contact.info.location': 'Location',
      'contact.cta':
        "Ready to start your project? Let's discuss how I can help bring your ideas to life.",

      // Footer
      'footer.scrollTop': 'Scroll to top',
      'footer.rights': 'All rights reserved.',
      'footer.madeWith': 'Made with',
      'footer.madeBy': 'by',
      'footer.passionate':
        'Full Stack Developer passionate about creating innovative solutions.',
    },
  },
  es: {
    translation: {
      // Navigation
      'nav.home': 'Inicio',
      'nav.about': 'Acerca',
      'nav.services': 'Servicios',
      'nav.experience': 'Experiencia',
      'nav.projects': 'Proyectos',
      'nav.testimonials': 'Testimonios',
      'nav.contact': 'Contacto',
      'nav.skills': 'Habilidades',

      // Hero Section
      'hero.greeting': 'Hola, soy',
      'hero.name': 'Fernando Cueto',
      'hero.role': 'Desarrollador Full Stack',
      'hero.description':
        'Transformo ideas en soluciones digitales escalables, impulsadas por tecnología, innovación e Inteligencia Artificial.',
      'hero.viewProjects': 'Ver mi Trabajo',
      'hero.getInTouch': 'Contactar',
      'hero.download': 'Descargar CV',
      'hero.scrollDown': 'Desplázate para descubrir más',

      // About Section
      'about.title': 'Acerca de Mí',
      'about.subtitle': 'Conoce más sobre mí',
      'about.description1':
        'Soy <bold>Fernando E. Cueto</bold>, Desarrollador Fullstack con más de 10 años de experiencia construyendo aplicaciones web modernas y escalables. He trabajado en entornos corporativos, startups y como freelancer, lo que me ha dado una visión amplia sobre cómo adaptar la tecnología a diferentes necesidades y contextos.',
      'about.description2':
        'Mi enfoque va más allá del código: busco crear soluciones que aporten valor real, optimizando procesos y generando experiencias digitales memorables. Me apasiona mantenerme en constante aprendizaje, integrando tecnologías como PHP, Laravel, C#, Javascript,Typescript, Node.js, Vue.js y React. También explorando cómo la Inteligencia Artificial puede potenciar la automatización, el rendimiento y la personalización de las aplicaciones.',
      'about.stats.projects': 'Proyectos Exitosos',
      'about.stats.clients': 'Clientes Satisfechos',
      'about.stats.experience': 'Años de Experiencia',
      'about.stats.technologies': 'Tecnologías Usadas',

      // Services Section
      'services.title': 'Servicios',
      'services.subtitle': 'Lo que puedo hacer por ti',
      'services.frontend.title': 'Desarrollo Frontend',
      'services.frontend.description':
        'Creando interfaces de usuario responsivas e interactivas',
      'services.backend.title': 'Desarrollo Backend',
      'services.backend.description':
        'Construyendo aplicaciones del lado del servidor y APIs robustas',
      'services.fullstack.title': 'Soluciones Full Stack',
      'services.fullstack.description':
        'Desarrollo completo de aplicaciones web de principio a fin',

      // Skills Section
      'skills.title': 'Habilidades y Tecnologías',
      'skills.subtitle': 'Tecnologías con las que trabajo',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Herramientas',

      // Experience Section
      'experience.title': 'Experiencia Laboral',
      'experience.subtitle': 'Mi trayectoria profesional',

      // Projects Section
      'projects.title': 'Proyectos Destacados',
      'projects.subtitle': 'Algunos de mis trabajos recientes',
      'projects.viewProject': 'Ver Proyecto',
      'projects.viewCode': 'Ver Código',

      // Testimonials Section
      'testimonials.title': 'Testimonios',
      'testimonials.subtitle': 'Lo que dicen los clientes sobre mi trabajo',

      // Contact Section
      'contact.title': 'Ponte en Contacto',
      'contact.subtitle': 'Trabajemos juntos',
      'contact.name': 'Nombre',
      'contact.email': 'Email',
      'contact.message': 'Mensaje',
      'contact.send': 'Enviar Mensaje',
      'contact.success': '¡Mensaje enviado exitosamente! Te responderé pronto.',
      'contact.info': 'Contactame',
      'contact.info.email': 'Email',
      'contact.info.location': 'Ubicación',
      'contact.cta':
        '¿Listo para comenzar tu proyecto? Hablemos sobre cómo puedo ayudarte a hacer realidad tus ideas.',

      // Footer
      'footer.scrollTop': 'Volver arriba',
      'footer.rights': 'Todos los derechos reservados.',
      'footer.madeWith': 'Hecho con',
      'footer.madeBy': 'por',
      'footer.passionate':
        'Full Stack Developer apasionado por crear soluciones innovadoras.',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
