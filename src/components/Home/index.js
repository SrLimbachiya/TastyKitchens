import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {BsFilterLeft, BsChevronRight, BsChevronLeft} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'

import './index.css'

const settings = {
  dots: true,
  dotsClass: 'slick-dots',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: 'linear',
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiReqStatus = {
  init: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILED',
}

class Home extends Component {
  state = {
    offerData: [],
    restData: [],
    limit: 9,
    offset: 0,
    currentPage: 1,
    sortBy: 'Lowest',
    offerApiStatus: apiReqStatus.init,
    restApiStatus: apiReqStatus.init,
  }

  componentDidMount() {
    this.getOffers()
    this.getRestData()
  }

  getRestData = async () => {
    this.setState({restApiStatus: apiReqStatus.loading})
    const {offset, limit, sortBy} = this.state
    const myToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const gotData = data.restaurants
    const returnNewragin = obj => ({
      rating: obj.rating,
      ratingColor: obj.rating_color,
      ratingText: obj.rating_text,
      totalReviews: obj.total_reviews,
    })
    const updatedData = gotData.map(each => ({
      costForTwo: each.cost_for_two,
      cuisine: each.cuisine,
      groupByTime: each.group_by_time,
      hasOnlineDelivery: each.has_online_delivery,
      hasTableBooking: each.has_table_booking,
      id: each.id,
      imageUrl: each.image_url,
      isDeliveringNow: each.is_delivering_now,
      location: each.location,
      menuType: each.menu_type,
      name: each.name,
      opensAt: each.opens_at,
      userRating: returnNewragin(each.user_rating),
    }))
    this.setState({restData: updatedData, restApiStatus: apiReqStatus.success})
  }

  getOffers = async () => {
    this.setState({offerApiStatus: apiReqStatus.loading})
    const myToken = Cookies.get('jwt_token')
    const dataApi = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
    const response = await fetch(dataApi, options)
    if (response.ok === false) {
      console.log('ERROR!!')
    } else if (response.ok) {
      const data = await response.json()
      this.setState({
        offerData: data.offers,
        offerApiStatus: apiReqStatus.success,
      })
    }
  }

  nextPage = () => {
    const {offset, currentPage} = this.state
    if (currentPage < 4 && offset < 28) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
          offset: prevState.offset + 9,
        }),
        this.getRestData,
      )
    } else if (currentPage > 4) {
      this.setState({currentPage: 4})
    }
  }

  prevPage = () => {
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
          offset: prevState.offset - 9,
        }),
        this.getRestData,
      )
    } else if (currentPage < 2) {
      this.setState({currentPage: 1})
    }
  }

  renderOffer = () => {
    const {offerApiStatus, offerData} = this.state
    switch (offerApiStatus) {
      case apiReqStatus.loading:
        return this.renderOfferLoader()
      case apiReqStatus.success:
        return (
          <div className="offer-slider-container">
            <Slider {...settings}>
              {offerData.map(each => (
                <img
                  className="offer-imgs"
                  src={each.image_url}
                  key={each.id}
                  alt="offer"
                />
              ))}
            </Slider>
          </div>
        )
      default:
        return null
    }
  }

  renderOfferLoader = () => (
    <div testid="restaurants-offers-loader" className="offer-spinner-loader">
      <Loader type="TailSpin" color="#f7931e" height={100} width={100} />
    </div>
  )

  onSelectOption = e => {
    this.setState({sortBy: e.target.value}, this.getRestData)
  }

  renderRestrosList = () => {
    const {restData, currentPage, sortBy} = this.state
    return (
      <div className="restro-list-contianer">
        <h1>Popular Restaurants</h1>
        <div className="des-select-container">
          <p>
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="select-img">
            <BsFilterLeft size="25px" />
            <p className="sort-by-lable">Sort By</p>
            <select
              onChange={this.onSelectOption}
              value={sortBy}
              className="select-ele"
            >
              {sortByOptions.map(each => (
                <option
                  key={each.value}
                  value={each.value}
                  className="option-ele"
                >
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="hr-home" />
        <ul className="restaurant-container">
          {restData.map(each => (
            <RestaurantItem details={each} key={each.id} />
          ))}
        </ul>

        <div className="pagination">
          <div className="pagination-btn-active-page">
            <button
              testid="pagination-left-button"
              onClick={this.prevPage}
              type="button"
              className="page-btn"
            >
              <BsChevronLeft />
            </button>
            <p className="pagination-span">
              <span testid="active-page-number">{currentPage}</span> of 4
            </p>
            <button
              testid="pagination-right-button"
              onClick={this.nextPage}
              type="button"
              className="page-btn"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderRestros = () => {
    const {restApiStatus} = this.state
    switch (restApiStatus) {
      case apiReqStatus.loading:
        return this.renderRestroLoader()
      case apiReqStatus.success:
        return this.renderRestrosList()

      default:
        return null
    }
  }

  renderRestroLoader = () => (
    <div testid="restaurants-list-loader" className="rest-spinner-loader">
      <Loader type="TailSpin" color="#f7931e" height={100} width={100} />
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="home-main">
          {this.renderOffer()} {this.renderRestros()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
