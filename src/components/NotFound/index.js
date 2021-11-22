import {Link} from 'react-router-dom'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const NotFound = () => (
  <CartContext.Consumer>
    {value => {
      const {changeActivePage} = value
      const onGoHome = () => {
        changeActivePage('HOME')
      }
      return (
        <>
          <Header />
          <div className="not-found">
            <img
              className="not-found-img"
              src="https://res.cloudinary.com/srlimbachiya/image/upload/v1635956984/KitchensApp/erroring_1_ydktpd.png"
              alt="not found"
            />
            <h1 className="not-found-title">Page Not Found</h1>
            <p className="not-found-para">
              we are sorry, the page you requested could not be found Please go
              back to the homepage
            </p>
            <Link onClick={onGoHome} to="/">
              <button className="not-found-btn" type="button">
                Home Page
              </button>
            </Link>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default NotFound
