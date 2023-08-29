import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import FooterSection from '../FooterSection'
import './index.css'

const apiStatusConstance = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: apiStatusConstance.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstance.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const bookDetailApiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(bookDetailApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.book_details.id,
        title: data.book_details.title,
        readStatus: data.book_details.read_status,
        rating: data.book_details.rating,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        aboutBook: data.book_details.about_book,
        aboutAuthor: data.book_details.about_author,
      }
      this.setState({
        bookDetails: updatedData,
        apiStatus: apiStatusConstance.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstance.failure})
    }
  }

  onClickRetry = () => {
    this.getBookDetails()
  }

  renderFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        src="https://res.cloudinary.com/ds9bayvoj/image/upload/v1693032555/Group_7522Home_failure_image_qjrnkr.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-heading">Something Went wrong. Please try again.</p>
      <button className="failure-btn" onClick={this.onClickRetry} type="button">
        Try Again
      </button>
    </div>
  )

  renderBooksProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={32} width={32} />
    </div>
  )

  renderBookDetailsSuccessView = () => {
    const {bookDetails} = this.state
    const {
      coverPic,
      title,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetails
    return (
      <div className="books-details-bg-container">
        <div className="books-details-card-container">
          <div>
            <div className="book-details-container">
              <img src={coverPic} alt={title} className="cover-pic" />
              <div className="book-details">
                <h1 className="book-heading">{title}</h1>
                <p className="book-author">{authorName}</p>
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
          </div>
          <hr />
          <div className="book-details-about-author-book-container">
            <h1 className="author-heading">About Author</h1>
            <p className="author-description">{aboutAuthor}</p>
          </div>
          <h1 className="about-book-heading">About Book</h1>
          <p className="about-book-description">{aboutBook}</p>
        </div>
        <FooterSection />
      </div>
    )
  }

  renderBookDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstance.success:
        return this.renderBookDetailsSuccessView()
      case apiStatusConstance.failure:
        return this.renderFailureView()
      case apiStatusConstance.inProgress:
        return this.renderBooksProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderBookDetailsView()}
      </>
    )
  }
}

export default BookItemDetails
