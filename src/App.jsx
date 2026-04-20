import "./App.css"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import StaffDashboard from "./pages/StaffDashboard"
import MyTasks from "./pages/MyTasks"
import Flight from "./pages/FlightManager"

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/StaffDashboard" element={<StaffDashboard />} />
          <Route path="/MyTasks" element={<MyTasks />} />
          <Route path="/AdminDashboard/flights" element={<Flight />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
