import axios from "axios"
import { useQuery } from "react-query"

function fetchSuperHeroes() {
  return axios.get("http://localhost:4000/superheroes")
}
function fetchFriends() {
  return axios.get("http://localhost:4000/friends")
}
export const ParallelQueries = () => {
  const { data: superheroes } = useQuery("super-heroes", fetchSuperHeroes)
  useQuery("friends", fetchFriends)
  return <div className="">ParallelQueries</div>
}
