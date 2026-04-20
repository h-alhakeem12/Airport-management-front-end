import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "",
  jobTitle: "",
}

const StaffManager = () => {
  const [staffs, setStaff] = useState([])
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState(initialState)
  const [editingId, setEditingId] = useState(null)

  const getStaff = async () => {
    try {
      const response = await axios.get(`${BASE_URL}staff`)
      setStaff(response.data)
    } catch (error) {
      console.error("error getting staffs", error)
    }
  }

  useEffect(() => {
    getStaff()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleEditInit = (staff) => {
    setEditingId(staff._id)
    setFormData({
      name: staff.name,
      email: staff.email,
      password: staff.password,
      role: staff.role,
      jobTitle: staff.jobTitle,
    })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}staff`, formData)
      getStaff()
      setFormData(initialState)
      setMessage("staff added successfully")
    } catch (error) {
      setMessage("Error adding staff")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}staff/${id}`)
      setMessage("staff deleted successfully")
      getStaff()
    } catch (error) {
      setMessage("Error deleting staff")
    }
  }

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${BASE_URL}staff/${id}`, formData)
      setMessage("staff updated completely!")
      setEditingId(null)
      setFormData(initialState)
      getStaff()
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
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          name="role"
          placeholder="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <input
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
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

      <h3>Staff List</h3>
      <div>
        {staffs.length > 0 ? (
          staffs.map((staff) => (
            <div key={staff._id}>
              <p>Name: {staff.name}</p>
              <p>Email: {staff.email}</p>
              <p>Role: {staff.role}</p>
              <p>Job title: {staff.jobTitle}</p>

              <button onClick={() => handleEditInit(staff)}>Edit</button>
              <button onClick={() => handleDelete(staff._id)}>Delete</button>

              <hr />
            </div>
          ))
        ) : (
          <p>No staff members found.</p>
        )}
      </div>
    </div>
  )
}

export default StaffManager
