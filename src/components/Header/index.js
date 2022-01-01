import {Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <div className="header-container">
      <h1 className="nav-header">
        COVID19<span className="span">INDIA</span>
      </h1>
      <div className="menu-container">
        <Link to="/" className="menu-link">
          <p className="menu-item">Home</p>
        </Link>
        <Link to="/about" className="menu-link">
          <p className="menu-item">About</p>
        </Link>
      </div>
    </div>
  )
}
