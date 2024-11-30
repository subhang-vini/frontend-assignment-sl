import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import App from '../App' // Use alias for App component

vi.mock('@components/Wrapper', () => ({
  default: () => (
    <div data-testid='wrapperComponent'>Mocked Wrapper Component</div>
  )
}))

describe('App Component', () => {
  it('should render the mocked Wrapper component', () => {
    render(<App />)

    const wrapperElement = screen.getByTestId('wrapperComponent')
    expect(wrapperElement).to.exist
  })
})
