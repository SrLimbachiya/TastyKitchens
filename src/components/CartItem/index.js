import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {details} = props
      const onPlus = () => {
        incrementCartItemQuantity(details.id)
      }

      const onMinus = () => {
        decrementCartItemQuantity(details.id)
      }

      return (
        <li>
          <div testid="cartItem" className="cart-item">
            <div className="cart-img-name">
              <img
                className="cart-item-img"
                src={details.imageUrl}
                alt="cart-img"
              />
              <h1 className="cart-item-name">{details.name}</h1>
            </div>
            <div className="cart-item-qty">
              <div className="qtyadder">
                <button
                  testid="decrement-quantity"
                  onClick={onMinus}
                  type="button"
                >
                  -
                </button>
                <p testid="item-quantity" className="order-qty">
                  {details.quantity}
                </p>
                <button
                  testid="increment-quantity"
                  onClick={onPlus}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-item-cost">
              <p testid="total-price"> &#8377;{` ${details.cost}.00`}</p>
            </div>
          </div>

          <div testid="cartItem" className="cart-item-sm">
            <div className="cart-img-name">
              <img
                className="cart-item-img"
                src={details.imageUrl}
                alt="cart-img"
              />
            </div>
            <div className="cart-item-qty-sm">
              <h1 className="cart-item-name">{details.name}</h1>
              <div className="qtyadder">
                <button
                  testid="decrement-quantity"
                  onClick={onMinus}
                  type="button"
                >
                  -
                </button>
                <p testid="item-quantity" className="order-qty">
                  {details.quantity}
                </p>
                <button
                  testid="increment-quantity"
                  onClick={onPlus}
                  type="button"
                >
                  +
                </button>
              </div>
              <div className="cart-item-cost-sm">
                <p testid="total-price"> &#8377;{` ${details.cost}.00`}</p>
              </div>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
