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
  const [pilots, setPilots] = useState([])
  const [admins, setAdmins] = useState([])
  const [terminals, setTerminals] = useState([])
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState(initialState)
  const [editingId, setEditingId] = useState(null)

  const getFlights = async () => {
    try {
      const response = await axios.get(`${BASE_URL}flights`)
      const pilots = await axios.get(`${BASE_URL}staff`)
      const terminals = await axios.get(`${BASE_URL}terminal`)
      const admins = await axios.get(`${BASE_URL}staff`)
      setFlights(response.data)
      setPilots(pilots.data)
      setTerminals(terminals.data)
      setAdmins(admins.data)
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
      createdBy: flight.admin,
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

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`${BASE_URL}flights/${editingId}`, formData)
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
          type="Date"
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

        <select
          name="pilot"
          value={formData.pilot}
          onChange={handleChange}
          required
        >
          <option value="pilot">Select Pilot</option>
          {pilots
            .filter((pilot) => pilot.jobTitle === "pilot")
            .map((pilot) => (
              <option key={pilot._id} value={pilot._id}>
                {pilot.name}
              </option>
            ))}
        </select>

        <select
          name="terminal"
          value={formData.terminal}
          onChange={handleChange}
          required
        >
          <option value="terminal">Select Terminal</option>
          {terminals.map((terminal) => (
            <option key={terminal._id} value={terminal._id}>
              {terminal.terminalName}
            </option>
          ))}
        </select>
        <select
          name="createdBy"
          value={formData.admin}
          onChange={handleChange}
          required
        >
          <option value="admin">Select Admin</option>
          {admins
            .filter((admin) => admin.role === "admin")
            .map((admin) => (
              <option key={admin._id} value={admin._id}>
                {admin.name}
              </option>
            ))}
        </select>

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
            <p>Date:{flight.departureTime}</p>
            <p>ID: {flight._id}</p>
            <p>Pilot: {flight.pilot?.name}</p>
            <p>Terminal: {flight.terminal?.terminalName}</p>
            <p>Admin: {flight.createdBy?.name}</p>

            <button onClick={() => handleEditInit(flight)}>Edit</button>
            <button onClick={() => handleDelete(flight._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Flight
