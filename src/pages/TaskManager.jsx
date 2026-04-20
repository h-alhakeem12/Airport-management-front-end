import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../global"

const TaskManager = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const res = await axios.get(`${BASE_URL}tasks`)
      setTasks(res.data)
    }
    getTasks()
  }, [])

  return (
    <div className="p-20">
      <h2>Task Manager</h2>
      <ul>
        {tasks.map(t => <li key={t._id}>{t.description} - {t.status}</li>)}
      </ul>
    </div>
  )
}
export default TaskManager
