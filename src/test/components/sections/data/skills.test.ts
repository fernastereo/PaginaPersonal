import { describe, it, expect } from 'vitest'

describe('skills data', () => {
  it('should load skill data correctly', async () => {
    const skillData = await import('@/components/sections/data/skills.json')
    expect(skillData.default).toBeDefined()
    expect(skillData.default.length).toBe(3)
    for(let i = 0; i < skillData.default.length; i++) {
      expect(skillData.default[i]).toHaveProperty('title')
      expect(skillData.default[i]).toHaveProperty('skills')
      expect(skillData.default[i].skills.length).toBeGreaterThan(0)
    }
  })
})