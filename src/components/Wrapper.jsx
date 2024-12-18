import usePaginatedDataFetch from '@hooks/usePaginatedDataFetch'
import { useEffect } from 'react'
import Table from '@components/Table'
import '../styles/Wrapper.css'
import Pagination from '@components/Pagination'

const URL__API =
  'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'

function Wrapper () {
  const { data, loading, error, page, isLastPage, fetchData, updatePage } =
    usePaginatedDataFetch({ url: URL__API, pageSize: 5 })
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='pageContainer'>
      <h1 className='title' id='main-heading'>
        Highly-rated Kickstarter Projects
      </h1>
      {error ? (
        <div role='alert' aria-live='assertive'>
          <h2>{error}</h2>{' '}
        </div>
      ) : null}
      <Table data={data} loading={loading} />
      <Pagination page={page} isLastPage={isLastPage} updatePage={updatePage} />
    </div>
  )
}

export default Wrapper
