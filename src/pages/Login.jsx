import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../auth/authService'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await authService.login(formData)

      if (user.user.role === 'admin') {
        navigate('/admin-dashboard')
      } else {
        navigate('/staff-dashboard')
      }

    } catch (error) {
      alert("Login failed: " + error.response.data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({...formData, password: e.target.value})}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
