import React from "react"
import { connect } from "react-redux"
import { get } from "dot-prop-immutable"

import {
  setSequencerCell,
  sequencerCellMouseDown,
  sequencerCellMouseUp,
  sequencerCellMouseOut
} from "../actions/actions"

class ConnectedSequencerCell extends React.Component {

  constructor(props) {
    super(props)

    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.setCell(false)
  }

  classNames() {
    const names = ["sequencer-cell"]

    if (this.props.isActive) {
      names.push("active")
    }

    if (this.props.isHighlighted) {
      names.push("highlighted")
    }

    if ((this.props.cellNum % 4) === 0) {
      names.push("downbeat")
    }

    return names.join(" ")
  }

  handleMouseDown(e) {
    e.preventDefault()
    this.props.sequencerCellMouseDown(this.mouseEventProps())
  }

  handleMouseUp(e) {
    e.preventDefault()
    this.props.sequencerCellMouseUp(this.mouseEventProps())
  }

  handleMouseOut(e) {
    this.props.sequencerCellMouseOut(this.mouseEventProps())
  }

  toggleCell() {
    this.setCell(!this.props.isActive) // invert current state
  }

  mouseEventProps() {
    return {
      rowNum: this.props.rowNum,
      cellNum: this.props.cellNum,
      isActive: this.props.isActive
    }
  }

  setCell(isActive = false) {
    this.props.setSequencerCell({
      rowNum: this.props.rowNum,
      cellNum: this.props.cellNum,
      note: this.props.note,
      octave: this.props.octave,
      isActive: isActive
    })
  }

  render() {
    return (
      <button
        onMouseOut={this.handleMouseOut}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
        className={this.classNames()}
      ></button>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const cellProps = get(state, `sequencer.sequencerRows.${ownProps.rowNum}.${ownProps.cellNum}`)

  if (cellProps === undefined) {
    return {
      isActive: false,
      isHighlighted: false
    }
  } else {
    return {
      isActive: cellProps.isActive,
      isHighlighted: cellProps.isHighlighted,
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sequencerCellMouseDown: props => (dispatch(sequencerCellMouseDown(props))),
    sequencerCellMouseUp: props => (dispatch(sequencerCellMouseUp(props))),
    sequencerCellMouseOut: props => (dispatch(sequencerCellMouseOut(props))),
    setSequencerCell: props => dispatch(setSequencerCell(props))
  }
}

const SequencerCell = connect(mapStateToProps, mapDispatchToProps)(ConnectedSequencerCell)

export default SequencerCell
