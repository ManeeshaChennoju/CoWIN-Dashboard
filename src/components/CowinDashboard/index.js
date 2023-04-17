import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const appLogoUrl = 'https://assets.ccbp.in/frontend/react-js/cowin-logo.png'

const apiStatusViews = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {covidVaccineData: {}, apiStatus: apiStatusViews.initial}

  componentDidMount() {
    this.getCovidVaccineData()
  }

  getCovidVaccineData = async () => {
    this.setState({apiStatus: apiStatusViews.in_progress})
    const apiUrl = `https://apis.ccbp.in/covid-vaccination-data`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data, '-----api_data-------------')
    if (response.ok === true) {
      const updatedData = {
        last7daysVaccination: data.last_7_days_vaccination.map(item => ({
          vaccineDate: item.vaccine_date,
          dose1: item.dose_1,
          dose2: item.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({
        covidVaccineData: updatedData,
        apiStatus: apiStatusViews.success,
      })
    } else {
      this.setState({apiStatus: apiStatusViews.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure_view_container" width="80%">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        width={600}
      />
      <h1 className="failure_heading">Something went wrong</h1>
    </div>
  )

  renderCovidVaccineDetails = () => {
    const {covidVaccineData} = this.state
    const {
      last7daysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = covidVaccineData

    return (
      <>
        <VaccinationCoverage data={last7daysVaccination} />
        <VaccinationByGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </>
    )
  }

  renderCoWinComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusViews.in_progress:
        return this.renderLoadingView()
      case apiStatusViews.success:
        return this.renderCovidVaccineDetails()
      case apiStatusViews.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin_dashboard_container">
        <div className="responsive_container">
          <div className="app_logo_container">
            <img
              className="logo_app_image"
              src={appLogoUrl}
              alt="website logo"
            />
            <p className="app_name">Co-WIN</p>
          </div>
          <h1 className="main_heading">CoWIN Vaccination in India</h1>
          {this.renderCoWinComponent()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
