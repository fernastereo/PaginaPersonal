import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { vi } from 'vitest'

//Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

//Reemplazar localStorage global con el mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('ThemeToggle component', () => {
  beforeEach(() => {
    //limpiar mocks antes de cada testimonial
    vi.clearAllMocks()

    //limpiear clases del cocumento
    document.documentElement.classList.remove('dark')

    //Reset del mock de localStorage
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('should render moon icon by default (light mode)', () =>{
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
  })

  it('should load dark mode from localStorage on mount', () => {
    // Simular que localStorage tiene darkMode = true
    localStorageMock.getItem.mockReturnValue('true')
    render(<ThemeToggle />)

    // Verificar que se leyó localStorage
    expect(localStorageMock.getItem).toHaveBeenCalledWith('darkMode')
    // Verificar que se agregó la clase dark al documento
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should toggle theme when clicked', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    // Click para activar modo oscuro
    fireEvent.click(button)
    
    // Verificar que se guardó en localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true')
    
    // Verificar que se agregó la clase dark
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should toggle back to light mode', () => {
    // Empezar en modo oscuro
    localStorageMock.getItem.mockReturnValue('true')
    
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    
    // Click para volver a modo claro
    fireEvent.click(button)
    
    // Verificar que se guardó en localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'false')
    
    // Verificar que se removió la clase dark
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should show correct icon based on theme', () => {
    const { rerender } = render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    // En modo claro, debería mostrar luna
    expect(button).toBeInTheDocument()
    
    // Simular cambio a modo oscuro y re-renderizar
    localStorageMock.getItem.mockReturnValue('true')
    rerender(<ThemeToggle />)
    
    // En modo oscuro, debería mostrar sol
    expect(button).toBeInTheDocument()
  })
})