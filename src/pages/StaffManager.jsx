import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessage("Staff created successfully!")
      getStaff()
    } catch (error) {
      console.error(error)
      setMessage("Failed to create staff.")
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

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${BASE_URL}staff/${editingId}`, formData)

      setMessage("Staff updated successfully!")
      setEditingId(null)
      setFormData(initialState)
      getStaff()
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
    <div className="flight-manager">
      <h2>Staff Management</h2>
      <h3>{editingId ? "Update Staff Mode" : "Register New staff"}</h3>

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
          name="urlPicture"
          placeholder="urlPicture"
          value={formData.urlPicture}
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
          <button type="submit">Create Staff</button>
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
<<<<<<< HEAD
=======

// import { useEffect, useState } from "react"
// import axios from "axios"
// import { BASE_URL } from "../global.js"

// const StaffManage = () => {
//   const [staff, setStaff] = useState([])
//   const [message, setMessage] = useState("")
//   const [isEditing, setIsEditing] = useState(false)
//   const [selectedStaffId, setSelectedStaffId] = useState(null)
//   const [showForm, setShowForm] = useState(false)

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//     jobTitle: "",
//   })

//   const getStaff = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}staff`)
//       console.log("GET /staff response:", response.data)
//       setStaff(response.data)
//     } catch (error) {
//       console.log(error)
//       console.log(error.response?.data)
//       setMessage("Error getting staff")
//     }
//   }
//   useEffect(() => {
//     getStaff()
//   }, [])

//   const handleAddClick = () => {
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       role: "",
//       jobTitle: "",
//     })
//     setSelectedStaffId(null)
//     setIsEditing(false)
//     setShowForm(true)
//     setMessage("")
//   }

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}staff/${id}`)
//       setMessage("staff deleted successfully")
//       getStaff()
//     } catch (error) {
//       setMessage("Error deleting staff")
//     }
//   }

//   const handleEdit = (user) => {
//     setFormData({
//       name: user.name,
//       email: user.email,
//       password: "",
//       role: user.role,
//       jobTitle: user.jobTitle,
//     })
//     setSelectedStaffId(user._id)
//     setIsEditing(true)
//     setShowForm(true)
//     setMessage("")
//   }

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       if (isEditing) {
//         await axios.put(`${BASE_URL}staff/${selectedStaffId}`, {
//           name: formData.name,
//           email: formData.email,
//           role: formData.role,
//           jobTitle: formData.jobTitle,
//         })
//         setMessage("Staff updated successfully")
//       } else {
//         const response = await axios.post(`${BASE_URL}staff`, formData)
//         console.log("POST /staff response:", response.data)
//         setMessage("Staff added successfully")
//       }

//       setIsEditing(false)
//       setSelectedStaffId(null)
//       setShowForm(false)
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         role: "",
//         jobTitle: "",
//       })

//       await getStaff()
//     } catch (error) {
//       console.log(error)
//       console.log(error.response?.data)
//       setMessage(error.response?.data?.message || "Error saving staff")
//     }
//   }

//   return (
//     <div className="manager-page">
//       <h1>staff Manger</h1>

//       {message && <p>{message}</p>}
//       <button onClick={handleAddClick}>Add Staff</button>
//       {showForm && (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           {!isEditing && (
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           )}

//           <input
//             type="text"
//             name="role"
//             placeholder="Role"
//             value={formData.role}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="jobTitle"
//             placeholder="Job Title"
//             value={formData.jobTitle}
//             onChange={handleChange}
//           />

//           <button type="submit">
//             {isEditing ? "Update Staff" : "Add Staff"}
//           </button>
//         </form>
//       )}

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Job Title</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {staff.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>{user.jobTitle}</td>
//               <td>
//                 <button onClick={() => handleEdit(user)}>Edit</button>
//                 <button onClick={() => handleDelete(user._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }
// export default StaffManage
>>>>>>> b0077b3a8c901ffaa90d4684a8701ac71c85ec20
