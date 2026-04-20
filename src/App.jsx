import "./App.css"
import { Routes, Route } from "react-router-dom"
import StaffManage from "./pages/StaffManage"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/staff-manage" element={<StaffManage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
