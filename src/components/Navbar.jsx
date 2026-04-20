import { Link } from "react-router-dom"
import '../Sidebar.css'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/about" >About</Link>
    </nav>
  )
}

export default Navbar
