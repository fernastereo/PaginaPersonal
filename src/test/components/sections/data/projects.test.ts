import { describe, it, expect } from 'vitest'

describe ('projects data', () =>{
  it('should load projects data correctly', async () => {
    const projectsData = await import('@/components/sections/data/projects.json')

    expect(projectsData.default).toBeDefined()
    expect(projectsData.default.length).toBeGreaterThanOrEqual(2)
    for(let i = 0; i < projectsData.default.length; i++) {
      const project = projectsData.default[i]

      expect(project).toHaveProperty('titleKey')
      expect(project).toHaveProperty('descriptionKey')
      expect(project).toHaveProperty('image')
      expect(project).toHaveProperty('technologies')
      expect(project.technologies.length).toBeGreaterThan(0)
      expect(project).toHaveProperty('liveUrl')
      expect(project).toHaveProperty('githubUrl')
    }

  })
})
