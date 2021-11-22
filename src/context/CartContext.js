import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  activePage: 'HOME',
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  changeActivePage: () => {},
})

export default CartContext
