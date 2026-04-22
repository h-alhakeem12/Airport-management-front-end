import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"
import "../Dashboard.css"

const initialState = {
  title: "",
  description: "",
  status: "Pending",
  assignedTo: "",
  flight: "",
}

const TaskManage = () => {
  const [tasks, setTasks] = useState([])
  const [staff, setStaff] = useState([])
  const [flights, setFlights] = useState([])
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState(initialState)
  const [editingId, setEditingId] = useState(null)

  const getTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}tasks`)
      const staffResponse = await axios.get(`${BASE_URL}staff`)
      const flightsResponse = await axios.get(`${BASE_URL}flights`)

      setTasks(response.data)
      setStaff(staffResponse.data)
      setFlights(flightsResponse.data)

    } catch (error) {
      console.error("error getting tasks", error)
      setMessage("Error getting tasks")
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEditInit = (task) => {
    setEditingId(task._id)
    setFormData({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "Pending",
      assignedTo:
        typeof task.assignedTo === "object" && task.assignedTo !== null
          ? task.assignedTo._id
          : task.assignedTo || "",
      flight:
        typeof task.flight === "object" && task.flight !== null
          ? task.flight._id
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
      setFormData(initialState)
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
    <div className="dashboard-container">
      <h2 className="dashboard-title">Task Management</h2>

      {message && <p className="message">{message}</p>}

      {/* FORM */}
      <div className="card">
        <form onSubmit={editingId ? handleUpdate : handleCreate}>

          <div className="form-group">
            <input
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="">Select Staff</option>
              {staff
                .filter((member) => member.role === "staff")
                .map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
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
          </div>

          {!editingId ? (
            <button className="btn-primary" type="submit">
              Create Task
            </button>
          ) : (
            <div>
              <button className="btn-primary" type="submit">
                Confirm Update
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* LIST */}
      <div className="list">
        {tasks.map((task) => (
          <div className="list-item" key={task._id}>
            <p><strong>{task.title}</strong> ({task.status})</p>
            <p>{task.description}</p>
            <p>ID: {task._id}</p>
            <p>Assigned: {task.assignedTo?.name || task.assignedTo}</p>
            <p>Flight: {task.flight?.flightNumber || task.flight}</p>

            <button className="btn-primary" onClick={() => handleEditInit(task)}>
              Edit
            </button>

            <button className="btn-danger" onClick={() => handleDelete(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TaskManage
