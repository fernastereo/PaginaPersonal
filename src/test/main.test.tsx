import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'

// Helper para crear un wrapper con todos los providers
const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Application Pages', () => {
  it('should render Index page without crashing', () => {
    const TestWrapper = createTestWrapper()
    
    const { container } = render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    )
    
    expect(container).toBeDefined()
  })

  it('should render NotFound page without crashing', () => {
    const TestWrapper = createTestWrapper()
    
    const { container } = render(
      <TestWrapper>
        <NotFound />
      </TestWrapper>
    )
    
    expect(container).toBeDefined()
  })

  it('should render pages without errors', () => {
    const TestWrapper = createTestWrapper()
    
    expect(() => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      )
    }).not.toThrow()
  })
})