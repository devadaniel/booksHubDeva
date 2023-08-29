import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from '../Header'
import FooterSection from '../FooterSection'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstance = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooks: [],
    apiStatus: apiStatusConstance.initial,
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({
      apiStatus: apiStatusConstance.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(eachItem => ({
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        id: eachItem.id,
        title: eachItem.title,
      }))
      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiStatusConstance.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstance.failure,
      })
    }
  }

  renderTopRatedBooks = () => {
    const {topRatedBooks} = this.state

    return (
      <div className="slide-container">
        <Slider {...settings}>
          {topRatedBooks.map(eachBook => {
            const {id, coverPic, title, authorName} = eachBook
            return (
              <div className="slick-item">
                <Link to={`/books/${id}`} className="slider-nav-link-books">
                  <img className="book-image" src={coverPic} alt={title} />
                  <h1 className="book-title">{title}</h1>
                  <p className="author-name">{authorName}</p>
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  onClickRetry = () => {
    this.getTopRatedBooks()
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

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSliderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstance.success:
        return this.renderTopRatedBooks()
      case apiStatusConstance.inProgress:
        return this.renderLoadingView()
      case apiStatusConstance.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="heading-description-container">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf">
              <button className="find-books-button" type="button">
                Find Books
              </button>
            </Link>
            <div className="top-rated-books-container">
              <div className="heading-button-container">
                <h1 className="top-rated-heading">Top Rated Books</h1>
                <Link to="/shelf">
                  <button className="find-books-lg-button" type="button">
                    Find Books
                  </button>
                </Link>
              </div>
              {this.renderSliderStatus()}
            </div>
          </div>
          <FooterSection />
        </div>
      </>
    )
  }
}

export default Home
