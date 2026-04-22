import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"
import "../Dashboard.css"

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
      const res = await axios.get(`${BASE_URL}flights`)
      const staff = await axios.get(`${BASE_URL}staff`)
      const terminals = await axios.get(`${BASE_URL}terminal`)

      setFlights(res.data)
      setPilots(staff.data)
      setAdmins(staff.data)
      setTerminals(terminals.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFlights()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}flights`, formData)
      setMessage("Flight created!")
      setFormData(initialState)
      getFlights()
    } catch {
      setMessage("Create failed")
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}flights/${id}`)
    getFlights()
  }

  const handleEditInit = (f) => {
    setEditingId(f._id)
    setFormData({
      flightNumber: f.flightNumber,
      destination: f.destination,
      departureTime: f.departureTime,
      status: f.status,
      pilot: f.pilot?._id,
      terminal: f.terminal?._id,
      createdBy: f.createdBy?._id,
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    await axios.put(`${BASE_URL}flights/${editingId}`, formData)
    setEditingId(null)
    setFormData(initialState)
    getFlights()
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData(initialState)
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Flight Management</h2>

      {message && <p className="message">{message}</p>}

      <div className="card">
        <form onSubmit={editingId ? handleUpdate : handleCreate}>

          <div className="form-group"><input name="flightNumber" placeholder="Flight Number" value={formData.flightNumber} onChange={handleChange} required /></div>
          <div className="form-group"><input name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required /></div>
          <div className="form-group"><input type="date" name="departureTime" value={formData.departureTime} onChange={handleChange} required /></div>

          <div className="form-group">
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Scheduled</option>
              <option>Delayed</option>
              <option>Departed</option>
            </select>
          </div>

          {/* 🔥 المهم */}
          <div className="form-group">
            <select name="pilot" value={formData.pilot} onChange={handleChange} required>
              <option value="">Select Pilot</option>
              {pilots.filter(p => p.jobTitle === "pilot").map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select name="terminal" value={formData.terminal} onChange={handleChange} required>
              <option value="">Select Terminal</option>
              {terminals.map(t => (
                <option key={t._id} value={t._id}>{t.terminalName}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select name="createdBy" value={formData.createdBy} onChange={handleChange} required>
              <option value="">Select Admin</option>
              {admins.filter(a => a.role === "admin").map(a => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>
          </div>

          {!editingId ? (
            <button className="btn-primary">Create</button>
          ) : (
            <>
              <button className="btn-primary">Update</button>
              <button type="button" className="btn-secondary" onClick={cancelEdit}>Cancel</button>
            </>
          )}
        </form>
      </div>

      <div className="list">
        {flights.map(f => (
          <div className="list-item" key={f._id}>
            <p>{f.flightNumber}</p>
            <p>{f.destination}</p>
            <p>{f.status}</p>

            <button className="btn-primary" onClick={() => handleEditInit(f)}>Edit</button>
            <button className="btn-danger" onClick={() => handleDelete(f._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Flight
