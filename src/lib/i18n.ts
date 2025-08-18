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
      'skills.subtitle':
        'My expertise is built on a modern and adaptable stack that allows me to build solid, scalable, and user-focused applications. Here are the technologies I work with every day:',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Tools',

      // Experience Section
      'experience.title': 'Work Experience',
      'experience.subtitle':
        'Throughout my career, I’ve collaborated with companies across various industries, contributing to challenging projects and leveraging modern technologies to build scalable, high-impact digital solutions.',

      // Projects Section
      'projects.title': 'Featured Projects',
      'projects.subtitle':
        "Here are some of the projects I've worked on, combining innovation, scalability, and user experience. Each project reflects my holistic approach as a Fullstack Developer and my ability to turn ideas into concrete digital solutions.",
      'projects.viewProject': 'View Project',
      'projects.viewCode': 'View Code',

      // Individual Projects
      'projects.publicaciones.title': 'Document Publication Management App',
      'projects.publicaciones.description':
        'Application created to manage the publication of documents required by Curaduría Urbana 2 in Cartagena to comply with current regulations. The solution includes a REST API in PHP that centralizes all necessary functionalities and a Vue.js interface that allows documents to be managed efficiently and in an organized manner, ensuring that legal processes are carried out effectively and transparently.',
      'projects.chat.title': 'Real-time Chat Application',
      'projects.chat.description':
        'Chat application developed to enable instant communication between users, combining a REST API in PHP with Laravel and a Vue.js frontend interface. The solution integrates Sockets using Laravel Echo and Pusher, allowing real-time updates of messages and notifications, providing a smooth and responsive user experience in collaborative environments.',
      'projects.weather.title': 'Weather Dashboard',
      'projects.weather.description':
        'Real-time weather application with geolocation, weather forecasts, and beautiful data visualizations using Chart.js.',
      'projects.portfolio.title': 'Portfolio Website',
      'projects.portfolio.description':
        'Responsive portfolio website built with modern technologies, featuring smooth animations and dark mode support.',

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
      'skills.subtitle':
        'Mi experiencia se basa en un stack moderno y adaptable, que me permite construir aplicaciones sólidas, escalables y centradas en el usuario. Estas son las tecnologías con las que trabajo día a día:',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Herramientas',

      // Experience Section
      'experience.title': 'Experiencia Laboral',
      'experience.subtitle':
        'A lo largo de mi carrera he colaborado con empresas de diferentes sectores, contribuyendo a proyectos desafiantes y aplicando tecnologías modernas para crear soluciones digitales escalables y de alto impacto.',

      // Projects Section
      'projects.title': 'Proyectos Destacados',
      'projects.subtitle':
        'Estos son algunos de los proyectos en los que he trabajado, combinando innovación, escalabilidad y experiencia de usuario. Cada proyecto refleja mi enfoque integral como desarrollador Fullstack y mi capacidad para transformar ideas en soluciones digitales concretas.',
      'projects.viewProject': 'Ver Proyecto',
      'projects.viewCode': 'Ver Código',

      // Individual Projects
      'projects.publicaciones.title': 'Aplicación de gestión de publicaciones',
      'projects.publicaciones.description':
        'Aplicación diseñada para gestionar las publicaciones de documentos que la Curaduría Urbana 2 de Cartagena debe realizar para cumplir con la normativa vigente. La solución incluye una API REST en PHP que centraliza todas las funcionalidades necesarias y una interfaz en Vue.js que permite administrar los documentos de manera ágil y organizada, asegurando que los procesos legales se cumplan de forma eficiente y transparente.',
      'projects.chat.title': 'Aplicación de chat en tiempo real',
      'projects.chat.description':
        'Aplicación de chat desarrollada para permitir la comunicación instantánea entre usuarios, combinando una API REST en PHP con Laravel y una interfaz frontend en Vue.js. La solución integra Sockets utilizando Laravel Echo y Pusher, permitiendo la actualización en tiempo real de los mensajes y notificaciones, ofreciendo una experiencia de usuario ágil y fluida en entornos colaborativos.',
      'projects.weather.title': 'Dashboard del Clima',
      'projects.weather.description':
        'Aplicación meteorológica en tiempo real con geolocalización, pronósticos del tiempo y hermosas visualizaciones de datos usando Chart.js.',
      'projects.portfolio.title': 'Sitio Web Portfolio',
      'projects.portfolio.description':
        'Sitio web portfolio responsivo construido con tecnologías modernas, con animaciones suaves y soporte para modo oscuro.',

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
