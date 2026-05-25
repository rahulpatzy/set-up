import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ErrorBoundary } from '../components/ErrorBoundary'

// Suppress the expected console.error from the ErrorBoundary catching errors
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('test error')
  return <p>Safe content</p>
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Safe content')).toBeInTheDocument()
  })

  it('renders default fallback on error', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('test error')).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<p>Custom error</p>}>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Custom error')).toBeInTheDocument()
  })
})
