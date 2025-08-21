import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('utils functions', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-sm', 'text-red-500')
      expect(result).toBe('text-sm text-red-500')
      expect(result).toContain('text-sm')
      expect(result).toContain('text-red-500')
    })

    it('should handle undefined and null values', () => {
      const result = cn('text-sm', undefined, 'text-red-500', null)
      expect(result).toContain('text-sm')
      expect(result).toContain('text-red-500')
      expect(result).not.toContain('undefined')
      expect(result).not.toContain('null')
    })

    it('should handle empty strings', () => {
      const result = cn('text-sm', '', 'text-red-500')
      expect(result).toContain('text-sm')
      expect(result).toContain('text-red-500')
      expect(result).toBe('text-sm text-red-500')
    })

    it('dhould handle conditional classes', () => {
      const isActive = true
      const result = cn(
        'text-sm',
        isActive && 'text-red-500',
        !isActive && 'text-blue-500'
      )
      expect(result).toContain('text-sm')
      expect(result).toContain('text-red-500')
      expect(result).not.toContain('text-blue-500')
    })
  })
})