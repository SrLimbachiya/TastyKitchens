import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantItem = props => {
  const {details} = props
  const {imageUrl, name, cuisine, userRating, id} = details
  const {rating, totalReviews} = userRating
  return (
    <Link
      to={`/restaurant/${id}`}
      testid="restaurant-item"
      className="rest-list-item"
    >
      <li className="resItem" testid="restaurant-item">
        <img className="resImg" src={imageUrl} alt="restaurant" />
        <div className="name-rating-container">
          <h1 className="res-name">{name}</h1>
          <p className="res-cuisine">{cuisine}</p>
          <div className="ratings">
            <AiFillStar color="#FFCC00" size="20px" />
            <p className="rating-num">{rating}</p>
            <p className="rating-reviews">{`(${totalReviews} rating)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
