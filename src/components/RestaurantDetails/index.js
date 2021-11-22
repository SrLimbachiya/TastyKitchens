import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const apiReqStatus = {
  init: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILED',
}

class RestaurantDetails extends Component {
  state = {restrData: [], foodItems: [], apiStatus: apiReqStatus.init}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiReqStatus.loading})
    const {match} = this.props
    const {params} = match
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${params.id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const ooRest = [data]
    const dataObj = Object.assign({}, ...ooRest)

    const updatedData = await {
      costForTwo: dataObj.cost_for_two,
      cuisine: dataObj.cuisine,
      id: dataObj.id,
      imageUrl: dataObj.image_url,
      location: dataObj.location,
      name: dataObj.name,
      opensAt: dataObj.opens_at,
      foodItems: dataObj.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
        quantity: 0,
      })),
      itemsCount: dataObj.items_count,
      rating: dataObj.rating,
      reviewsCount: dataObj.reviews_count,
    }

    this.setState({
      restrData: updatedData,
      foodItems: updatedData.foodItems,
      apiStatus: apiReqStatus.success,
    })
  }

  reviewFormat = revs => {
    let reviewValues = ''
    if (revs < 100) {
      reviewValues = `${revs} Reviews`
    } else if (revs > 100 && revs < 200) {
      reviewValues = '100+ Reviews'
    } else if (revs > 200 && revs < 300) {
      reviewValues = '200+ Reviews'
    } else if (revs > 300 && revs < 400) {
      reviewValues = '300+ Reviews'
    } else if (revs > 400 && revs < 500) {
      reviewValues = '400+ Reviews'
    } else if (revs > 500 && revs < 600) {
      reviewValues = '500+ Reviews'
    } else if (revs > 600 && revs < 700) {
      reviewValues = '600+ Reviews'
    } else if (revs > 700 && revs < 800) {
      reviewValues = '700+ Reviews'
    } else if (revs > 800 && revs < 900) {
      reviewValues = '800+ Reviews'
    } else if (revs > 900 && revs < 1000) {
      reviewValues = '900+ Reviews'
    } else if (revs > 1000) {
      reviewValues = '1000+ Reviews'
    }
    return reviewValues
  }

  renderRestroDetailLoader = () => (
    <div testid="restaurant-details-loader" className="rest-spinner-loader">
      <Loader type="TailSpin" color="#f7931e" height={100} width={100} />
    </div>
  )

  renderResPageData = () => {
    const {restrData, foodItems} = this.state
    return (
      <div>
        <div className="restr-name-banner">
          <img
            alt="restaurant"
            src={restrData.imageUrl}
            className="banner-img"
          />
          <div className="res-details-main">
            <h1 className="res-detail-name">{restrData.name}</h1>
            <p className="res-detail-cuisine">{restrData.cuisine}</p>
            <p className="res-detail-location">{restrData.location}</p>
            <div className="rating-cost-review">
              <div className="rating-star-text">
                <div className="res-detail-rating">
                  <AiFillStar />
                  <p className="res-detail-rating-text">{restrData.rating}</p>
                </div>
                <p className="res-detail-review-count">
                  {this.reviewFormat(restrData.reviewsCount)}
                </p>
              </div>
              <div className="vertical-line"> </div>
              <div>
                <p className="res-detail-cost-num">
                  &#8377;{` ${restrData.costForTwo}`}
                </p>
                <p className="res-details-cost-text">Cost For Two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-item-container">
          {foodItems.map(each => (
            <FoodItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderRestDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiReqStatus.loading:
        return this.renderRestroDetailLoader()
      case apiReqStatus.success:
        return this.renderResPageData()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderRestDetails()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
