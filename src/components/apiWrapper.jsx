import { useReducer, useMemo, useCallback, memo } from 'react'
import axios from 'axios'

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        isLastPage: action.payload.data.length < action.payload.pageSize,
        error: null
      }
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'UPDATE_PAGE':
      return {
        ...state,
        page: action.payload.pageNumber,
        isLastPage:
          action.payload.pageNumber * action.payload.pageSize >=
          state.data.length
      }
    default:
      return state
  }
}

const paginatedApiDataWrapper = Component => {
  const ApiWrapperComp = ({ pageSize = 5, url }) => {
    const [{ data, page, loading, error, isLastPage }, dispatch] = useReducer(
      dataReducer,
      {
        data: [],
        page: 1,
        loading: true,
        error: null,
        isLastPage: false
      }
    )
    const fetchData = useCallback(async () => {
      dispatch({ type: 'FETCH_DATA' })
      try {
        const response = await axios.get(url)
        dispatch({
          type: 'FETCH_DATA_SUCCESS',
          payload: { data: response.data, pageSize }
        })
      } catch (error) {
        dispatch({ type: 'FETCH_DATA_ERROR', payload: error })
      }
    }, [])
    const updatePage = newPage => {
      dispatch({
        type: 'UPDATE_PAGE',
        payload: { pageNumber: newPage, pageSize }
      })
    }
    const paginatedData = useMemo(() => {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      return data.slice(start, end)
    }, [data, page])
    return (
      <Component
        data={paginatedData}
        page={page}
        loading={loading}
        fetchData={fetchData}
        error={error}
        isLastPage={isLastPage}
        updatePage={updatePage}
      />
    )
  }
  return memo(ApiWrapperComp)
}

export default paginatedApiDataWrapper
