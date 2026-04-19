import axios from 'axios'

const API_URL = 'http://localhost:3000/auth/'

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}

export default { login, logout }
