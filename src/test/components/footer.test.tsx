import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Footer } from '@/components/Footer'

// Mock de react-i18next
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'footer.passionate': 'Full Stack Developer passionate about creating innovative solutions.',
    'footer.scrollTop': 'Scroll to top',
    'footer.madeWith': 'Made with',
    'footer.madeBy': 'by'
  }
  return translations[key] || key
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}))

// Mock de window.scrollTo
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

// Mock de los assets (imágenes)
vi.mock('@/assets/linkedin-icon.svg', () => ({
  default: '/mock-linkedin-icon.svg'
}))

vi.mock('@/assets/github-icon.svg', () => ({
  default: '/mock-github-icon.svg'
}))

vi.mock('@/assets/upwork.png', () => ({
  default: '/mock-upwork.png'
}))

// Mock del componente SocialLink
vi.mock('@/components/custom-ui/SocialLink', () => ({
  SocialLink: ({ icon, href, label }: { icon: string; href: string; label: string }) => (
    <a href={href} data-testid={`social-link-${label.toLowerCase()}`} aria-label={label}>
      <img src={icon} alt={label} />
    </a>
  )
}))

describe('Footer component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly with all main sections', () => {
    render(<Footer />)

    // Verificar que el footer está presente
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('bg-card', 'border-t', 'border-border')
  })

  it('should display the name and description', () => {
    render(<Footer />)

    // Verificar el nombre
    expect(screen.getByText('Fernando Cueto')).toBeInTheDocument()
    
    // Verificar la descripción (usando el mock de traducción)
    expect(screen.getByText('Full Stack Developer passionate about creating innovative solutions.')).toBeInTheDocument()
  })

  it('should render all social links correctly', () => {
    render(<Footer />)

    // Verificar que los enlaces sociales están presentes
    expect(screen.getByTestId('social-link-linkedin')).toBeInTheDocument()
    expect(screen.getByTestId('social-link-github')).toBeInTheDocument()
    expect(screen.getByTestId('social-link-upwork')).toBeInTheDocument()

    // Verificar los href de los enlaces
    expect(screen.getByTestId('social-link-linkedin')).toHaveAttribute('href', 'https://www.linkedin.com/in/fernando-cueto/')
    expect(screen.getByTestId('social-link-github')).toHaveAttribute('href', 'https://www.github.com/fernastereo')
    expect(screen.getByTestId('social-link-upwork')).toHaveAttribute('href', 'https://www.upwork.com/freelancers/~017634675ca5b18ef3')
  })

  it('should render scroll to top button and handle click', () => {
    render(<Footer />)

    const scrollButton = screen.getByRole('button', { name: /scroll to top/i })
    expect(scrollButton).toBeInTheDocument()

    // Verificar que el botón tiene las clases correctas
    expect(scrollButton).toHaveClass('text-sm', 'text-muted-foreground', 'hover:text-primary', 'transition-colors')

    // Simular click en el botón
    fireEvent.click(scrollButton)

    // Verificar que se llamó window.scrollTo
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    expect(mockScrollTo).toHaveBeenCalledTimes(1)
  })

  it('should display copyright information with heart icon', () => {
    render(<Footer />)

    // Verificar el texto del copyright
    expect(screen.getByText('© 2025', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Made with', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('by Fernando Cueto', { exact: false })).toBeInTheDocument()

    // Verificar que el icono de corazón está presente
    const heartIcon = screen.getByRole('contentinfo').querySelector('svg')
    expect(heartIcon).toBeInTheDocument()
    expect(heartIcon).toHaveClass('h-4', 'w-4', 'mx-1', 'text-red-500')
  })

  it('should call translation function with correct keys', () => {
    render(<Footer />)

    // Verificar que se llamaron las funciones de traducción correctas
    expect(mockT).toHaveBeenCalledWith('footer.passionate')
    expect(mockT).toHaveBeenCalledWith('footer.scrollTop')
    expect(mockT).toHaveBeenCalledWith('footer.madeWith')
    expect(mockT).toHaveBeenCalledWith('footer.madeBy')
  })

  it('should have correct layout structure', () => {
    render(<Footer />)

    // Verificar la estructura del grid
    const gridContainer = screen.getByRole('contentinfo').querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveClass('md:grid-cols-3', 'gap-8', 'items-center')

    // Verificar que tiene la clase container-custom
    const container = screen.getByRole('contentinfo').querySelector('.container-custom')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('px-4', 'py-12')
  })

  it('should have proper accessibility attributes', () => {
    render(<Footer />)

    // Verificar que el footer tiene el rol correcto
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()

    // Verificar que el botón de scroll tiene texto descriptivo
    const scrollButton = screen.getByRole('button')
    expect(scrollButton).toHaveAccessibleName()
  })

  it('should render the name with gradient class', () => {
    render(<Footer />)

    const nameElement = screen.getByText('Fernando Cueto')
    expect(nameElement).toHaveClass('text-xl', 'font-bold', 'text-gradient', 'mb-2')
  })
})