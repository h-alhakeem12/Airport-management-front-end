import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../global"

const initialState = {
  title: "",
  description: "",
  status: "Pending",
  assignedTo: "",
  flight: "",
}

const TaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [staff, setStaff] = useState([])
  const [flight, setFlights] = useState([])
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState(initialState)
  const [editingId, setEditingId] = useState(null)

  const getTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}tasks`)
      const staffResponse = await axios.get(`${BASE_URL}staff`)
      const flightResponse = await axios.get(`${BASE_URL}flights`)

      setTasks(response.data)
      setStaff(response.data)
      setFlights(response.data)
    } catch (error) {
      console.error("error getting tasks", error)
      setMessage("Error getting tasks")
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const handleEditInit = (task) => {
    setEditingId(task._id)
    setFormData({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "pending",
      assignedTo:
        typeof task.assignedTo === "object" && task.flight !== null
          ? task.assignedTo._id
          : task.flight || "",
    })
  }
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}tasks`, formData)
      getTasks()
      setFormData(initialState)
      setMessage("Task added successfully")
    } catch (error) {
      console.error("error adding task", error)
      setMessage("Error adding task")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}tasks/${id}`)
      setMessage("Task deleted successfully")
      getTasks()
    } catch (error) {
      console.error("error deleting task", error)
      setMessage("Error deleting task")
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${BASE_URL}tasks/${editingId}`, formData)
      setMessage("Task updated completely!")
      setEditingId(null)
      getTasks()
    } catch (error) {
      console.error("error updating task", error)
      setMessage("Update failed. Check all fields.")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData(initialState)
    setMessage("")
  }

  return (
    <div className="task-manager">
      <h2>Task Management</h2>
      <h3>{editingId ? "Update Task Mode" : "Register New Task"}</h3>

      {message && <p>{message}</p>}

      <form onSubmit={editingId ? handleUpdate : handleCreate}>
        <input
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          required
        >
          <option value="">Select Staff</option>
          {staff.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name}
            </option>
          ))}
        </select>

        <select
          name="flight"
          value={formData.flight}
          onChange={handleChange}
          required
        >
          <option value="">Select Flight</option>
          {flights.map((flight) => (
            <option key={flight._id} value={flight._id}>
              {flight.flightNumber}
            </option>
          ))}
        </select>

        {!editingId ? (
          <button type="submit">Create Task</button>
        ) : (
          <div>
            <button type="submit">Confirm Update</button>
            <button type="button" onClick={cancelEdit}>
              Cancel Edit
            </button>
          </div>
        )}
      </form>

      <hr />

      <h3>Task List</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id}>
            <p>
              {task.title} ({task.status})
            </p>
            <p>Description: {task.description}</p>
            <p>Task ID: {task._id}</p>
            <p>Assigned To: {task.assignedTo?.name || task.assignedTo}</p>
            <p>Flight: {task.flight?.flightNumber || task.flight}</p>

            <button onClick={() => handleEditInit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskManager
