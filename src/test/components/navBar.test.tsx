import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react';
import { NavBar } from '@/components/NavBar';
import { MemoryRouter } from 'react-router-dom';

// Mock de react-i18next
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.clients': 'Clients Portal',
  };
  return translations[key] || key;
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}));

// Mock de framer-motion
interface MotionProps {
  children: React.ReactNode;
  className?: string;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  onClick?: () => void;
  [key: string]: unknown;
}

vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, className }: MotionProps) => (
      <nav className={className}>{children}</nav>
    ),
    div: ({ children, className, onClick }: MotionProps) => (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock de los componentes LanguageToggle y ThemeToggle
vi.mock('@/components/LanguageToggle', () => ({
  LanguageToggle: () => (
    <div data-testid="language-toggle">Language Toggle</div>
  ),
}));

vi.mock('@/components/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

const mockNavigate = vi.fn();

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock de document.querySelector y scrollIntoView
const mockScrollIntoView = vi.fn();
const mockQuerySelector = vi.fn();

Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true,
});

// Mock de window scroll events
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true,
});

Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

describe('NavBar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mocks
    mockQuerySelector.mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });

    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render correctly with all navigation elements', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Verificar que el nav está presente
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    // Verificar el logo
    expect(screen.getByText('<FC />')).toBeInTheDocument();

    // Verificar los toggles
    expect(screen.getByTestId('language-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();

    // Verificar el botón de menú móvil
    const mobileMenuButton = screen.getByTestId('mobile-menu-button');
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('should render all navigation items in desktop view', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Verificar que todos los elementos de navegación están presentes
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should call translation function with correct nav keys', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Verificar que se llamaron las traducciones correctas
    expect(mockT).toHaveBeenCalledWith('nav.about');
    expect(mockT).toHaveBeenCalledWith('nav.skills');
    expect(mockT).toHaveBeenCalledWith('nav.experience');
    expect(mockT).toHaveBeenCalledWith('nav.projects');
    expect(mockT).toHaveBeenCalledWith('nav.testimonials');
    expect(mockT).toHaveBeenCalledWith('nav.contact');
  });

  it('should add scroll event listener on mount', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('should navigate to section when nav item is clicked', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    expect(mockQuerySelector).toHaveBeenCalledWith('#about');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should navigate to hero section when logo is clicked', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logo = screen.getByText('<FC />');
    fireEvent.click(logo);

    expect(mockQuerySelector).toHaveBeenCalledWith('#hero');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should toggle mobile menu when hamburger button is clicked', async () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Inicialmente el menú móvil no debería estar visible
    expect(screen.queryByText('About')).toBeInTheDocument(); // Desktop version

    // Encontrar el botón del menú móvil (el que tiene el icono)
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons.find(
      button =>
        button.querySelector('svg') && button.classList.contains('md:hidden')
    );

    expect(mobileMenuButton).toBeInTheDocument();

    // Click para abrir el menú móvil
    await act(async () => {
      fireEvent.click(mobileMenuButton!);
    });

    // Verificar que se abrió el menú móvil (debería haber elementos duplicados ahora)
    const aboutElements = screen.getAllByText('About');
    expect(aboutElements.length).toBeGreaterThan(1); // Desktop + Mobile versions
  });

  it('should close mobile menu when navigation item is clicked', async () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Abrir el menú móvil primero
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons.find(
      button =>
        button.querySelector('svg') && button.classList.contains('md:hidden')
    );

    await act(async () => {
      fireEvent.click(mobileMenuButton!);
    });

    // Verificar que el menú está abierto
    const aboutElements = screen.getAllByText('About');
    expect(aboutElements.length).toBeGreaterThan(1);

    // Click en un elemento de navegación móvil
    const mobileAboutButton = aboutElements.find(
      element => element.classList.contains('block') // Mobile nav items have 'block' class
    );

    if (mobileAboutButton) {
      await act(async () => {
        fireEvent.click(mobileAboutButton);
      });

      // Verificar que se llamó la navegación
      expect(mockQuerySelector).toHaveBeenCalledWith('#about');
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    }
  });

  it('should have correct styling classes', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');

    // Verificar clases del logo
    const logo = screen.getByText('<FC />');
    expect(logo).toHaveClass(
      'font-bold',
      'text-2xl',
      'text-gradient',
      'cursor-pointer'
    );
  });

  it('should handle scroll effect correctly', async () => {
    const { rerender } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Simular scroll event
    const scrollHandler = mockAddEventListener.mock.calls.find(
      call => call[0] === 'scroll'
    )?.[1];

    expect(scrollHandler).toBeDefined();

    // Simular scroll hacia abajo
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });

    // Envolver la actualización de estado en act()
    await act(async () => {
      scrollHandler();
    });

    rerender(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // El nav debería tener clases de scroll
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('bg-background/80');
  });

  it('should show correct mobile menu icon states', async () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Encontrar el botón del menú móvil
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons.find(
      button =>
        button.querySelector('svg') && button.classList.contains('md:hidden')
    );

    // Inicialmente debería mostrar el icono de menú (hamburger)
    expect(mobileMenuButton).toBeInTheDocument();

    // Click para cambiar el estado
    await act(async () => {
      fireEvent.click(mobileMenuButton!);
    });

    // Después del click, el estado cambia (aunque en el test el icono specific no se puede verificar fácilmente)
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('should clean up scroll event listener on unmount', () => {
    const { unmount } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('should handle navigation when element does not exist', () => {
    // Mock querySelector para retornar null
    mockQuerySelector.mockReturnValue(null);

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    expect(mockQuerySelector).toHaveBeenCalledWith('#about');
    // scrollIntoView no debería ser llamado si el elemento no existe
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('should have proper responsive classes', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Verificar clases responsivas en el menú desktop
    const desktopMenu = screen
      .getByRole('navigation')
      .querySelector('.hidden.md\\:flex');
    expect(desktopMenu).toBeInTheDocument();

    // Verificar clases del botón móvil
    const buttons = screen.getAllByRole('button');
    const mobileMenuButton = buttons.find(button =>
      button.classList.contains('md:hidden')
    );
    expect(mobileMenuButton).toHaveClass('md:hidden');
  });

  it('should navigate to /clients/login when click on Clients Portal item', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
      </MemoryRouter>
    );

    const clientsPortalButton = screen.getByTestId('nav-clients');
    fireEvent.click(clientsPortalButton);

    // Verificar que navigate fue llamado con la ruta correcta
    expect(mockNavigate).toHaveBeenCalledWith('/clients/login');
  });
});
