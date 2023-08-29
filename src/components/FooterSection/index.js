import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const FooterSection = () => (
  <div className="footer-container">
    <div>
      <FaGoogle className="icons" />
      <FaTwitter className="icons" />
      <FaInstagram className="icons" />
      <FaYoutube className="icons" />
    </div>
    <p className="contact-us-heading">Contact us</p>
  </div>
)

export default FooterSection
