import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, setActiveTabId, isActive} = props
  const {id, language} = languageDetails
  const activeButton = isActive ? 'buttons active' : 'buttons'
  const languageSelected = () => {
    setActiveTabId(id)
  }
  return (
    <div className="button-div">
      <button type="button" className={activeButton} onClick={languageSelected}>
        {language}
      </button>
    </div>
  )
}

export default LanguageFilterItem
