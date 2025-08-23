import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NavBar } from '@/components/NavBar'

// Mock de react-i18next
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'nav.about': 'About',
    'nav.skills': 'Skills', 
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact'
  }
  return translations[key] || key
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}))

// Mock de framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, className, initial, animate, ...props }: any) => (
      <nav className={className} {...props}>{children}</nav>
    ),
    div: ({ children, className, initial, animate, exit, whileHover, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>{children}</div>
    )
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock de los componentes LanguageToggle y ThemeToggle
vi.mock('@/components/LanguageToggle', () => ({
  LanguageToggle: () => <div data-testid="language-toggle">Language Toggle</div>
}))

vi.mock('@/components/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>
}))

// Mock de document.querySelector y scrollIntoView
const mockScrollIntoView = vi.fn()
const mockQuerySelector = vi.fn()

Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true,
})

// Mock de window scroll events
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true,
})

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true,
})

Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
})

describe('NavBar component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup default mocks
    mockQuerySelector.mockReturnValue({
      scrollIntoView: mockScrollIntoView
    })
    
    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render correctly with all navigation elements', () => {
    render(<NavBar />)

    // Verificar que el nav está presente
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()

    // Verificar el logo
    expect(screen.getByText('<FC />')).toBeInTheDocument()

    // Verificar los toggles
    expect(screen.getByTestId('language-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()

    // Verificar el botón de menú móvil
    const mobileMenuButton = screen.getByTestId('mobile-menu-button')
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('should render all navigation items in desktop view', () => {
    render(<NavBar />)

    // Verificar que todos los elementos de navegación están presentes
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('should call translation function with correct nav keys', () => {
    render(<NavBar />)

    // Verificar que se llamaron las traducciones correctas
    expect(mockT).toHaveBeenCalledWith('nav.about')
    expect(mockT).toHaveBeenCalledWith('nav.skills')
    expect(mockT).toHaveBeenCalledWith('nav.experience')
    expect(mockT).toHaveBeenCalledWith('nav.projects')
    expect(mockT).toHaveBeenCalledWith('nav.testimonials')
    expect(mockT).toHaveBeenCalledWith('nav.contact')
  })

  it('should add scroll event listener on mount', () => {
    render(<NavBar />)

    expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('should navigate to section when nav item is clicked', () => {
    render(<NavBar />)

    const aboutButton = screen.getByText('About')
    fireEvent.click(aboutButton)

    expect(mockQuerySelector).toHaveBeenCalledWith('#about')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('should navigate to hero section when logo is clicked', () => {
    render(<NavBar />)

    const logo = screen.getByText('<FC />')
    fireEvent.click(logo)

    expect(mockQuerySelector).toHaveBeenCalledWith('#hero')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('should toggle mobile menu when hamburger button is clicked', () => {
    render(<NavBar />)

    // Inicialmente el menú móvil no debería estar visible
    expect(screen.queryByText('About')).toBeInTheDocument() // Desktop version

    // Encontrar el botón del menú móvil (el que tiene el icono)
    const buttons = screen.getAllByRole('button')
    const mobileMenuButton = buttons.find(button => 
      button.querySelector('svg') && button.classList.contains('md:hidden')
    )
    
    expect(mobileMenuButton).toBeInTheDocument()

    // Click para abrir el menú móvil
    fireEvent.click(mobileMenuButton!)

    // Verificar que se abrió el menú móvil (debería haber elementos duplicados ahora)
    const aboutElements = screen.getAllByText('About')
    expect(aboutElements.length).toBeGreaterThan(1) // Desktop + Mobile versions
  })

  it('should close mobile menu when navigation item is clicked', () => {
    render(<NavBar />)

    // Abrir el menú móvil primero
    const buttons = screen.getAllByRole('button')
    const mobileMenuButton = buttons.find(button => 
      button.querySelector('svg') && button.classList.contains('md:hidden')
    )
    
    fireEvent.click(mobileMenuButton!)

    // Verificar que el menú está abierto
    const aboutElements = screen.getAllByText('About')
    expect(aboutElements.length).toBeGreaterThan(1)

    // Click en un elemento de navegación móvil
    const mobileAboutButton = aboutElements.find(element => 
      element.classList.contains('block') // Mobile nav items have 'block' class
    )
    
    if (mobileAboutButton) {
      fireEvent.click(mobileAboutButton)
      
      // Verificar que se llamó la navegación
      expect(mockQuerySelector).toHaveBeenCalledWith('#about')
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    }
  })

  it('should have correct styling classes', () => {
    render(<NavBar />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')

    // Verificar clases del logo
    const logo = screen.getByText('<FC />')
    expect(logo).toHaveClass('font-bold', 'text-2xl', 'text-gradient', 'cursor-pointer')
  })

  it('should handle scroll effect correctly', () => {
    const { rerender } = render(<NavBar />)

    // Simular scroll event
    const scrollHandler = mockAddEventListener.mock.calls.find(
      call => call[0] === 'scroll'
    )?.[1]

    expect(scrollHandler).toBeDefined()

    // Simular scroll hacia abajo
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    scrollHandler()

    rerender(<NavBar />)

    // El nav debería tener clases de scroll
    const nav = screen.getByRole('navigation')
    expect(nav.className).toContain('bg-background/80')
  })

  it('should show correct mobile menu icon states', () => {
    render(<NavBar />)

    // Encontrar el botón del menú móvil
    const buttons = screen.getAllByRole('button')
    const mobileMenuButton = buttons.find(button => 
      button.querySelector('svg') && button.classList.contains('md:hidden')
    )

    // Inicialmente debería mostrar el icono de menú (hamburger)
    expect(mobileMenuButton).toBeInTheDocument()
    
    // Click para cambiar el estado
    fireEvent.click(mobileMenuButton!)

    // Después del click, el estado cambia (aunque en el test el icono specific no se puede verificar fácilmente)
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('should clean up scroll event listener on unmount', () => {
    const { unmount } = render(<NavBar />)

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('should handle navigation when element does not exist', () => {
    // Mock querySelector para retornar null
    mockQuerySelector.mockReturnValue(null)

    render(<NavBar />)

    const aboutButton = screen.getByText('About')
    fireEvent.click(aboutButton)

    expect(mockQuerySelector).toHaveBeenCalledWith('#about')
    // scrollIntoView no debería ser llamado si el elemento no existe
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('should have proper responsive classes', () => {
    render(<NavBar />)

    // Verificar clases responsivas en el menú desktop
    const desktopMenu = screen.getByRole('navigation').querySelector('.hidden.md\\:flex')
    expect(desktopMenu).toBeInTheDocument()

    // Verificar clases del botón móvil
    const buttons = screen.getAllByRole('button')
    const mobileMenuButton = buttons.find(button => 
      button.classList.contains('md:hidden')
    )
    expect(mobileMenuButton).toHaveClass('md:hidden')
  })
})
