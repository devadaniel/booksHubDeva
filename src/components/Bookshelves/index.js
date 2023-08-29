import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
import BookItem from '../BookItem'
import FooterSection from '../FooterSection'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstance = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    activeFilter: bookshelvesList[0].value,
    activeFilterLabel: bookshelvesList[0].label,
    booksData: {},
    apiStatus: apiStatusConstance.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getBooksData()
  }

  updatedBooksList = booksList =>
    booksList.map(eachBook => ({
      id: eachBook.id,
      title: eachBook.title,
      readStatus: eachBook.read_status,
      rating: eachBook.rating,
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
    }))

  getBooksData = async () => {
    this.setState({
      apiStatus: apiStatusConstance.inProgress,
    })
    const {activeFilter, searchInput} = this.state
    const booksApi = `https://apis.ccbp.in/book-hub/books?shelf=${activeFilter}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(booksApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        books: this.updatedBooksList(fetchedData.books),
        total: fetchedData.total,
      }
      this.setState({
        booksData: updatedData,
        apiStatus: apiStatusConstance.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstance.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.getBooksData()
    }
  }

  onClickSearch = () => {
    this.getBooksData()
  }

  onClickedFilter = (value, label) => {
    this.setState(
      {activeFilter: value, activeFilterLabel: label},
      this.getBooksData,
    )
  }

  onClickRetry = () => {
    this.getBooksData()
  }

  renderBooksSuccessView = () => {
    const {booksData, searchInput} = this.state
    const books = booksData.books.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <ul className="bookList-container">
        {books.map(eachBook => (
          <BookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    )
  }

  renderNotMatchBooksView = () => {
    const {searchInput} = this.state
    return (
      <div className="top-rated-books-failure-container">
        <img
          className="failure-image"
          src="https://res.cloudinary.com/ds9bayvoj/image/upload/v1693111228/Groupnot-match-serach-input-image_j6jjwr.png"
          alt="no books"
        />
        <p className="failure-heading">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderBooksListSuccessView = () => {
    const {booksData} = this.state
    const {total} = booksData
    if (total !== 0) {
      return this.renderBooksSuccessView()
    }
    return this.renderNotMatchBooksView()
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

  renderBooksData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstance.success:
        return this.renderBooksListSuccessView()
      case apiStatusConstance.failure:
        return this.renderFailureView()
      case apiStatusConstance.inProgress:
        return this.renderBooksProgressView()
      default:
        return null
    }
  }

  render() {
    const {activeFilter, activeFilterLabel, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="bookshelves-bg-container">
          <div className="filter-and-all-books-container">
            <div className="bookshelves-filter-container">
              <h1 className="filter-heading">Bookshelves</h1>
              <div className="sm-input-container">
                <input
                  type="search"
                  className="input-search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onKeyDownSearchInput}
                />
                <button
                  className="search-btn"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onClickSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <div className="filter-items-list-items">
                {bookshelvesList.map(eachItem => (
                  <FilterGroup
                    filterItemDetails={eachItem}
                    onClickedFilter={this.onClickedFilter}
                    isActive={activeFilter === eachItem.value}
                  />
                ))}
              </div>
            </div>
            <div className="all-bookshelves-container">
              <div className="search-books-and-books-status-heading">
                <h1 className="status-heading">{activeFilterLabel} Books</h1>
                <input
                  type="search"
                  className="input-search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onKeyDownSearchInput}
                />
                <button
                  className="search-btn"
                  type="button"
                  testid="searchButton"
                  onClick={this.onClickSearch}
                >
                  <BsSearch className="search=icon" />
                </button>
              </div>
              {this.renderBooksData()}
            </div>
          </div>
          <FooterSection />
        </div>
      </>
    )
  }
}

export default BookShelves
