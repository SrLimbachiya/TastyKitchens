import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseCircleFill} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {activePage, changeActivePage} = value
      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onHome = () => {
        changeActivePage('HOME')
      }

      const onCart = () => {
        changeActivePage('CART')
      }

      const renderPopup = () => (
        <Popup
          trigger={
            <button className="mdl-close-btn" type="button">
              <GiHamburgerMenu size="25px" />
            </button>
          }
          modal
          className="popup-content"
          closeOnDocumentClick
        >
          {close => (
            <div className="modal">
              <div className="header-main-mdl">
                <div className="website-logo-h-mdl">
                  <div className="modal-web-logo">
                    <img
                      className="web-logo-h"
                      src="https://res.cloudinary.com/srlimbachiya/image/upload/v1635506555/KitchensApp/Frame_274_iokomb.png"
                      alt="website logo"
                    />
                    <h1 className="website-name">Tasty Kitchens</h1>
                  </div>
                  <button
                    className="mdl-close-btn"
                    type="button"
                    onClick={close}
                  >
                    <GiHamburgerMenu size="25px" />
                  </button>
                </div>
                <div className="mdl-nav-close-btn">
                  <ul className="header-link-ul-sm">
                    <li>
                      <Link
                        onClick={onHome}
                        className={
                          activePage === 'HOME'
                            ? 'links-mdl activePage'
                            : 'links-mdl'
                        }
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={onCart}
                        className={
                          activePage === 'CART'
                            ? 'links-mdl activePage'
                            : 'links-mdl'
                        }
                        to="/cart"
                      >
                        Cart
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={onLogout}
                        className="logout-btn"
                        type="button"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                  <button
                    className="mdl-close-btn"
                    type="button"
                    onClick={close}
                  >
                    <RiCloseCircleFill size="30px" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Popup>
      )

      return (
        <div className="header-main">
          <Link className="website-logo-h" to="/" onClick={onHome}>
            <img
              className="web-logo-h"
              src="https://res.cloudinary.com/srlimbachiya/image/upload/v1635506555/KitchensApp/Frame_274_iokomb.png"
              alt="website logo"
            />
            <h1 className="website-name-hdr">Tasty Kitchens</h1>
          </Link>
          <ul className="header-link-ul">
            <li>
              <Link
                onClick={onHome}
                className={activePage === 'HOME' ? 'links activePage' : 'links'}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={onCart}
                className={activePage === 'CART' ? 'links activePage' : 'links'}
                to="/cart"
              >
                Cart
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="logout-btn" type="button">
                Logout
              </button>
            </li>
          </ul>
          <div className="ham-menus">{renderPopup()}</div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
