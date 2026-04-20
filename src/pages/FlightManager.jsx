import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"

const Flight = () => {
  const [flights, setFlights] = useState([])
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({
    flightNumber: "",
    destination: "",
    departureTime: "",
    status: "Scheduled",
    pilot: "",
    terminal: "",
    createdBy: "",
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}flights`, formData)
      getFlights()
      setFormData({
        flightNumber: "",
        destination: "",
        departureTime: "",
        status: "Scheduled",
        pilot: "",
        terminal: "",
        createdBy: "",
      })
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

  const handleUpdateAll = async (id) => {
    try {
      await axios.put(`${BASE_URL}flights/${id}`, formData)
      setMessage("Flight updated completely!")
      getFlights()
    } catch (error) {
      setMessage("Update failed. Check all fields.")
    }
  }

  return (
    <div className="flight-manager">
      <h2>Flight Management</h2>

      {message && <p>{message}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
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
          placeholder="Departure Time (e.g. 10:00 AM)"
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
          placeholder="Pilot IF"
          value={formData.pilot}
          onChange={handleChange}
          required
        />
        <input
          name="terminal"
          placeholder="Terminal IF"
          value={formData.terminal}
          onChange={handleChange}
          required
        />
        <input
          name="createdBy"
          placeholder="Admin IF"
          value={formData.createdBy}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Flight</button>
      </form>

      <hr />

      <h3>Flight List</h3>
      <div className="flight-list">
        {flights.map((flight) => (
          <div key={flight._id}>
            <p>
              <strong>{flight.flightNumber}</strong> to {flight.destination} (
              {flight.status})
            </p>
            <p>
              <small>ID: {flight._id}</small>
            </p>

            <button onClick={() => handleUpdateAll(flight._id)}>
              Update with Form Data
            </button>

            <button onClick={() => handleDelete(flight._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Flight
