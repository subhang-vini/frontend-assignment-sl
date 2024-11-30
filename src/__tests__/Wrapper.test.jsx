import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, beforeEach, describe, it, expect } from 'vitest'
import Wrapper from '@components/Wrapper'
import usePaginatedDataFetch from '@hooks/usePaginatedDataFetch'

// Mock the usePaginatedDataFetch hook
vi.mock('@hooks/usePaginatedDataFetch', () => ({
  __esModule: true,
  default: vi.fn()
}))

describe('Wrapper Component', () => {
  const mockData = [
    { 's.no': 1, 'percentage.funded': '50%', 'amt.pledged': '1000' },
    { 's.no': 2, 'percentage.funded': '60%', 'amt.pledged': '1200' }
  ]

  const mockFetchData = vi.fn()
  const mockUpdatePage = vi.fn()

  beforeEach(() => {
    // Set up the mock implementation of the hook
    usePaginatedDataFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      page: 1,
      isLastPage: false,
      fetchData: mockFetchData,
      updatePage: mockUpdatePage
    })
  })

  it('should render the loading state initially', () => {
    // Mock the hook to simulate a loading state
    usePaginatedDataFetch.mockReturnValueOnce({
      data: [],
      loading: true,
      error: null,
      page: 1,
      isLastPage: false,
      fetchData: mockFetchData,
      updatePage: mockUpdatePage
    })

    const { unmount } = render(<Wrapper />)

    expect(screen.getByText(/Loading.../)).to.exist
    unmount()
  })

  it('should render the table with data', () => {
    const { unmount } = render(<Wrapper />)

    // Ensure that the data is rendered in the table
    expect(screen.getByText('Projects Data')).to.exist
    expect(screen.getByText('50%')).to.exist
    expect(screen.getByText('1000')).to.exist
    expect(screen.getByText('60%')).to.exist
    expect(screen.getByText('1200')).to.exist
    unmount()
  })

  it('should display an error message if an error occurs', () => {
    // Mock the hook to simulate an error state
    usePaginatedDataFetch.mockReturnValueOnce({
      data: [],
      loading: false,
      error: 'Failed to fetch data',
      page: 1,
      isLastPage: false,
      fetchData: mockFetchData,
      updatePage: mockUpdatePage
    })

    const { unmount } = render(<Wrapper />)

    expect(screen.getByText('Failed to fetch data')).to.exist
    unmount()
  })

  it('should update page when the Next button is clicked', async () => {
    const { unmount } = render(<Wrapper />)

    // Get the Next button and simulate a click
    const nextButton = screen.getByLabelText('Next page')
    fireEvent.click(nextButton)

    // Ensure that the updatePage function was called
    await waitFor(() => expect(mockUpdatePage).toHaveBeenCalledWith(2))
    unmount()
  })

  it('should disable the Next button when it is the last page', async () => {
    // Mock the hook with isLastPage set to true
    usePaginatedDataFetch.mockReturnValueOnce({
      data: mockData,
      loading: false,
      error: null,
      page: 1,
      isLastPage: true,
      fetchData: mockFetchData,
      updatePage: mockUpdatePage
    })

    const { unmount } = render(<Wrapper />)

    const nextButton = screen.getByLabelText('Next page')

    // Ensure that the Next button is disabled
    expect(nextButton.classList).toContain('disabled')
    unmount()
  })
})
