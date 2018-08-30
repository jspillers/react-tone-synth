import React from "react"
import { render } from "react-dom"
import Dial from "./Dial"
import WaveformSelect from "./WaveformSelect"
import Envelope from "./Envelope"

class Oscillator extends React.Component {
  render() {
    return (
      <div id={this.props.name} className="synth-section oscillator">
        <h4>{this.props.displayName}</h4>
        <WaveformSelect name={`${this.props.name}Type`} displayName={"Waveform"} parentName={this.props.name} />

        <div className="row">
          <div className="col-md-2 col-md-offset-1">
            <Dial
              name={`${this.props.name}Volume`}
              displayName={"Volume"}
              parentName={this.props.name}
              min={-60}
              max={0}
            />
          </div>
          <div className="col-md-2">
            <Dial
              name={`${this.props.name}Portamento`}
              displayName={"Portamento"}
              parentName={this.props.name}
              min={0}
              max={100}
            />
          </div>
          <div className="col-md-2">
            <Dial
              name={`${this.props.name}Detune`}
              displayName={"Detune"}
              parentName={this.props.name}
              min={-1200}
              max={1200}
            />
          </div>
          <div className="col-md-2">
            <Dial
              name={`${this.props.name}FilterCutoff`}
              displayName={"Cutoff"}
              parentName={this.props.name}
              min={20}
              max={20000}
            />
          </div>
          <div className="col-md-2">
            <Dial
              name={`${this.props.name}FilterQ`}
              displayName={"Resonance"}
              parentName={this.props.name}
              min={0}
              max={20}
            />
          </div>
        </div>
        <Envelope name={`${this.props.name}FilterEnvelope`} displayName={"Filter Envelope"} parentName={this.props.name} />
        <Envelope name={`${this.props.name}VolumeEnvelope`} displayName={"Volume Envelope"} parentName={this.props.name} />
      </div>
    )
  }
}

export default Oscillator

