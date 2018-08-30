import React from "react"
import { connect } from "react-redux"
import { setSequencerCell } from "../actions/actions"
import { get } from "dot-prop-immutable"

class ConnectedSequencerCell extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
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

  handleClick(e) {
    this.toggleCell()
  }

  handleMouseOver(e) {
    if (e.buttons == 1 || e.buttons == 3) {
      this.toggleCell()
    }
  }

  toggleCell() {
    this.setCell(!this.props.isActive) // invert current state
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
      <button onMouseOver={this.handleMouseOver} onClick={this.handleClick} className={this.classNames()}></button>
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
    setSequencerCell: cellProps => dispatch(setSequencerCell(cellProps))
  }
}

const SequencerCell = connect(mapStateToProps, mapDispatchToProps)(ConnectedSequencerCell)

export default SequencerCell
