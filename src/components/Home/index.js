import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import {ImSortAlphaAsc, ImSortAlphaDesc} from 'react-icons/im'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {covidCasesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCovidCasesList()
  }

  getCovidCasesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const resultList = []
      // getting keys of an object object
      const keyNames = Object.keys(data)

      keyNames.forEach(keyName => {
        // console.log(keyName)
        if (data[keyName]) {
          const {total} = data[keyName]
          // if the state's covid data is available we will store it or we will store 0
          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = data[keyName].meta.population
            ? data[keyName].meta.population
            : 0
          resultList.push({
            stateCode: keyName,
            name: statesList.find(state => state.state_code === keyName)
              .state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      console.log(resultList)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="home-loader-container">
      <Loader type="TailSpin" color=" #007BFF" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="home-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="error"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button className="retry-button" type="button">
        Retry
      </button>
    </div>
  )

  renderCovidCasesListView = () => {
    const {covidCasesList} = this.state

    console.log(covidCasesList)
  }

  renderCovidCases = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderCovidCasesListView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="home-body-container">
          <div className="search-container">
            <AiOutlineSearch className="search-icon" />
            <input
              type="search"
              className="search-bar"
              placeholder="Enter the State"
            />
          </div>
          <div className="total-cases-container">
            <div className="card">
              <p className="card-title">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dzvuzkc62/image/upload/v1640945101/check-mark_1_lsekp3.png"
                alt="confirmed"
                className="card-icon"
              />
              <p className="card-description">12345678</p>
            </div>
            <div className="card">
              <p className="card-title active">Active</p>
              <img
                src="https://res.cloudinary.com/dzvuzkc62/image/upload/v1640945106/protection_1_y6m5xf.png"
                alt="Active"
                className="card-icon"
              />
              <p className="card-description active">12345678</p>
            </div>
            <div className="card">
              <p className="card-title recovered">Recovered</p>
              <img
                src="https://res.cloudinary.com/dzvuzkc62/image/upload/v1640945113/recovered_1_po78ny.png"
                alt="Recovered"
                className="card-icon"
              />
              <p className="card-description recovered">12345678</p>
            </div>
            <div className="card">
              <p className="card-title deceased">Deceased</p>
              <img
                src="https://res.cloudinary.com/dzvuzkc62/image/upload/v1640945119/breathing_1_nfj23l.png"
                alt="Deceased"
                className="card-icon"
              />
              <p className="card-description deceased">12345678</p>
            </div>
          </div>
        </div>
        <div className="table-container">
          <div className="table-headings-container">
            <div className="table-side-heading">
              <p className="table-heading">States/UT</p>
              <ImSortAlphaAsc className="filter-icon" />
              <ImSortAlphaDesc className="filter-icon" />
            </div>
            <p className="table-heading">Confirmed</p>
            <p className="table-heading">Active</p>
            <p className="table-heading">Recovered</p>
            <p className="table-heading">Deceased</p>
            <p className="table-heading">Population</p>
          </div>
          {this.renderCovidCases()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
