import { describe, it, expect } from 'vitest'
import { frailScore } from './frail'

describe('FRAIL Score Calculator', () => {
  it('should calculate score correctly for no frailty', () => {
    const values = [0, 0, 0, 0, 0]
    expect(frailScore(values)).toBe(0)
  })

  it('should calculate score correctly for pre-frail', () => {
    const values = [1, 1, 0, 0, 0]
    expect(frailScore(values)).toBe(2)
  })

  it('should calculate score correctly for frail', () => {
    const values = [1, 1, 1, 1, 1]
    expect(frailScore(values)).toBe(5)
  })

  it('should handle empty array', () => {
    expect(frailScore([])).toBe(0)
  })

  it('should handle negative values', () => {
    const values = [-1, 1, 1, 0, 0]
    expect(frailScore(values)).toBe(1)
  })
})