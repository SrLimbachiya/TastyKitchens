import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import CartContext from './context/CartContext'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import PaymentSuccess from './components/PaymentSuccess'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    activePage: 'HOME',
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cartData'))
    if (cartItems === null) {
      this.setState({cartList: []})
    } else {
      this.setState({cartList: cartItems})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []}, this.setToLocalStorage)
  }

  incrementCartItemQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }),
      this.setToLocalStorage,
    )
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity - 1
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return eachCartItem
          }),
        }),
        this.setToLocalStorage,
      )
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList}, this.setToLocalStorage)
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (productObject) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (productObject.id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity + 1

              return {...eachCartItem, quantity: updatedQuantity}
            }

            return eachCartItem
          }),
        }),
        this.setToLocalStorage,
      )
    } else {
      const updatedProduct = {...product, quantity: 1}
      const updatedCartList = [...cartList, updatedProduct]
      this.setState({cartList: updatedCartList}, this.setToLocalStorage)
    }
  }

  toActivePage = clickedPage => {
    this.setState({activePage: clickedPage})
  }

  setToLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  render() {
    const {cartList, activePage} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          activePage,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          changeActivePage: this.toActivePage,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute path="/cart" component={Cart} />
          <ProtectedRoute
            path="/payment_successful"
            component={PaymentSuccess}
          />
          <ProtectedRoute path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
