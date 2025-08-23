import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageToggle } from '@/components/LanguageToggle'

// Mock personalizado para react-i18next específico para este test
const mockChangeLanguage = vi.fn()
const mockI18n = {
  language: 'es',
  changeLanguage: mockChangeLanguage,
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: mockI18n,
  }),
}))

describe('LanguageToggle component', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    vi.clearAllMocks()
    // Resetear el idioma por defecto
    mockI18n.language = 'es'
  })

  it('should render correctly with default language', () => {
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('hover:bg-secondary-foreground', 'transition-colors')
  })

  it('should display the current language in uppercase', () => {
    render(<LanguageToggle />)
    
    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('should display English when language is set to en', () => {
    mockI18n.language = 'en'
    
    render(<LanguageToggle />)
    
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('should render Languages icon', () => {
    render(<LanguageToggle />)
    
    // Verificar que el SVG del icono está presente
    const icon = screen.getByRole('button').querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-4', 'w-4', 'mr-2')
  })

  it('should call changeLanguage when clicked from Spanish to English', () => {
    mockI18n.language = 'es'
    
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockChangeLanguage).toHaveBeenCalledWith('en')
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1)
  })

  it('should call changeLanguage when clicked from English to Spanish', () => {
    mockI18n.language = 'en'
    
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockChangeLanguage).toHaveBeenCalledWith('es')
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1)
  })

  it('should have correct button properties', () => {
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    
    // Verificar que es un botón
    expect(button.tagName).toBe('BUTTON')
    
    // Verificar clases específicas del componente Button
    expect(button).toHaveClass('hover:bg-secondary-foreground')
    expect(button).toHaveClass('transition-colors')
  })

  it('should toggle language multiple times correctly', () => {
    mockI18n.language = 'es'
    
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    
    // Primer click: es -> en
    fireEvent.click(button)
    expect(mockChangeLanguage).toHaveBeenNthCalledWith(1, 'en')
    
    // Simular cambio de idioma en el mock
    mockI18n.language = 'en'
    
    // Segundo click: en -> es
    fireEvent.click(button)
    expect(mockChangeLanguage).toHaveBeenNthCalledWith(2, 'es')
    
    expect(mockChangeLanguage).toHaveBeenCalledTimes(2)
  })

  it('should handle accessibility', () => {
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    
    // Verificar que el botón es accesible
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('disabled')
  })

  it('should have correct icon classes', () => {
    render(<LanguageToggle />)
    
    const button = screen.getByRole('button')
    const icon = button.querySelector('svg')
    
    expect(icon).toHaveClass('h-4')
    expect(icon).toHaveClass('w-4')
    expect(icon).toHaveClass('mr-2')
  })
})
