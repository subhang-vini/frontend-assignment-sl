import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Table from '@components/Table'

describe('Table Component', () => {
  // Test case 1: When the component is loading
  it('should display loading message when loading is true', () => {
    render(<Table loading={true} data={[]} />)

    // Check if the "Loading..." message is displayed
    const loadingMessage = screen.getByText(/Loading.../)
    expect(loadingMessage).to.exist
  })

  // Test case 2: When the component is not loading and has data
  it('should render table with data when loading is false', () => {
    const mockData = [
      { 's.no': 1, 'percentage.funded': '50%', 'amt.pledged': '1000' },
      { 's.no': 2, 'percentage.funded': '30%', 'amt.pledged': '500' }
    ]

    render(<Table loading={false} data={mockData} />)

    // Check if the table rows are rendered with the correct data
    const row1 = screen.getByText('1') // S.No. for the first row
    const row2 = screen.getByText('50%') // Percentage Funded for the first row
    const row3 = screen.getByText('1000') // Amount Pledged for the first row

    const row4 = screen.getByText('2') // S.No. for the second row
    const row5 = screen.getByText('30%') // Percentage Funded for the second row
    const row6 = screen.getByText('500') // Amount Pledged for the second row

    // Assert the content of the table is correct
    expect(row1).to.exist
    expect(row2).to.exist
    expect(row3).to.exist
    expect(row4).to.exist
    expect(row5).to.exist
    expect(row6).to.exist
  })
})
