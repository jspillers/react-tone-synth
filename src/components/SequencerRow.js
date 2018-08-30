import React from "react"
import SequencerCell from "./SequencerCell"

class SequencerRow extends React.Component {

  rowNumToNote(i) {
    return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].reverse()[i]
  }

  render() {
    const cells = []

    for (var i = 0; i < this.props.rowLength; i++) {
      const cellId = `${this.props.rowNum}-${i}`
      cells.push(
        <SequencerCell
          key={cellId}
          cellId={cellId}
          rowNum={this.props.rowNum}
          cellNum={i}
          octave={4}
          note={this.rowNumToNote(this.props.rowNum)}
        />
      )
    }

    return (
      <div className="row sequencerRows">
        {cells}
      </div>
    )
  }
}

export default SequencerRow
