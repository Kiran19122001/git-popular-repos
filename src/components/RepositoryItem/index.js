import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    forksCount,
    issuesCount,
    name,
    starsCount,
  } = repositoryDetails

  return (
    <li className="item-cont">
      <img src={avatarUrl} alt="cross" className="logo" />
      <h2>{name}</h2>
      <div className="icon-conts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="cross"
          className="icons"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="icon-conts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="cross"
          className="icons"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="icon-conts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="cross"
          className="icons"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
