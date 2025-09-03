import { describe, it, expect, beforeEach, vi } from 'vitest'
import { auditLogger } from './auditLog'

describe('Audit Logger', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should log an entry correctly', () => {
    const entry = {
      userId: 'user123',
      userName: 'Test User',
      action: 'TEST_ACTION',
      resource: 'Test Resource',
      severity: 'info' as const,
      category: 'system' as const
    }

    const log = auditLogger.log(entry)
    
    expect(log).toMatchObject(entry)
    expect(log.id).toBeDefined()
    expect(log.timestamp).toBeDefined()
  })

  it('should log login successfully', () => {
    const log = auditLogger.logLogin('user123', 'test@example.com', true)
    
    expect(log.action).toBe('LOGIN_SUCCESS')
    expect(log.severity).toBe('info')
    expect(log.category).toBe('auth')
  })

  it('should log failed login', () => {
    const log = auditLogger.logLogin('user123', 'test@example.com', false)
    
    expect(log.action).toBe('LOGIN_FAILED')
    expect(log.severity).toBe('warning')
  })

  it('should filter logs by category', () => {
    auditLogger.log({
      userId: '1',
      userName: 'User1',
      action: 'ACTION1',
      resource: 'Resource1',
      severity: 'info',
      category: 'auth'
    })

    auditLogger.log({
      userId: '2',
      userName: 'User2',
      action: 'ACTION2',
      resource: 'Resource2',
      severity: 'info',
      category: 'data'
    })

    const authLogs = auditLogger.getLogs({ category: 'auth' })
    const dataLogs = auditLogger.getLogs({ category: 'data' })

    expect(authLogs.length).toBeGreaterThan(0)
    expect(dataLogs.length).toBeGreaterThan(0)
    expect(authLogs.every(log => log.category === 'auth')).toBe(true)
    expect(dataLogs.every(log => log.category === 'data')).toBe(true)
  })

  it('should export logs as JSON', () => {
    auditLogger.log({
      userId: 'test',
      userName: 'Test',
      action: 'TEST',
      resource: 'Test',
      severity: 'info',
      category: 'system'
    })

    const json = auditLogger.exportLogs('json')
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it('should export logs as CSV', () => {
    auditLogger.log({
      userId: 'test',
      userName: 'Test User',
      action: 'TEST_ACTION',
      resource: 'Test Resource',
      severity: 'info',
      category: 'system'
    })

    const csv = auditLogger.exportLogs('csv')
    expect(csv).toContain('Timestamp')
    expect(csv).toContain('Test User')
    expect(csv).toContain('TEST_ACTION')
  })
})