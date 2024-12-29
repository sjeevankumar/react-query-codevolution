import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"

const baseUrl = "http://localhost:4000/superheroes"
function fetchSuperHeroes() {
  // return axios.get(baseUrl)
  return request({ url: "/superheroes" })
}

function addSuperHero(hero) {
  // return axios.post("http://localhost:4000/superheroe", hero)
  return request({ url: "/superheroes", method: "post", data: hero })
}
export function useSuperHeroesData({ onSuccess, onError, enabled }) {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    enabled,
    // select: (data) => {
    //   const superHeroes = data.data.map((hero) => hero.name)
    //   return superHeroes
    // },
  })
}

export function useAddSuperHeroData() {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes")
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     }
    //   })
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes")
      const previousHeroData = queryClient.getQueryData("super-heroes")
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        }
      })
      return {
        previousHeroData,
      }
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes")
    },
  })
}
