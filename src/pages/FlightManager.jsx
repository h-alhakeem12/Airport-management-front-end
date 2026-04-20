import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"

const initialState = {
  flightNumber: "",
  destination: "",
  departureTime: "",
  status: "Scheduled",
  pilot: "",
  terminal: "",
  createdBy: "",
}

const Flight = () => {
  const [flights, setFlights] = useState([])
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState(initialState)
  const [editingId, setEditingId] = useState(null)

  const getFlights = async () => {
    try {
      const response = await axios.get(`${BASE_URL}flights`)
      setFlights(response.data)
    } catch (error) {
      console.error("error getting flights", error)
    }
  }

  useEffect(() => {
    getFlights()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleEditInit = (flight) => {
    setEditingId(flight._id)
    setFormData({
      flightNumber: flight.flightNumber,
      destination: flight.destination,
      departureTime: flight.departureTime,
      status: flight.status,
      pilot: flight.pilot,
      terminal: flight.terminal,
      createdBy: flight.createdBy,
    })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}flights`, formData)
      getFlights()
      setFormData(initialState)
      setMessage("Flight added successfully")
    } catch (error) {
      setMessage("Error adding flight")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}flights/${id}`)
      setMessage("Flight deleted successfully")
      getFlights()
    } catch (error) {
      setMessage("Error deleting flight")
    }
  }

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${BASE_URL}flights/${id}`, formData)
      setMessage("Flight updated completely!")
      setEditingId(null)
      setFormData(initialState)
      getFlights()
    } catch (error) {
      setMessage("Update failed. Check all fields.")
    }
  }
  const cancelEdit = () => {
    setEditingId(null)
    setFormData(initialState)
    setMessage("")
  }

  return (
    <div className="flight-manager">
      <h2>Flight Management</h2>
      <h3>{editingId ? "Update Flight Mode" : "Register New Flight"}</h3>

      {message && <p>{message}</p>}

      <form onSubmit={editingId ? handleUpdate : handleCreate}>
        <input
          name="flightNumber"
          placeholder="Flight Number"
          value={formData.flightNumber}
          onChange={handleChange}
          required
        />
        <input
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <input
          name="departureTime"
          placeholder="Departure Time"
          value={formData.departureTime}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Scheduled">Scheduled</option>
          <option value="Delayed">Delayed</option>
          <option value="Departed">Departed</option>
        </select>

        <input
          name="pilot"
          placeholder="Pilot ID"
          value={formData.pilot}
          onChange={handleChange}
          required
        />
        <input
          name="terminal"
          placeholder="Terminal ID"
          value={formData.terminal}
          onChange={handleChange}
          required
        />
        <input
          name="createdBy"
          placeholder="Admin ID"
          value={formData.createdBy}
          onChange={handleChange}
          required
        />

        {!editingId ? (
          <button type="submit">Create Flight</button>
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

      <h3>Flight List</h3>
      <div className="flight-list">
        {flights.map((flight) => (
          <div key={flight._id}>
            <p>
              {flight.flightNumber} to {flight.destination} ({flight.status})
            </p>
            <p>ID: {flight._id}</p>

            <button onClick={() => handleEditInit(flight)}>Edit</button>

            <button onClick={() => handleDelete(flight._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Flight
