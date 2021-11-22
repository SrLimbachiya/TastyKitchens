import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-main">
      <div className="footer-inner">
        <div className="footer-name-img">
          <img
            className="footer-img"
            src="https://res.cloudinary.com/srlimbachiya/image/upload/v1636200675/KitchensApp/Vector_1_fmyden.png"
            alt="website-footer-logo"
          />
          <h1 className="footer-title">Tasty Kitchens</h1>
        </div>
        <p className="footer-des">
          The only thing we are serious about is food. Contact us on
        </p>
        <div className="footer-icons">
          <FaPinterestSquare testid="pintrest-social-icon" size="35px" />
          <FaInstagram testid="instagram-social-icon" size="35px" />
          <FaTwitter testid="twitter-social-icon" size="35px" />
          <FaFacebookSquare testid="facebook-social-icon" size="35px" />
        </div>
      </div>
    </div>
  )
}
