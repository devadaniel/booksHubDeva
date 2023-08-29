import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {coverPic, title, authorName, rating, readStatus, id} = bookDetails
  return (
    <Link to={`/books/${id}`} className="books-nav-link">
      <li className="book-list-item-container">
        <div className="each-book-details-container">
          <img src={coverPic} alt={title} className="cover-pic-image" />
          <div className="book-item-details">
            <h1 className="book-item-heading">{title}</h1>
            <p className="book-item-author">{authorName}</p>
            <div className="avg-rating-star-icon-container">
              <p className="avg-rating">Avg Rating</p>
              <BsFillStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
            <p className="status">
              Status: <span className="status-text">{readStatus}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
