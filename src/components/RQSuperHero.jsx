import { useParams } from "react-router-dom"
import { useSuperHero } from "../hooks/useSuperHeroData"

export const RQSuperHeroPage = () => {
  const { heroId } = useParams()
  const { isLoading, data, isError, error } = useSuperHero(heroId)
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <div className="">
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  )
}
