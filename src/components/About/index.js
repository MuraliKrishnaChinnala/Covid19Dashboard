import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Faqs from '../Faqs'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {apiStatus: apiStatusConstants.initial, faqList: []}

  componentDidMount() {
    this.getFaqList()
  }

  getFaqList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.faq
      this.setState({
        faqList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="Oval" color=" #007BFF" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getFaqList()
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="error"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry()}
      >
        Retry
      </button>
    </div>
  )

  renderFaqList = () => {
    const {faqList} = this.state

    return (
      <ul className="faq-container">
        {faqList.map(eachFaq => (
          <Faqs key={eachFaq.qno} faqDetails={eachFaq} />
        ))}
      </ul>
    )
  }

  renderFaq = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFaqList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="about-body-container">
          <h1 className="about-heading">About</h1>
          <p className="about-update">Last updated on march 28th 2021.</p>
          <p className="about-side-heading">
            COVID-19 vaccines be ready for distribution
          </p>
          {this.renderFaq()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default About
