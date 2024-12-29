import axios from "axios"
import { Fragment } from "react"
import { useInfiniteQuery } from "react-query"

function fetchColors({ pageParam = 1 }) {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}
export const InfiniteQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <div className="">
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id}. {color.label}
                </h2>
              ))}
            </Fragment>
          )
        })}
        {/* {data?.pages
          ?.reduce((colors, item) => [...colors, ...item?.data], [])
          ?.map((color) => {
            return (
              <div key={color.id}>
                <h2>
                  {color.id}. {color.label}
                </h2>
              </div>
            )
          })} */}
      </div>
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Load more
        </button>
        <div>{isFetching && !isFetchingNextPage && "Fetching..."}</div>
      </div>
    </div>
  )
}
