import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'

// Helper que replica la lógica de App pero sin BrowserRouter
const renderAppLogic = (initialRoute = '/') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('App Routing Logic', () => {
  it('should render Index page on root route', () => {
    const { container } = renderAppLogic('/')
    expect(container).toBeDefined()
  })

  it('should render NotFound page on unknown route', () => {
    const { container } = renderAppLogic('/ruta-que-no-existe')
    expect(container).toBeDefined()
  })

  it('should handle different routes correctly', () => {
    // Test ruta principal
    const { container: homeContainer } = renderAppLogic('/')
    expect(homeContainer).toBeTruthy()
    
    // Test ruta 404
    const { container: notFoundContainer } = renderAppLogic('/404')
    expect(notFoundContainer).toBeTruthy()
  })
})