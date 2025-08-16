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
        'I create exceptional digital experiences through innovative web solutions. Specialized in React, Node.js, and modern technologies.',
      'hero.viewProjects': 'View my Work',
      'hero.getInTouch': 'Contact me',
      'hero.download': 'Download CV',
      'hero.scrollDown': 'Scroll down to discover more',

      // About Section
      'about.title': 'About Me',
      'about.subtitle': 'Get to know me better',
      'about.description':
        "I'm a passionate full-stack developer with 5+ years of experience creating web applications. I love turning complex problems into simple, beautiful solutions.",
      'about.stats.projects': 'Projects',
      'about.stats.clients': 'Happy Clients',
      'about.stats.experience': 'Years Experience',
      'about.stats.technologies': 'Technologies',

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
      'contact.form.name': 'Name',
      'contact.form.email': 'Email',
      'contact.form.message': 'Message',
      'contact.form.send': 'Send Message',
      'contact.form.success':
        "Message sent successfully! I'll get back to you soon.",
      'contact.info.email': 'Email',
      'contact.info.phone': 'Phone',
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
        'Creo experiencias digitales excepcionales a través de soluciones web innovadoras. Especializado en React, Node.js y tecnologías modernas.',
      'hero.viewProjects': 'Ver mi Trabajo',
      'hero.getInTouch': 'Contactar',
      'hero.download': 'Descargar CV',
      'hero.scrollDown': 'Desplázate para descubrir más',

      // About Section
      'about.title': 'Acerca de Mí',
      'about.subtitle': 'Conoce más sobre mí',
      'about.description':
        'Soy un desarrollador full-stack apasionado con más de 5 años de experiencia creando aplicaciones web. Me encanta convertir problemas complejos en soluciones simples y hermosas.',
      'about.stats.projects': 'Proyectos',
      'about.stats.clients': 'Clientes Satisfechos',
      'about.stats.experience': 'Años de Experiencia',
      'about.stats.technologies': 'Tecnologías',

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
      'contact.form.name': 'Nombre',
      'contact.form.email': 'Email',
      'contact.form.message': 'Mensaje',
      'contact.form.send': 'Enviar Mensaje',
      'contact.form.success':
        '¡Mensaje enviado exitosamente! Te responderé pronto.',
      'contact.info.email': 'Email',
      'contact.info.phone': 'Teléfono',
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
