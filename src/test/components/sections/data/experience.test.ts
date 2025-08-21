import { describe, it, expect } from 'vitest'

describe('experience data', () => {
  it('should load experience data correctly', async () => {
    const experienceData = await import('@/components/sections/data/experience.json')

    expect(experienceData.default).toBeDefined()
    expect(experienceData.default.length).toBeGreaterThanOrEqual(1)
    for(let i = 0; i < experienceData.default.length; i++) {
      const experience = experienceData.default[i]

      expect(experience).toHaveProperty('position')
      expect(experience).toHaveProperty('company')
      expect(experience).toHaveProperty('location')
      expect(experience).toHaveProperty('period')
      expect(experience).toHaveProperty('description')
      expect(experience).toHaveProperty('technologies')
      expect(experience.technologies.length).toBeGreaterThan(0)
    }
  })
})