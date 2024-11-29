import paginatedApiDataWrapper from './apiWrapper'
import { useEffect } from 'react'
import Table from './Table'
import '../styles/Wrapper.css'

function Wrapper ({
  data,
  loading,
  error,
  page,
  isLastPage,
  fetchData,
  updatePage
}) {
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='pageContainer'>
      <h1 className='title'>Projects Data</h1>
      {error ? <h2>{error}</h2> : null}
      <Table data={data} loading={loading} />
      <div className='pagination'>
        <button
          aria-label='Previous page'
          onClick={() => updatePage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className='page-status'>Current Page : {page}</span>
        <button
          onClick={() => updatePage(page + 1)}
          disabled={isLastPage}
          aria-label='Next page'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default paginatedApiDataWrapper(Wrapper)
