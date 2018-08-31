import React from "react"
import PropTypes from 'prop-types'
import { render } from "react-dom"
import { connect } from "react-redux"
// https://www.npmjs.com/package/react-rotary-knob
import { Knob } from "react-rotary-knob"
import * as skins from "react-rotary-knob-skin-pack"
import { changeDial } from "../actions/actions"
import { get } from "dot-prop-immutable"

class ConnectedDial extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.minValue = this.props.min === undefined ? 0 : this.props.min
    this.maxValue = this.props.max === undefined ? 100 : this.props.max
  }

  get knobStyle() {
    return {
      width: "50px",
      height: "50px"
    }
  }

  get dialValue() {
    return this.props.dialValue
  }

  get idName() {
    return `${this.props.parentName}-${this.props.name}`
  }

  handleChange(newValue) {
    this.props.changeDial({
      name: this.props.name,
      dialValue: newValue,
      parentName: this.props.parentName
    })
  }

  render() {
    return (
      <div id={this.idName} className="dial">
        <Knob
          style={this.knobStyle}
          skin={skins.s8}
          value={this.dialValue}
          onChange={this.handleChange}
          min={this.minValue}
          max={this.maxValue}
          step={0.5}
          unlockDistance={30}
        />
        <label className="dial-name">{this.props.displayName}</label>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const value = get(state, `${ownProps.parentName}.${ownProps.name}`)
  return { dialValue: value === undefined ? 0 : value }
}

const mapDispatchToProps = dispatch => {
  return {
    changeDial: dial => dispatch(changeDial(dial))
  }
}

ConnectedDial.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  parentName: PropTypes.string.isRequired
}

const Dial = connect(mapStateToProps, mapDispatchToProps)(ConnectedDial)

export default Dial

