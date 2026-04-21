import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../global"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email,
        password,
      })
      localStorage.setItem("userToken", response.data.token)
      localStorage.setItem("userRole", response.data.user.role)
      localStorage.setItem("userName", response.data.user.name)
      localStorage.setItem("userId", response.data.user.id)

      if (response.data.user.role === "admin") {
        navigate("/AdminDashboard")
      } else {
        navigate("/StaffDashboard")
      }
    } catch (error) {
      alert("Invalid email or password")
    }
  }

  return (
    <div className="login-page">
      <h1 className="title">AERO MANAGEMENT SYSTEM</h1>{" "}
      <div className="login-card">
        <h1>LOGIN</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
export default Login
