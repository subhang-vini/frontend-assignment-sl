import('../styles/Pagination.css')

const Pagination = ({ updatePage, isLastPage, page }) => {
  return (
    <div className='pagination'>
      <button
        aria-label='Previous page'
        onClick={() => updatePage(page - 1)}
        className={page === 1 ? 'disabled' : ''}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className='page-status'>Current Page : {page}</span>
      <button
        onClick={() => updatePage(page + 1)}
        disabled={isLastPage}
        aria-label='Next page'
        className={isLastPage ? 'disabled' : ''}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination