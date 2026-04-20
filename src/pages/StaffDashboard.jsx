import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../global"
import StaffSidebar from "../components/StaffSidebar"

const StaffDashboard = () => {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])
  const [flights, setFlights] = useState([])
  const [todayTasks, setTodayTasks] = useState([])
  const [todayFlights, setTodayFlights] = useState([])

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const userName = localStorage.getItem("userName")

    if (role !== "staff") {
      navigate("/login")
    }

    fetchData(userName)
  }, [])

  const fetchData = async (userName) => {
    try {
      const tasksRes = await axios.get(`${BASE_URL}tasks`)
      const flightsRes = await axios.get(`${BASE_URL}flights`)

      const myTasks = tasksRes.data.filter(
        (task) => task.assignedTo?.name === userName
      )

      const myFlights = flightsRes.data.filter(
        (flight) => flight.pilot?.name === userName
      )

      setTasks(myTasks)
      setFlights(myFlights)

      const today = new Date().toDateString()

      const tasksToday = myTasks.filter(
        (task) =>
          new Date(task.createdAt).toDateString() === today
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
    <div>
      <StaffSidebar />
      <div>
        <h1>Staff Dashboard</h1>

        <div>
          <h3>My Tasks: {tasks.length}</h3>
          <h3>My Flights: {flights.length}</h3>
        </div>

        <h2>Today's Tasks</h2>
                                                {todayTasks.length === 0 ? (
          <p>No tasks today</p>
        ) : (
          todayTasks.map((task) => (
            <div key={task._id}>
              <h4>{task.title}</h4>
              <p>{task.status}</p>
            </div>
          ))
        )}

        <h2>Today's Flights</h2>
        {todayFlights.length === 0 ? (
          <p>No flights today</p>
        ) : (
          todayFlights.map((flight) => (
            <div key={flight._id}>
              <h4>{flight.flightNumber}</h4>
              <p>{flight.destination}</p>
              <p>{new Date(flight.departureTime).toLocaleString()}</p>
            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default StaffDashboard
