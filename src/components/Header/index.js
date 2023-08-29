import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <nav className="header-container">
      <div className="desktop-view-header-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/ds9bayvoj/image/upload/v1692948949/Group_7731BooKHubLogo_mumfwd.jpg"
            alt="website logo"
            className="header-logo-image"
          />
        </Link>
        <div className="large-container-home-products-cart-logout-btn-container">
          <ul className="menu-items">
            <Link to="/" className="nav-link-item">
              <li className="nav-items">Home</li>
            </Link>
            <Link to="/shelf" className="nav-link-item">
              <li className="nav-items">Bookshelves</li>
            </Link>
          </ul>
          <Link to="/login" className="nav-link-item">
            <button
              className="logout-btn"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </Link>
        </div>
        <div className="mobile-view-container">
          <Popup
            trigger={
              <button
                data-testid="hamburgerIconButton"
                type="button"
                className="menu-button"
              >
                <FiMenu className="menu-icon" />
              </button>
            }
            modal
            nested
            className="popup-content"
          >
            {close => (
              <div className="popup-container">
                <ul className="nav-items">
                  <Link to="/" className="nav-link-item">
                    <li className="items">Home</li>
                  </Link>
                  <Link to="/shelf" className="nav-link-item">
                    <li className="items">Bookshelves</li>
                  </Link>
                </ul>
                <button
                  className="logout-btn"
                  type="button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="close-icon-button"
                  data-testid="closeButton"
                  onClick={() => close()}
                >
                  <RiCloseCircleFill size="25" />
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
