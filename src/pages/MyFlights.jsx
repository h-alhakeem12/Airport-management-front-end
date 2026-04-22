import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../global"

const MyFlights = () => {
  const [flights, setFlights] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    try {
      const token = localStorage.getItem("userToken")
      const user = localStorage.getItem("userId")

      const response = await axios.get(`${BASE_URL}flights`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data)
      const filteredFlights = response.data.filter((flight) => {
        return flight.pilot._id == user
      })

      setFlights(filteredFlights)
    } catch (error) {
      console.error(error)
      setMessage("Error getting flights")
    }
  }
  return (
    <div>
      <h1>My Flights</h1>
      {message && <p>{message}</p>}

      {flights.length === 0 ? (
        <p>No flights assigned</p>
      ) : (
        flights.map((flight) => (
          <div key={flight._id}>
            <h3>{flight.flightNumber}</h3>
            <p>Destination: {flight.destination}</p>
            <p>Departure Time: {flight.departureTime}</p>
            <p>Status: {flight.status}</p>
            <p>
              Terminal:{" "}
              {typeof flight.terminal === "object" && flight.terminal !== null
                ? `${flight.terminal.terminalName} - Gate ${flight.terminal.gateNumber}`
                : flight.terminal}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default MyFlights
