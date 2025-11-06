import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock de Firebase Analytics ANTES de que se importe cualquier módulo que lo use
vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({
    app: { name: '[DEFAULT]' },
  })),
  logEvent: vi.fn(),
  isSupported: vi.fn(() => Promise.resolve(false)),
}))

// Mock de IndexedDB para evitar errores de Firebase Analytics
Object.defineProperty(global, 'indexedDB', {
  writable: true,
  value: {
    open: vi.fn(),
    deleteDatabase: vi.fn(),
  },
})

// Mock completo de i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Devuelve la key tal como está
    i18n: {
      changeLanguage: vi.fn(),
      language: 'es',
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}))

// Mock de window.matchMedia para temas
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock de IntersectionObserver para Framer Motion
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock de ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))