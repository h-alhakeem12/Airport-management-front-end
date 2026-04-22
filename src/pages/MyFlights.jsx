import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../global.js"
import "../Dashboard.css"

const MyFlight = () => {
  const [flights, setFlights] = useState([])
  const [message, setMessage] = useState("")

  const getFlights = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const userId = localStorage.getItem("userId")

      const res = await axios.get(`${BASE_URL}flights`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const filteredFlights = res.data.filter(
        (flight) => flight?.pilot?._id === userId
      )

      setFlights(filteredFlights)

    } catch (error) {
      console.error(error)
      setMessage("Error getting flights")
    }
  }

  useEffect(() => {
    getFlights()
  }, [])

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">My Flights</h2>

      {message && <p className="message">{message}</p>}

      <div className="list">
        {flights.length === 0 ? (
          <p>No flights assigned</p>
        ) : (
          flights.map((f) => (
            <div className="list-item" key={f._id}>
              <p><strong>Flight:</strong> {f.flightNumber}</p>

              <p>
                <strong>Destination:</strong>{" "}
                {f.destination}
              </p>

              <p>
                <strong>Departure Time:</strong>{" "}
                {new Date(f.departureTime).toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong> {f.status}
              </p>

              <p>
                <strong>Terminal:</strong>{" "}
                {f.terminal?.terminalName} - {f.terminal?.location} - Gate{" "}
                {f.terminal?.gateNumber}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyFlight
