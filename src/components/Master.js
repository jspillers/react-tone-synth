import React from "react"
import { render } from "react-dom"
import Dial from "./Dial"

class Master extends React.Component {
  render() {
    return (
      <div className="synth-section master" id={this.props.name}>
        <h4>FX</h4>
        <div className="row">
          <div className="col-md-2 col-md-offset-1">
            <Dial name={"driveSend"} displayName={"Drive"} parentName={this.props.name} min={-100} max={0} />
          </div>
          <div className="col-md-2">
            <Dial name={"reverbSend"} displayName={"Reverb"} parentName={this.props.name} min={-100} max={0} />
          </div>
          <div className="col-md-2">
            <Dial name={"delaySend"} displayName={"Delay"} parentName={this.props.name} min={-100} max={0} />
          </div>
          <div className="col-md-2">
            <Dial name={"chorusSend"} displayName={"Chorus"} parentName={this.props.name} min={-100} max={0} />
          </div>
          <div className="col-md-2">
            <Dial name={"volume"} displayName={"Volume"} parentName={this.props.name} min={-100} max={0} />
          </div>
        </div>
      </div>
    )
  }
}

export default Master
