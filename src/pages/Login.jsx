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
        password
      })

      localStorage.setItem("userToken", response.data.token)
      localStorage.setItem("userRole", response.data.user.role)
      localStorage.setItem("userName", response.data.user.name)

      navigate("/")
    } catch (error) {
      console.error("Login Error:", error)
      alert("Error logging")
    }
  }

  return (
    <div className="loginPage">
      <h1>Aero Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
