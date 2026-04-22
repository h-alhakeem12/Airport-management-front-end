import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"

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
    <div className="terminal-manager">
      <h2>terminalsetTerminal Management</h2>
      <h3>{editingId ? "Update Terminal Mode" : "Register New Terminal"}</h3>

      {message && <p>{message}</p>}

      <form onSubmit={editingId ? handleUpdate : handleCreate}>
        <input
          name="terminalName"
          placeholder="terminal Name"
          value={formData.terminalName}
          onChange={handleChange}
          required
        />
        <input
          name="gateNumber"
          placeholder="gate number"
          value={formData.gateNumber}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <select
          name="isOperational"
          placeholder="true or false"
          value={formData.isOperational}
          onChange={handleChange}
          required
        >
          <option value="">select</option>
          <option value="true">true</option>
          <option value="false">false </option>
        </select>

        {!editingId ? (
          <button type="submit">Create terminal</button>
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

      <h3>Terminal List</h3>
      <div>
        {terminal.length > 0 ? (
          terminal.map((t) => (
            <div key={t._id}>
              <p>Name: {t.terminalName}</p>
              <p>gate Number: {t.gateNumber}</p>
              <p>location: {t.location}</p>
              <p>Operational: {t.isOperational}</p>

              <button onClick={() => handleEditInit(t)}>Edit</button>
              <button onClick={() => handleDelete(t._id)}>Delete</button>

              <hr />
            </div>
          ))
        ) : (
          <p>No terminals found.</p>
        )}
      </div>
    </div>
  )
}

export default Terminal
