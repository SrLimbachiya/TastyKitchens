import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems, changeActivePage} = value
      const total = cartList.map(each => each.cost * each.quantity)
      const checkOut = () => {
        removeAllCartItems()
      }

      const toHome = () => {
        changeActivePage('HOME')
      }

      const renderEmptyCart = () => (
        <div className="empty-cart-container">
          <img
            alt="empty cart"
            className="empty-cart-img"
            src="https://res.cloudinary.com/srlimbachiya/image/upload/v1635875276/KitchensApp/cooking_1_cbvwyq.png"
          />
          <h1 className="empty-cart-title">No Order Yet!</h1>
          <p className="empty-cart-des">
            Your cart is empty. Add something from the menu.
          </p>
          <Link onClick={toHome} to="/">
            <button className="empty-cart-btn" type="button">
              Order Now
            </button>
          </Link>
        </div>
      )

      const renderCartItems = () => (
        <>
          <div className="cart-item-container">
            <ul className="cart-items">
              <li className="cart-titles">
                <p>Item</p> <p>Quantity</p>
                <p>Price</p>
              </li>
              {cartList.map(each => (
                <CartItem key={each.id} details={each} />
              ))}
              <hr className="hr-line" />
              <li className="total-amount">
                <h1 className="total-label">Order Total:</h1>
                <p testid="total-price" className="total-amount-rs">
                  &#8377; {total.reduce((a, b) => a + b, 0)}.00
                </p>
              </li>
              <li>
                <Link to="/payment_successful">
                  <button
                    onClick={checkOut}
                    className="checkout-btn"
                    type="button"
                  >
                    Place Order
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <Footer />
        </>
      )

      return (
        <div>
          <Header />
          {cartList.length > 0 ? renderCartItems() : renderEmptyCart()}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
