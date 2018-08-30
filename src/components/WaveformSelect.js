import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import { changeWaveform } from "../actions/actions"
import { get } from "dot-prop-immutable"

class ConnectedWaveformSelect extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  get idName() {
    return `${this.props.parentName}-${this.props.name}`
  }

  handleChange(values) {
    this.props.changeWaveform({
      name: this.props.name,
      selectValue: values[1],
      parentName: this.props.parentName
    })
  }

  render() {
    return(
      <div id={this.idName} className="waveform-select">
        <ToggleButtonGroup
          type="checkbox"
          value={this.props.selectValue}
          onChange={this.handleChange}
        >
          <ToggleButton value={"sine"}>Sine</ToggleButton>
          <ToggleButton value={"sawtooth"}>Sawtooth</ToggleButton>
          <ToggleButton value={"triangle"}>Triangle</ToggleButton>
          <ToggleButton value={"square"}>Square</ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectProps = get(state, `${ownProps.parentName}.selects.${ownProps.name}`)

  if (selectProps === undefined) {
    return { selectValue: 0 }
  } else {
    return { selectValue: selectProps.selectValue }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeWaveform: select => dispatch(changeWaveform(select))
  }
}

const WaveformSelect = connect(mapStateToProps, mapDispatchToProps)(ConnectedWaveformSelect)

export default WaveformSelect
