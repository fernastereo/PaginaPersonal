import { describe, it, expect } from 'vitest'

describe('Basic test', () => {
  it('should perform basic operations', () => {
    expect(1 + 1).toBe(2)
    expect('hello'.toUpperCase()).toBe('HELLO')
  })
  it('should test array operations', () => {
    const items = ['React', 'TypeScript', 'Vite']
    expect(items).toHaveLength(3)
    expect(items).toContain('React')
  })

  it('should test object properties', () => {
    const user = { name: 'Fernando', location: 'Berlin' }
    expect(user).toHaveProperty('name')
    expect(user.name).toBe('Fernando')
  })
})