import {AiFillStar} from 'react-icons/ai'

import CartContext from '../../context/CartContext'
import './index.css'

const FoodItem = props => {
  const {details} = props

  const renderRestDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          cartList,
        } = value

        const onAdd = () => {
          addCartItem(details)
        }

        const onPlus = () => {
          incrementCartItemQuantity(details.id)
        }

        const onMinus = () => {
          decrementCartItemQuantity(details.id)
        }

        const renderBtns = () => {
          const IsInListCheck = () => {
            try {
              return cartList.some(each => each.id === details.id)
            } catch {
              return false
            }
          }

          const inCart = cartList.filter(each => each.id === details.id)[0]

          /* const mainObj = inCart */

          /* const newItem = Object.assign({}, ...inCart()) */

          let itmQty
          if (inCart !== undefined) {
            itmQty = inCart.quantity
          }

          if (IsInListCheck()) {
            return (
              <div className="qtyadder">
                <button
                  testid="decrement-count"
                  onClick={onMinus}
                  type="button"
                >
                  -
                </button>
                <p testid="active-count" className="order-qty">
                  {itmQty}
                </p>
                <button testid="increment-count" onClick={onPlus} type="button">
                  +
                </button>
              </div>
            )
          }
          return (
            <button className="food-add-btn" onClick={onAdd} type="button">
              Add
            </button>
          )
        }

        return (
          <li testid="foodItem" className="food-item-main">
            <img className="food-img" src={details.imageUrl} alt="food-img" />
            <div className="food-name-rating-btn">
              <h1 className="food-name">{details.name}</h1>
              <p className="food-cost">
                <span className="rupee">&#8377;</span>
                {details.cost}
              </p>
              <div className="ratings">
                <AiFillStar color="#FFCC00" size="20px" />
                <p className="rating-num">{details.rating}</p>
              </div>
              {renderBtns()}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  return renderRestDetails()
}

export default FoodItem
