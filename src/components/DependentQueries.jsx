import axios from "axios"
import { useQuery } from "react-query"

function fetchUserByEmail(email) {
  return axios.get(`http://localhost:4000/users/${email}`)
}
function fetchCoursesByChannelId(channelId) {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}
export const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  )
  const channelId = user?.data.channelId
  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  )
  return (
    <div className="">
      <h1>Courses</h1>
      {courses?.data.courses.map((course) => {
        return <p>{course}</p>
      })}
    </div>
  )
}
