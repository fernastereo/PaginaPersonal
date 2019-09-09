//define languages reload anchors
var dataReload = document.querySelectorAll("[data-lang]");

//language translations
var language = {
  eng: {
    roleText: "Backend Developer",
    nav__home: "Home",
    nav__profile: "Profile",
    nav__projects: "Projects",
    nav__blog: "Blog",
    nav__contact: "Contact",
    main__button: "Hire me!",
    profile__title: "about me",
    profile__subtitle: "a brief summary",
    profile__description: "I am a Backend Developer with industry experience building software and web applications. I specialize in .Net Core (C# and Visual Basic) and have professional experience working with PHP and JavaScript. I also have experience working with HTML, CSS, Responsive Design, Bootstrap, Git, and Github",
    profile__button: "Hire me!",
    profile__skills: "skills",
    projects__title: "my projects",
    projects__subtitle: "An overview to",
    projects__sac__description: "Software for managing the entire process of requiring and obtaining a formal building permit in Colombia according to the Colombian Building Code. Currently upgrading to web app with Laravel.",
    projects__docus__description: "Web app for the reception of documents in offices, loading of attachments, assignment of employees in charge, print label with proof of receipt of the document through Dymo Labelwriter 450 printer.",
    projects__signature__description: "Application with fingerprint capture through Digital Persona reader device and signature capture through Wacom STU-530 device.",
    projects__censo__description: "Web app for registering information about people who live in condos including all family members, vehicles, pets. It's useful for the managing to send notifications via e-mail for all accupants.",
    projects__api__description: "Apirestful built with Laravel framework. It includes all the operations for an e-cammerce application such as clients, sellers, products, categories, and transactions.",
    projects__school__description: "School Management system for administration of students profiles, subjects, courses, grades.",
    contact__description: "I’m a software developer. I can help you solve a problem, build a product or grow existing project.",
    contact__title: "Thanks for taking the time to reach out.",
    contact__subtitle: "How can I help you today?",
    contact__label__name: "Your name",
    contact__label__message: "Message",
    contact__button: "Send Message"
  },
  es: {
    roleText: "Desarrollador Backend",
    nav__home: "Inicio",
    nav__profile: "Perfil",
    nav__projects: "Proyectos",
    nav__blog: "Blog",
    nav__contact: "Contacto",
    main__button: "Contrátame!",
    profile__title: "acerca de mi",
    profile__subtitle: "un breve resumen",
    profile__description: "Soy un Desarrollador Backend con experiencia en la industria construyendo software y aplicaciones web. Me especializo en .Net Core (C # y Visual Basic) y tengo experiencia profesional trabajando con PHP y JavaScript. También tengo experiencia trabajando con HTML, CSS, diseño responsive, Bootstrap, Git y Github",
    profile__button: "Contrátame!",
    profile__skills: "competencias",
    projects__title: "mis proyectos",
    projects__subtitle: "una visión general de",
    projects__sac__description: "Software para la administración de todo el proceso para solicitar y obtener licencias de construcción en Colombia de acuerdo con la ley colombiana. Actualmente en actualización hacia aplicacion web con laravel",
    projects__docus__description: "Aplicación web para la recepción de documentos en oficinas, cargue de documentos adjuntos, asignación de encargados, impresión de label con prueba de recepción a través de impresora Dymo Labelwriter 450 printer.",
    projects__signature__description: "Aplicacion con captura de huella dactilar a través de dispositivo lector Digital Persona y captura de firma manuscrita a través de dispositivo Wacom STU-530 par anotificacion de documentos legales.",
    projects__censo__description: "Aplicación web para el registro de información de habitantes de edificios o condominios incluyendo miembros de la familia, vehículos, mascotas, etc. Util para la administración y envío de notificaciones vía e-mail para los ocupantes.",
    projects__api__description: "Apirestful desarrollada en laravel framework. Incluye todas las operaciones para una aplicación de e-commerce, tales como clientes, vendedores, productos, categorías y transacciones.",
    projects__school__description: "Sistema para administracion de escuelas para la gestión de perfiles de estudiantes, asignaturas, cursos, notas, etc.",
    contact__description: "Soy un desarrollador de software. Puedo ayudarte resolviendo algún problema, desarrollando un producto o hacer crecer un proyecto existente.",
    contact__title: "Gracias por tomarte el tiempo de comunicarte.",
    contact__subtitle: "Cómo puedo ayudarte hoy?",
    contact__label__name: "Tu nombre",
    contact__label__message: "Mensaje",
    contact__button: "Enviar Mensaje"
  },
  ger: {
    roleText: "Backend-Entwickler",
    nav__home: "Zuhause",
    nav__profile: "Profil",
    nav__projects: "Projekte",
    nav__blog: "Blog",
    nav__contact: "Kontakt",
    main__button: "Stellt mich ein!",
    profile__title: "über mich",
    profile__subtitle: "eine kurze zusammenfassung",
    profile__description: "Ich bin ein Backend-Entwickler mit Branchenerfahrung beim Erstellen von Software und Webanwendungen. Ich bin auf .NET Core (C # und Visual Basic) spezialisiert und habe Berufserfahrung in der Arbeit mit PHP und JavaScript. Ich habe auch Erfahrung mit HTML, CSS, Responsive Design, Bootstrap, Git und Github",
    profile__button: "Stellt mich ein!",
    profile__skills: "kompetenzen",
    projects__title: "meine projekte",
    projects__subtitle: "ein überblick zu",
    projects__sac__description: "Software zur Verwaltung des gesamten Prozesses der Anforderung und Erlangung einer formellen Baugenehmigung in Kolumbien gemäß dem kolumbianischen Baugesetz. Derzeit wird mit Laravel ein Upgrade auf eine Web-App durchgeführt.",
    projects__docus__description: "Web-App für den Empfang von Dokumenten in Büros, das Laden von Anhängen, die Zuordnung von verantwortlichen Mitarbeitern, das Drucken des Etiketts mit dem Nachweis des Eingangs des Dokuments über den Dymo Labelwriter 450-Drucker.",
    projects__signature__description: "Anwendung mit Erfassung von Fingerabdrücken über das Lesegerät Digital Persona und Erfassung von Unterschriften über das Wacom STU-530-Gerät.",
    projects__censo__description: "Web-App zum Registrieren von Informationen über Personen, die in Eigentumswohnungen leben, einschließlich aller Familienmitglieder, Fahrzeuge, Haustiere. Es ist hilfreich, wenn Sie Benachrichtigungen für alle Teilnehmer per E-Mail versenden möchten.",
    projects__api__description: "Apirestful errichtet mit Laravel-Rahmen. Es umfasst alle Vorgänge für eine E-Cammerce-Anwendung wie Kunden, Verkäufer, Produkte, Kategorien und Transaktionen.",
    projects__school__description: "Schulverwaltungssystem zur Verwaltung von Schülerprofilen, Fächern, Kursen, Noten.",
    contact__description: "Ich bin ein Softwareentwickler. Ich kann Ihnen helfen, ein Problem zu lösen, ein Produkt zu bauen oder ein bestehendes Projekt zu erweitern.",
    contact__title: "Vielen Dank, dass Sie sich die Zeit genommen haben, uns zu erreichen.",
    contact__subtitle: "Wie kann ich Ihnen heute helfen?",
    contact__label__name: "Dein name",
    contact__label__message: "Botschaft",
    contact__button: "Nachricht senden"
  }
};

function translate(){
  const lang = this.dataset.lang;
  if (lang === "eng") {
    role.textContent = language.eng.roleText;
    nav__home.textContent = language.eng.nav__home;
    nav__profile.textContent =  language.eng.nav__profile;
    nav__projects.textContent =  language.eng.nav__projects;
    nav__blog.textContent = language.eng.nav__blog;
    nav__contact.textContent =  language.eng.nav__contact;
    main__button.textContent = language.eng.main__button;
    profile__title.textContent = language.eng.profile__title;
    profile__subtitle.textContent = language.eng.profile__subtitle;
    profile__description.textContent = language.eng.profile__description;
    profile__button.textContent = language.eng.profile__button;
    profile__skills.textContent = language.eng.profile__skills;
    projects__title.textContent = language.eng.projects__title;
    projects__subtitle.textContent = language.eng.projects__subtitle;
    projects__sac__description.textContent = language.eng.projects__sac__description;
    projects__docus__description.textContent = language.eng.projects__docus__description;
    projects__signature__description.textContent = language.eng.projects__signature__description;
    projects__censo__description.textContent = language.eng.projects__censo__description;
    projects__api__description.textContent = language.eng.projects__api__description;
    projects__school__description.textContent = language.eng.projects__school__description;
    contact__description.textContent = language.eng.contact__description;
    contact__title.textContent = language.eng.contact__title;
    contact__subtitle.textContent = language.eng.contact__subtitle;
    contact__label__name.textContent = language.eng.contact__label__name;
    contact__label__message.textContent = language.eng.contact__label__message;
    contact__button.textContent = language.eng.contact__button;
  }
  if (lang === "es") {
    role.textContent = language.es.roleText;
    nav__home.textContent = language.es.nav__home;
    nav__profile.textContent =  language.es.nav__profile;
    nav__projects.textContent =  language.es.nav__projects;
    nav__blog.textContent = language.es.nav__blog;
    nav__contact.textContent =  language.es.nav__contact;
    main__button.textContent = language.es.main__button;
    profile__title.textContent = language.es.profile__title;
    profile__subtitle.textContent = language.es.profile__subtitle;
    profile__description.textContent = language.es.profile__description;
    profile__button.textContent = language.es.profile__button;
    profile__skills.textContent = language.es.profile__skills;
    projects__title.textContent = language.es.projects__title;
    projects__subtitle.textContent = language.es.projects__subtitle;
    projects__sac__description.textContent = language.es.projects__sac__description;
    projects__docus__description.textContent = language.es.projects__docus__description;
    projects__signature__description.textContent = language.es.projects__signature__description;
    projects__censo__description.textContent = language.es.projects__censo__description;
    projects__api__description.textContent = language.es.projects__api__description;
    projects__school__description.textContent = language.es.projects__school__description;
    contact__description.textContent = language.es.contact__description;
    contact__title.textContent = language.es.contact__title;
    contact__subtitle.textContent = language.es.contact__subtitle;
    contact__label__name.textContent = language.es.contact__label__name;
    contact__label__message.textContent = language.es.contact__label__message;
    contact__button.textContent = language.es.contact__button;
  }
  if (lang === "ger") {
    role.textContent = language.ger.roleText;
    nav__home.textContent = language.ger.nav__home;
    nav__profile.textContent =  language.ger.nav__profile;
    nav__projects.textContent =  language.ger.nav__projects;
    nav__blog.textContent = language.ger.nav__blog;
    nav__contact.textContent =  language.ger.nav__contact;
    main__button.textContent = language.ger.main__button;
    profile__title.textContent = language.ger.profile__title;
    profile__subtitle.textContent = language.ger.profile__subtitle;
    profile__description.textContent = language.ger.profile__description;
    profile__button.textContent = language.ger.profile__button;
    profile__skills.textContent = language.ger.profile__skills;
    projects__title.textContent = language.ger.projects__title;
    projects__subtitle.textContent = language.ger.projects__subtitle;
    projects__sac__description.textContent = language.ger.projects__sac__description;
    projects__docus__description.textContent = language.ger.projects__docus__description;
    projects__signature__description.textContent = language.ger.projects__signature__description;
    projects__censo__description.textContent = language.ger.projects__censo__description;
    projects__api__description.textContent = language.ger.projects__api__description;
    projects__school__description.textContent = language.ger.projects__school__description;
    contact__description.textContent = language.ger.contact__description;
    contact__title.textContent = language.ger.contact__title;
    contact__subtitle.textContent = language.ger.contact__subtitle;
    contact__label__name.textContent = language.ger.contact__label__name;
    contact__label__message.textContent = language.ger.contact__label__message;
    contact__button.textContent = language.ger.contact__button;
  }
}
//define language reload onclick illiteration
dataReload.forEach(a => a.addEventListener('click', translate));