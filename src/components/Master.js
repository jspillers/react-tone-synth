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
            <Dial name={"drive"} displayName={"Drive"} parentName={this.props.name} min={0} max={1} />
          </div>
          <div className="col-md-2">
            <Dial name={"reverb"} displayName={"Reverb"} parentName={this.props.name} min={0} max={1} />
          </div>
          <div className="col-md-2">
            <Dial name={"delay"} displayName={"Delay"} parentName={this.props.name} min={0} max={1} />
          </div>
          <div className="col-md-2">
            <Dial name={"chorus"} displayName={"Chorus"} parentName={this.props.name} min={0} max={1} />
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
