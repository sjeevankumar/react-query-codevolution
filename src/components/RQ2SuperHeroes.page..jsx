import { useSuperHeroesData } from "../hooks/useSuperHeroesData"

export const RQ2SuperHeroesPage = () => {
  function onSuccess(data) {}
  function onFailure(error) {}

  const { data, refetch, isLoading, isFetching, isError, error } =
    useSuperHeroesData({
      onSuccess,
      onFailure,
      enabled: false,
    })
  if (isLoading || isFetching) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }
  return (
    <div className="">
      {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>
      })}
      <button onClick={refetch}>Fetch Heroes</button>
    </div>
  )
}
