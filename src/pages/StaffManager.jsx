import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"
import "../Dashboard.css"

const initialState = {
  name: "",
  email: "",
  password: "",
  urlPicture: "",
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
      console.error(error)
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
      urlPicture: staff.urlPicture,
      role: staff.role,
      jobTitle: staff.jobTitle,
    })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    try {
      await axios.post(`${BASE_URL}staff/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMessage("Staff created successfully!")
      setFormData(initialState)
      getStaff()
    } catch (error) {
      setMessage("Failed to create staff.")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}staff/${id}`)
      setMessage("Deleted successfully")
      getStaff()
    } catch {
      setMessage("Error deleting")
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${BASE_URL}staff/${editingId}`, formData)
      setMessage("Updated successfully!")
      setEditingId(null)
      setFormData(initialState)
      getStaff()
    } catch {
      setMessage("Update failed")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData(initialState)
    setMessage("")
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Staff Management</h2>

      {message && <p className="message">{message}</p>}

      <div className="card">
        <form onSubmit={editingId ? handleUpdate : handleCreate}>
          <div className="form-group"><input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /></div>
          <div className="form-group"><input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /></div>
          <div className="form-group"><input name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /></div>
          <div className="form-group"><input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required /></div>
          <div className="form-group"><input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required /></div>

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
        {staffs.map((s) => (
          <div className="list-item" key={s._id}>
            <p>{s.name}</p>
            <p>{s.email}</p>
            <p>{s.role}</p>

            <button className="btn-primary" onClick={() => handleEditInit(s)}>Edit</button>
            <button className="btn-danger" onClick={() => handleDelete(s._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StaffManager
