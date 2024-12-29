import axios from "axios"
import { useQuery, useQueryClient } from "react-query"

function fetchSuperHero({ queryKey }) {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export function useSuperHero(heroId) {
  const queryClient = useQueryClient()
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === heroId)
      if (hero) {
        return { data: hero }
      } else {
        return undefined
      }
    },
  })
}
