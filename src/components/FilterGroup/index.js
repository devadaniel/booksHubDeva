import './index.css'

const FilterGroup = props => {
  const {filterItemDetails, isActive, onClickedFilter} = props
  const {label, value} = filterItemDetails
  const activeTabClassName = isActive ? 'tab-active' : ''

  const onClickTabItem = () => {
    onClickedFilter(value, label)
  }

  return (
    <>
      <li className="filter-item">
        <div className="filter-items-container">
          <button
            className={`filter-button-item ${activeTabClassName}`}
            type="button"
            onClick={onClickTabItem}
          >
            {label}
          </button>
        </div>
      </li>
    </>
  )
}

export default FilterGroup
