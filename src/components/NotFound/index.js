impot {Link} from "react-router-dom"
import './index.css'
 
const NotFound = () => (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/ds9bayvoj/image/upload/v1693307106/Group_7484page_not_found_twdptt.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="page-not-found">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button
          className="not-found-button"
          type="button"
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  )

export default NotFound
