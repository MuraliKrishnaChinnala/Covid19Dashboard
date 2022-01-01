import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dzvuzkc62/image/upload/v1640935162/Group_7484_wnwfe2.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-description">
      we’re sorry, the page you requested could not be found
      <br />
      Please go back to the homepage
    </p>
    <Link to="/" className="not-found-link">
      <button className="home-button" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
