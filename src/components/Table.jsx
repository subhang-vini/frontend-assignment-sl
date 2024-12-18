import '../styles/Table.css'

const Table = ({ data, loading }) => {
  if (loading) {
    return <div aria-live='polite'>Loading...</div>
  }
  return (
    <table className='project-table' aria-describedby='table-description'>
      <caption id='table-description'>Project Funding Details</caption>
      <thead>
        <tr>
          <th scope='col'>S.No.</th>
          <th scope='col'>Percentage Funded</th>
          <th scope='col'>Amount Pledged</th>
        </tr>
      </thead>
      <tbody>
        {(data || []).map(item =>
          item ? (
            <tr key={item['s.no']}>
              <td>{item['s.no']}</td>
              <td>{item['percentage.funded']}</td>
              <td>{item['amt.pledged']}</td>
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  )
}

export default Table
