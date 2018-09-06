import React from "react"
import SequencerRow from "./SequencerRow"
import Tone from 'tone'
import { Glyphicon, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { get } from "dot-prop-immutable"

import {
  playPause,
  triggerColumn,
  bpmUpdate,
  clearAllCells,
  globalMouseUp
} from "../actions/actions"

class ConnectedStepSequencer extends React.Component {
  constructor(props) {
    super(props)

    this.handleStartStop = this.handleStartStop.bind(this)
    this.handleBpmUpdate = this.handleBpmUpdate.bind(this)
    this.handleClearAllCells = this.handleClearAllCells.bind(this)

    this.rowLength = 32 // how many beats?
    this.rowsCount = 12 // 1 octave

    this.createSequence()
    this.initSpaceBarStartStop()
    this.initGlobalMouseListeners()
  }

  handleStartStop(event) {
    event.preventDefault()
    this.toggleStartStop()
  }

  toggleStartStop() {
    if (this.props.isPlaying) {
      Tone.Transport.stop();
      this.props.playPause({ isPlaying: false });
    } else {
      Tone.Transport.start('+0.25');
      this.props.playPause({ isPlaying: true });
    }
  }

  initSpaceBarStartStop() {
    document.body.onkeyup = (e) => {
      if (e.keyCode === 32){
        e.preventDefault()
        this.toggleStartStop()
      }
    }
  }

  initGlobalMouseListeners() {
    window.addEventListener("mouseup", (e) => {
      this.props.globalMouseUp()
    })
  }

  handleBpmUpdate(event) {
    event.preventDefault()
    this.props.bpmUpdate(event.target.value)
  }

  handleClearAllCells(event) {
    event.preventDefault()
    this.props.clearAllCells()
  }

  createSequence() {
    this.polySynth = new Tone.PolySynth(this.rowsCount, Tone.DuoSynth).toMaster()

    const steps = Array(this.rowLength).fill(1)

    this.tonePattern = new Tone.Pattern((time, value) => {
      this.props.triggerColumn(this.tonePattern.index)
    }, steps, 'up')

    this.tonePattern.playbackRate = 4
    this.tonePattern.start()
    //Tone.Transport.setLoopPoints(0, '2m')
    //Tone.Transport.bpm.value = this.props.bpm
    //Tone.Transport.scheduleRepeat(this.positionMarker, '16n')
  }

  playPauseButton() {
    let names = ["btn-play-pause", "btn"]
    let btnDisplayName = ""

    if (this.props.isPlaying) {
      names.push("stop btn-secondary")
      btnDisplayName = "Pause"
    } else {
      names.push("play btn-primary")
      btnDisplayName = "Play"
    }

    return (
      <Button onClick={this.handleStartStop} className={names.join(" ")}>
        <Glyphicon glyph={btnDisplayName.toLowerCase()} /> {btnDisplayName}
      </Button>
    )
  }

  render() {
    const rows = []

    for (var i = 0; i < this.rowsCount; i++) {
      rows.push(<SequencerRow key={i} rowNum={i} rowLength={this.rowLength} />)
    }

    return (
      <div className="row" id="step-sequencer">
        <div className="col-md-10">
          {rows}
        </div>
        <div className="col-md-2">
          <form>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="bpmInput">BPM</label>
              <div className="col-sm-9">
                <input className="form-control" id="bpmInput" onChange={this.handleBpmUpdate} type="text" value={this.props.bpm} />
              </div>
            </div>
            <div className="clearCells row">
              <button onClick={this.handleClearAllCells} className="btn-clear-all btn btn-warning">
                Clear All
              </button>
            </div>
            <div className="playPause row">
              {this.playPauseButton()}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return({
    isPlaying: (!!get(state, "sequencer.isPlaying")),
    bpm: get(state, "sequencer.bpm")
  })
}

const mapDispatchToProps = dispatch => {
  return {
    playPause: props => dispatch(playPause(props)),
    triggerColumn: columnIndex => dispatch(triggerColumn(columnIndex)),
    bpmUpdate: val => dispatch(bpmUpdate(val)),
    clearAllCells: _ => dispatch(clearAllCells()),
    globalMouseUp: _ => dispatch(globalMouseUp())
  }
}

const StepSequencer = connect(mapStateToProps, mapDispatchToProps)(ConnectedStepSequencer)

export default StepSequencer
