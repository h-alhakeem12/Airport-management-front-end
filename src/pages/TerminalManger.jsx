import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"
import "../Dashboard.css"


const initialState = {
  terminalName: "",
  gateNumber: "",
  location: "",
  isOperational: "",
}

const Terminal = () => {
  const [terminal, setTerminal] = useState([])
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState(initialState)
  const [editingId, setEditingId] = useState(null)

  const getTerminal = async () => {
    try {
      const response = await axios.get(`${BASE_URL}terminal`)
      setTerminal(response.data)
    } catch (error) {
      console.error("error getting terminals", error)
    }
  }

  useEffect(() => {
    getTerminal()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleEditInit = (terminal) => {
    setEditingId(terminal._id)
    setFormData({
      terminalName: terminal.terminalName,
      gateNumber: terminal.gateNumber,
      location: terminal.location,
      isOperational: terminal.isOperational,
    })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    try {
      await axios.post(`${BASE_URL}terminal/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessage("terminalsetTerminal created successfully!")
      getTerminal()
    } catch (error) {
      console.error(error)
      setMessage("Failed to create Terminal.")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}terminal/${id}`)

      setMessage("Terminal deleted successfully")

      getTerminal()
    } catch (error) {
      console.error(error)
      setMessage("Error deleting terminal")
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${BASE_URL}terminal/${editingId}`, formData)

      setMessage("Terminal updated successfully!")
      setEditingId(null)
      setFormData(initialState)
      getTerminal()
    } catch (error) {
      console.error(error)
      setMessage("Update failed. Check your permissions or fields.")
    }
  }
  const cancelEdit = () => {
    setEditingId(null)
    setFormData(initialState)
    setMessage("")
  }


return (
  <div className="dashboard-container">
    <h2 className="dashboard-title">Terminal Management</h2>

    {message && <p className="message">{message}</p>}

    <div className="card">
      <form onSubmit={editingId ? handleUpdate : handleCreate}>
        <div className="form-group"><input name="terminalName" placeholder="Name" value={formData.terminalName} onChange={handleChange} /></div>
        <div className="form-group"><input name="gateNumber" placeholder="Gate" value={formData.gateNumber} onChange={handleChange} /></div>
        <div className="form-group"><input name="location" placeholder="Location" value={formData.location} onChange={handleChange} /></div>

        <div className="form-group">
          <select name="isOperational" value={formData.isOperational} onChange={handleChange}>
            <option value="">Select</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        {!editingId ? (
          <button className="btn-primary">Create</button>
        ) : (
          <>
            <button className="btn-primary">Update</button>
            <button className="btn-secondary" onClick={cancelEdit}>Cancel</button>
          </>
        )}
      </form>
    </div>

    <div className="list">
      {terminal.map((t) => (
        <div className="list-item" key={t._id}>
          <p>{t.terminalName}</p>
          <p>Gate: {t.gateNumber}</p>

          <button className="btn-primary" onClick={() => handleEditInit(t)}>Edit</button>
          <button className="btn-danger" onClick={() => handleDelete(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
)
}

export default Terminal
