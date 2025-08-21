import { describe, it, expect } from 'vitest'

describe('testimonials data', () => {
  it('should load testimonials data correctly', async () => {
    const testimonialsData = await import('@/components/sections/data/testimonials.json')

    expect(testimonialsData.default).toBeDefined()
    expect(testimonialsData.default.length).toBeGreaterThanOrEqual(1)
    for(let i = 0; i < testimonialsData.default.length; i++) {
      const testimonial = testimonialsData.default[i]

      expect(testimonial).toHaveProperty('name')
      expect(testimonial).toHaveProperty('position')
      expect(testimonial).toHaveProperty('avatar')
      expect(testimonial).toHaveProperty('rating')
      expect(testimonial).toHaveProperty('text')
      expect(testimonial).toHaveProperty('link')
    }
  })
})