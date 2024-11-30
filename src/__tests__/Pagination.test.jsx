import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import Pagination from '@components/Pagination'

describe('Pagination Component', () => {
  // Mock the updatePage function
  const mockUpdatePage = vi.fn()

  // Test 1: When page is 1, Previous button should be disabled
  it('should disable the Previous button when page is 1', () => {
    const { unmount } = render(
      <Pagination updatePage={mockUpdatePage} page={1} isLastPage={false} />
    )

    const previousButton = screen.getByLabelText('Previous page')
    expect(previousButton.classList).toContain('disabled')
    unmount()
  })

  // Test 2: When isLastPage is true, Next button should be disabled
  it('should disable the Next button when isLastPage is true', () => {
    const { unmount } = render(
      <Pagination updatePage={mockUpdatePage} page={1} isLastPage={true} />
    )

    const nextButton = screen.getByLabelText('Next page')
    expect(nextButton.classList).toContain('disabled')
    unmount()
  })

  // Test 3: Current page should be displayed correctly
  it('should display the current page number', () => {
    const { unmount } = render(
      <Pagination updatePage={mockUpdatePage} page={3} isLastPage={false} />
    )

    const pageStatus = screen.getByText(/Current Page : 3/)
    expect(pageStatus).to.exist
    unmount()
  })

  // Test 4: Clicking the Previous button should call updatePage with page - 1
  it('should call updatePage with page - 1 when Previous button is clicked', () => {
    const { unmount } = render(
      <Pagination updatePage={mockUpdatePage} page={2} isLastPage={false} />
    )

    const previousButton = screen.getByLabelText('Previous page')
    fireEvent.click(previousButton)

    expect(mockUpdatePage).toHaveBeenCalledWith(1)
    unmount()
  })

  // Test 5: Clicking the Next button should call updatePage with page + 1
  it('should call updatePage with page + 1 when Next button is clicked', () => {
    const { unmount } = render(
      <Pagination updatePage={mockUpdatePage} page={1} isLastPage={false} />
    )

    const nextButton = screen.getByLabelText('Next page')
    fireEvent.click(nextButton)

    expect(mockUpdatePage).toHaveBeenCalledWith(2)
    unmount()
  })
})
