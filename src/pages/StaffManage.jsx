import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"

const StaffManage = () => {
  const [staff, setStaff] = useState([])
  const [message, setMessage] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [selectedStaffId, setSelectedStaffId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    jobTitle: "",
  })

  const getStaff = async () => {
    try {
      const response = await axios.get(`${BASE_URL}staff`)
      console.log("GET /staff response:", response.data)
      setStaff(response.data)
    } catch (error) {
      console.log(error)
      console.log(error.response?.data)
      setMessage("Error getting staff")
    }
  }
  useEffect(() => {
    getStaff()
  }, [])

  const handleAddClick = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      jobTitle: "",
    })
    setSelectedStaffId(null)
    setIsEditing(false)
    setShowForm(true)
    setMessage("")
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

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      jobTitle: user.jobTitle,
    })
    setSelectedStaffId(user._id)
    setIsEditing(true)
    setShowForm(true)
    setMessage("")
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}staff/${selectedStaffId}`, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          jobTitle: formData.jobTitle,
        })
        setMessage("Staff updated successfully")
      } else {
        const response = await axios.post(`${BASE_URL}staff`, formData)
        console.log("POST /staff response:", response.data)
        setMessage("Staff added successfully")
      }

      setIsEditing(false)
      setSelectedStaffId(null)
      setShowForm(false)
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        jobTitle: "",
      })

      await getStaff()
    } catch (error) {
      console.log(error)
      console.log(error.response?.data)
      setMessage(error.response?.data?.message || "Error saving staff")
    }
  }

  return (
    <div className="manager-page">
      <h1>staff Manger</h1>

      {message && <p>{message}</p>}
      <button onClick={handleAddClick}>Add Staff</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {!isEditing && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          )}

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
          />

          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />

          <button type="submit">
            {isEditing ? "Update Staff" : "Add Staff"}
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Job Title</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.jobTitle}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default StaffManage
