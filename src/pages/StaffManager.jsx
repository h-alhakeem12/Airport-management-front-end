import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../global"

const StaffManager = () => {
  const [staff, setStaff] = useState([])

  const getStaff = async () => {
    try {
      const res = await axios.get(`${BASE_URL}staff`)
      setStaff(res.data)
    } catch (error) { console.error(error) }
  }

  useEffect(() => { getStaff() }, [])

  return (
    <div className="p-20">
      <h2>Staff Management</h2>
      <div className="grid">
        {staff.map((s) => (
          <div key={s._id} className="card">
            <h4>{s.name}</h4>
            <p>{s.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default StaffManager
