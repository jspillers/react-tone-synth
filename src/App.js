import React, { Component } from 'react';
import { connect } from "react-redux"
import MonoSynth from "./components/MonoSynth"
import DuoSynth from "./components/DuoSynth"
import AMSynth from "./components/AMSynth"
import FMSynth from "./components/FMSynth"
import MembraneSynth from "./components/MembraneSynth"
import MetalSynth from "./components/MetalSynth"
import NoiseSynth from "./components/NoiseSynth"
import PluckSynth from "./components/PluckSynth"
import StepSequencer from "./components/StepSequencer"
import { Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import { changeSynth } from "./actions/actions"
import { get } from "dot-prop-immutable"
import logo from './logo.svg';
import './App.css';

class ConnectedApp extends Component {

  constructor(props) {
    super(props)
    this.handleSynthSelectChange = this.handleSynthSelectChange.bind(this)
  }

  handleSynthSelectChange(vals) {
    this.props.changeSynth(vals[1])
  }

  synthTypes() {
    return [
      "DuoSynth",
      "MonoSynth",
      "AMSynth",
      "FMSynth",
      "MembraneSynth",
      "MetalSynth",
      "NoiseSynth",
      "PluckSynth"
    ]
  }

  synthToggleButtons() {
    return this.synthTypes().map((type) => {
      return(<ToggleButton key={type} value={type}>{type}</ToggleButton>)
    })
  }

  currentSynth() {
    switch(this.props.currentSynth) {
      case "DuoSynth":
        return(<DuoSynth />)
      case "MonoSynth":
        return(<MonoSynth />)
      case "AMSynth":
        return(<AMSynth />)
      case "FMSynth":
        return(<FMSynth />)
      case "MembraneSynth":
        return(<MembraneSynth />)
      case "MetalSynth":
        return(<MetalSynth />)
      case "NoiseSynth":
        return(<NoiseSynth />)
      case "PluckSynth":
        return(<PluckSynth />)
      default:
        return(<DuoSynth />)
    }
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-sm-12 main">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div className="synth-select">
                <ToggleButtonGroup
                  type="checkbox"
                  value={this.props.currentSynth}
                  onChange={this.handleSynthSelectChange}
                >
                  {this.synthToggleButtons()}
                </ToggleButtonGroup>
              </div>
            </header>
            <div className="tone-synth">
              {this.currentSynth()}
              <StepSequencer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentSynth: get(state, "sequencer.currentSynth") }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSynth: synthName => dispatch(changeSynth(synthName))
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)

export default App
