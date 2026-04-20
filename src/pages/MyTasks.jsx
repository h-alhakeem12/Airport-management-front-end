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

      const res = await axios.get(`${BASE_URL}tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTasks(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>My Tasks</h1>

      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  )
}

export default MyTasks
