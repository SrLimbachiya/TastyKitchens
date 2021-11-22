import {Link} from 'react-router-dom'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const PaymentSuccess = () => (
  <CartContext.Consumer>
    {value => {
      const {changeActivePage} = value
      const toHome = () => {
        changeActivePage('HOME')
      }

      return (
        <div>
          <Header />
          <div className="payment-container">
            <img
              src="https://res.cloudinary.com/srlimbachiya/image/upload/v1635873544/KitchensApp/Vector_mpljpg.png"
              alt="payment_successful"
            />
            <h1 className="payment-success-text">Payment Successful</h1>
            <p className="payment-success-des">
              Thank you for ordering Your payment is successfully completed.
            </p>
            <Link onClick={toHome} to="/">
              <button className="go-home-btn" type="button">
                Go To Home Page
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentSuccess
