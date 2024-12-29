import axios from "axios"
import { useQuery } from "react-query"
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData"
import { Link } from "react-router-dom"
import { useState } from "react"

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("")
  const [alterEgo, setAlterEgo] = useState("")
  function onSuccess(data) {
    // console.log("Perform side effect after data fetching", data)
  }
  function onError(error) {
    // console.log("Perform side effect after encountering error", error)
  }
  const { isLoading, data, isError, error, refetch, isFetching } =
    useSuperHeroesData({ onSuccess, onError })

  const { mutate: addHero } = useAddSuperHeroData()

  function handleAddHeroClick() {
    console.log({ name, alterEgo })
    const hero = { name, alterEgo }
    addHero(hero)
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <div className="">
      <h2>RQ Super Heores Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data?.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>
      })} */}
    </div>
  )
}
