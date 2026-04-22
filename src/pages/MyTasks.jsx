import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../global"

const MyTasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const userId = localStorage.getItem("userId")

      const res = await axios.get(`${BASE_URL}tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res.data)
      const filteredTasks = res.data.filter(
        (task) => task?.assignedTo?._id === userId
      )

      setTasks(filteredTasks)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>My Tasks</h1>

      {tasks.map((task) => (
        <div key={task._id}>
          <h3>Title: {task.title}</h3>
          <p>Description: {task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  )
}

export default MyTasks
