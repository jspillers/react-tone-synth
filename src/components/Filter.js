import React from "react"
import PropTypes from 'prop-types'
import { DropdownButton, MenuItem } from "react-bootstrap"
import { render } from "react-dom"
import { connect } from "react-redux"
import { changeFilterType } from "../actions/actions"
import { get } from "dot-prop-immutable"
import Dial from "./Dial"

class ConnectedFilter extends React.Component {

  constructor(props) {
    super(props)
    this.handleFilterTypeSelect = this.handleFilterTypeSelect.bind(this)
  }

  handleFilterTypeSelect(val) {
    this.props.changeFilterType(val)
  }

  // capiltalize the filter type and concat it with the name
  filterDisplayName() {
    return this.props.filterType.charAt(0).toUpperCase() +
      this.props.filterType.slice(1) +
      " " +
      this.props.displayName
  }

  get filterTypeMenuItemNames() {
    return [
      "lowpass", "highpass", "bandpass", "lowshelf",
      "highshelf", "notch", "allpass", "peaking"
    ]
  }

  renderFilterTypeMenuItem(name, key) {
    return (
      <MenuItem key={key} eventKey={name} active={this.props.filterType === name}>{name}</MenuItem>
    )
  }

  render() {

    let menuItems = this.filterTypeMenuItemNames.map((itemName, i) => {
      return this.renderFilterTypeMenuItem(itemName, i)
    })

    return (
      <div id={this.props.name} className="synth-section filter">
        <h4>{this.filterDisplayName()}</h4>
        <div className="row">
          <div className="col-md-3 col-md-offset-1">
            <Dial
              name={"filterCutoff"}
              displayName={"Cutoff"}
              parentName={this.props.name}
              min={20}
              max={20000}
            />
          </div>
          <div className="col-md-3">
            <Dial
              name={"filterQ"}
              displayName={"Resonance"}
              parentName={this.props.name}
              min={0}
              max={20}
            />
          </div>
          <div className="col-md-3">
            <DropdownButton
              id={"filterType"}
              bsSize={"small"}
              bsStyle={"default"}
              title={"Type"}
              onSelect={this.handleFilterTypeSelect}
            >
              {menuItems}
            </DropdownButton>
          </div>
        </div>
      </div>
    )
  }
}

ConnectedFilter.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const _filterType = get(state, "filter.filterType")
  return { filterType: _filterType === undefined ? "lowpass" : _filterType}
}

const mapDispatchToProps = dispatch => {
  return {
    changeFilterType: filterType => dispatch(changeFilterType(filterType))
  }
}

const Filter = connect(mapStateToProps, mapDispatchToProps)(ConnectedFilter)

export default Filter
