import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"
import "../Dashboard.css"

const MyTask = () => {
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState("")

  const getTasks = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const userId = localStorage.getItem("userId")

      const response = await axios.get(`${BASE_URL}tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const filteredTasks = response.data.filter(
        (task) => task?.assignedTo?._id === userId
      )

      setTasks(filteredTasks)

    } catch (error) {
      console.error("error getting tasks", error)
      setMessage("Error getting tasks")
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">My Tasks</h2>

      {message && <p className="message">{message}</p>}

      <div className="list">
        {tasks.length === 0 ? (
          <p>No tasks assigned</p>
        ) : (
          tasks.map((t) => (
            <div className="list-item" key={t._id}>

              <p>
                <strong>Title:</strong> {t.title}
              </p>

              <p>
                <strong>Description:</strong> {t.description}
              </p>

              <p>
                <strong>Status:</strong> {t.status}
              </p>

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyTask

