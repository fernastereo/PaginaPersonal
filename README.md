# 🌟 Personal Portfolio - Fernando Cueto

*Read this in other languages: [Español](#español)*

## English

### 📖 About This Project

This is my personal portfolio website showcasing my skills, experience, and projects as a software developer. Built with modern web technologies for optimal performance and user experience.

### 🚀 Live Demo

Visit: [fernandocueto.com](https://fernandocueto.com)

### ✨ Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Multi-language Support**: Available in English and Spanish
- **Contact Form**: Functional email contact form powered by EmailJS
- **Smooth Animations**: Beautiful animations using Framer Motion
- **Modern UI Components**: Built with shadcn/ui (powered by Radix UI + Tailwind CSS)
- **Fast Performance**: Optimized bundle with Vite build system
- **Unit Testing**: Comprehensive test suite with Vitest and React Testing Library
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions

### 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | Frontend framework |
| **TypeScript** | 5.8.3 | Type safety and better DX |
| **Vite** | 7.1.2 | Build tool and dev server |
| **Tailwind CSS** | 4.1.12 | Utility-first CSS framework |
| **Framer Motion** | 12.23.12 | Animation library |
| **React i18next** | 15.6.1 | Internationalization |
| **EmailJS** | 4.4.1 | Contact form functionality |
| **Lucide React** | 0.539.0 | Icon library |
| **shadcn/ui** | - | Modern UI components (Radix + Tailwind) |
| **Vitest** | Latest | Unit testing framework |
| **React Testing Library** | Latest | Component testing utilities |

### 📦 Installation & Setup

#### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

#### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/fernastereo/PaginaPersonal.git
   cd paginapersonal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:production` | Build with environment validation |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run format` | Format code with Prettier |

### 📁 Project Structure

```
src/
├── components/
│   ├── sections/          # Main page sections
│   │   ├── data/         # JSON data files
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   ├── Skills.tsx
│   │   └── Testimonials.tsx
│   ├── ui/               # Reusable UI components
│   ├── custom-ui/        # Custom components
│   ├── Footer.tsx
│   ├── NavBar.tsx
│   ├── ThemeToggle.tsx
│   └── LanguageToggle.tsx
├── lib/
│   ├── i18n.ts          # Internationalization config
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Index.tsx        # Main page
│   └── NotFound.tsx     # 404 page
├── test/                # Test files
│   ├── setup.ts         # Test configuration
│   ├── basic.test.ts    # Basic unit tests
│   ├── components/      # Component tests
│   │   └── themeToggle.test.tsx
│   ├── data/            # Data validation tests
│   └── lib/             # Utility function tests
└── assets/              # Images and static files
```

### 📧 Contact Form Setup

The contact form uses EmailJS for sending emails. To set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env` file

### 🧪 Testing

This project includes a comprehensive test suite to ensure code quality and reliability.

#### Test Structure
- **Unit Tests**: Test individual functions and utilities
- **Component Tests**: Test React components in isolation
- **Integration Tests**: Test component interactions and routing
- **Data Validation Tests**: Validate JSON data structure

#### Running Tests
```bash
# Run all tests once
npm run test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage (if configured)
npm run test:coverage
```

#### Test Files
```
src/test/
├── setup.ts              # Test configuration and mocks
├── basic.test.ts          # Basic utility tests
├── App.test.tsx           # App routing logic tests
├── main.test.tsx          # Main application tests
├── components/
│   └── themeToggle.test.tsx  # ThemeToggle component tests
├── data/
│   ├── skills.test.ts     # Skills data validation
│   ├── projects.test.ts   # Projects data validation
│   └── testimonials.test.ts  # Testimonials data validation
└── lib/
    └── utils.test.ts      # Utility functions tests
```

#### Testing Technologies
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM simulation for browser APIs
- **Mocking**: i18n, localStorage, and browser APIs

### 🚀 Deployment

#### Automatic Deployment (Recommended)

This project includes **GitHub Actions** for automatic deployment:

- ✅ **Continuous Integration**: Runs on every push/PR
- 🚀 **Auto-Deploy**: Deploys to production on push to main/master
- 📧 **Email Integration**: Includes EmailJS configuration
- 🔐 **Secure**: Uses GitHub Secrets for credentials

**Setup:**
1. Configure [GitHub Secrets](.github/DEPLOYMENT.md#-secrets-requeridos)
2. Push to main/master branch
3. Automatic deployment via FTP to your hosting

**See:** [Complete CI/CD Setup Guide](.github/DEPLOYMENT.md)

#### Manual Deployment (Static Hosting)

1. **Build the project**
   ```bash
   npm run build:production
   ```

2. **Upload files**
   - Upload contents of `dist/` folder to your hosting
   - Place files in `public_html/` or equivalent

#### For Vercel/Netlify

1. Connect your GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically on push

### 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Español

### 📖 Acerca del Proyecto

Este es mi portafolio personal que muestra mis habilidades, experiencia y proyectos como desarrollador de software. Construido con tecnologías web modernas para un rendimiento óptimo y una excelente experiencia de usuario.

### 🚀 Demo en Vivo

Visita: [fernandocueto.com](https://fernandocueto.com)

### ✨ Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos y tamaños de pantalla
- **Tema Oscuro/Claro**: Alterna entre temas con transiciones suaves
- **Soporte Multi-idioma**: Disponible en inglés y español
- **Formulario de Contacto**: Formulario funcional de email con EmailJS
- **Animaciones Suaves**: Hermosas animaciones usando Framer Motion
- **Componentes UI Modernos**: Construido con shadcn/ui (Radix UI + Tailwind CSS)
- **Rendimiento Rápido**: Bundle optimizado con sistema de build Vite
- **Testing Unitario**: Suite completa de tests con Vitest y React Testing Library
- **Pipeline CI/CD**: Testing automatizado y deployment con GitHub Actions

### 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.1.1 | Framework frontend |
| **TypeScript** | 5.8.3 | Tipado estático y mejor DX |
| **Vite** | 7.1.2 | Herramienta de build y servidor dev |
| **Tailwind CSS** | 4.1.12 | Framework CSS utility-first |
| **Framer Motion** | 12.23.12 | Librería de animaciones |
| **React i18next** | 15.6.1 | Internacionalización |
| **EmailJS** | 4.4.1 | Funcionalidad del formulario |
| **Lucide React** | 0.539.0 | Librería de iconos |
| **shadcn/ui** | - | Componentes UI modernos (Radix + Tailwind) |
| **Vitest** | Latest | Framework de testing unitario |
| **React Testing Library** | Latest | Utilidades para testing de componentes |

### 📦 Instalación y Configuración

#### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

#### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/fernastereo/PaginaPersonal.git
   cd paginapersonal
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   Navegar a `http://localhost:5173`

### 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run build:production` | Build con validación de entorno |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Ejecutar ESLint |
| `npm run test` | Ejecutar tests unitarios |
| `npm run test:watch` | Ejecutar tests en modo watch |
| `npm run format` | Formatear código con Prettier |

### 🚀 Despliegue

#### Despliegue Automático (Recomendado)

Este proyecto incluye **GitHub Actions** para despliegue automático:

- ✅ **Integración Continua**: Se ejecuta en cada push/PR
- 🚀 **Auto-Deploy**: Despliega a producción en push a main/master
- 📧 **Integración Email**: Incluye configuración de EmailJS
- 🔐 **Seguro**: Usa GitHub Secrets para credenciales

**Configuración:**
1. Configurar [GitHub Secrets](.github/DEPLOYMENT.md#-secrets-requeridos)
2. Push a la rama main/master
3. Despliegue automático vía FTP a tu hosting

**Ver:** [Guía Completa de CI/CD](.github/DEPLOYMENT.md)

#### Despliegue Manual (Hosting Estático)

1. **Construir el proyecto**
   ```bash
   npm run build:production
   ```

2. **Subir archivos**
   - Subir contenido de la carpeta `dist/` a tu hosting
   - Colocar archivos en `public_html/` o equivalente

#### Para Vercel/Netlify

1. Conectar tu repositorio de GitHub
2. Agregar variables de entorno en el dashboard
3. Despliegue automático en push

### 📞 Contacto

- **Email**: hey@fernandocueto.com
- **Ubicación**: Berlín, Alemania

### 🧪 Testing (Español)

Este proyecto incluye una suite completa de tests para asegurar la calidad y confiabilidad del código.

#### Ejecutar Tests
```bash
# Ejecutar todos los tests una vez
npm run test

# Ejecutar tests en modo watch (para desarrollo)
npm run test:watch
```

#### Tecnologías de Testing
- **Vitest**: Framework de testing rápido y moderno
- **React Testing Library**: Utilidades para testing de componentes
- **jsdom**: Simulación de DOM para APIs del navegador
- **Mocking**: Simulación de i18n, localStorage y APIs del navegador

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

**Características destacadas:**
- ✅ **Testing Completo**: Unit tests, component tests, e integration tests
- ✅ **CI/CD Automatizado**: GitHub Actions para deployment automático
- ✅ **Código de Calidad**: ESLint + Testing para mantener estándares altos
- ✅ **Documentación Completa**: README bilingüe con guías detalladas