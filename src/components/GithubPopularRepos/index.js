import {Component} from 'react'

import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItemfrom from '../RepositoryItem'

import './index.css'

const apiStatusConstents = {
  initial: 'INITAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstents.initial,
    activeTabId: languageFiltersData[0].id,
    repositoriesData: [],
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeTabId} = this.state
    this.setState({
      apiStatus: apiStatusConstents.inProgress,
    })
    console.log(activeTabId)
    const apiUrl = `https://apis.ccbp.in/popular-repos?lanugage=${activeTabId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstents.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstents.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loading">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="cross"
        className="failure-img"
      />
      <h1>Something went wrong try again</h1>
    </div>
  )

  renderRepositiriesListView = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="list-items">
        {repositoriesData.map(each => (
          <RepositoryItemfrom repositoryDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstents.success:
        return this.renderRepositiriesListView()
      case apiStatusConstents.failure:
        return this.renderFailureView()
      case apiStatusConstents.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveTabId = newFilteredId =>
    this.setState({activeTabId: newFilteredId}, this.getRepositories)

  renderLanguageFilteredList = () => {
    const {activeTabId} = this.state
    return (
      <ul className="lan-div">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            languageDetails={each}
            isActive={each.id === activeTabId}
            setActiveTabId={this.setActiveTabId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-cont">
        <div className="responsive-cont">
          <h1 className="head">popular</h1>
          {this.renderLanguageFilteredList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
