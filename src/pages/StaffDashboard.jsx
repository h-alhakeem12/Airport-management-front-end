import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../global"

const StaffDashboard = () => {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])
  const [flights, setFlights] = useState([])
  const [todayTasks, setTodayTasks] = useState([])
  const [todayFlights, setTodayFlights] = useState([])

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const userId = localStorage.getItem("userId")

    if (role !== "staff") {
      navigate("/login")
      return
    }

    fetchData(userId)
  }, [navigate])

  const fetchData = async (userId) => {
    try {
      const tasksRes = await axios.get(`${BASE_URL}tasks`)
      const flightsRes = await axios.get(`${BASE_URL}flights`)

     const myTasks = tasksRes.data.filter(
  (task) => task.assignedTo?._id === userId
)
     const myFlights = flightsRes.data.filter(
  (flight) => flight.pilot?._id === userId
)

      setTasks(myTasks)
      setFlights(myFlights)

      const today = new Date().toDateString()

      const tasksToday = myTasks.filter(
        (task) =>
          new Date(task.createdAt || task.updatedAt).toDateString() === today
      )

      const flightsToday = myFlights.filter(
        (flight) =>
          new Date(flight.departureTime).toDateString() === today
      )

      setTodayTasks(tasksToday)
      setTodayFlights(flightsToday)

    } catch (error) {
      console.error(error)
    }
  }

  return (
  <div className="dashboard-container">
    <h1 className="dashboard-title">Staff Dashboard</h1>

    <div className="stats-grid">
      <div className="card">
        <h3>My Tasks: {tasks.length}</h3>
      </div>

      <div className="card">
        <h3>My Flights: {flights.length}</h3>
      </div>
    </div>

    <h2 className="section-title">Today's Tasks</h2>

    <div className="list">
      {todayTasks.length === 0 ? (
        <p>No tasks today</p>
      ) : (
        todayTasks.map((task) => (
          <div className="list-item" key={task._id}>
            <h4>{task.title}</h4>
            <p>{task.status}</p>
          </div>
        ))
      )}
    </div>

    <h2 className="section-title">Today's Flights</h2>

    <div className="list">
      {todayFlights.length === 0 ? (
        <p>No flights today</p>
      ) : (
        todayFlights.map((flight) => (
          <div className="list-item" key={flight._id}>
            <h4>{flight.flightNumber}</h4>
            <p>{flight.destination}</p>
          </div>
        ))
      )}
    </div>
  </div>
)
}

export default StaffDashboard
