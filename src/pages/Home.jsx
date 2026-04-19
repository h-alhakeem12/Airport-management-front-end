import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role === "admin") {
      navigate("/AdminDashboard")
    } else if (role === "staff") {
      navigate("/StaffDashboard")
    } else {
      navigate("/login")
    }
  }, [navigate])

  return <div>Loading...</div>
}

export default Home
