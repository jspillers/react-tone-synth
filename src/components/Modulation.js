import React from "react"
import { render } from "react-dom"
import Dial from "./Dial"

class Modulation extends React.Component {
  render() {
    return (
      <div id={this.props.name} className="synth-section modulation">
        <h4>{this.props.displayName}</h4>
        <div className="row">
          <div className="col-md-3 col-md-offset-1">
            <Dial
              name={"vibratoAmount"}
              displayName={"Vibrato"}
              parentName={this.props.name}
              min={0}
              max={10}
            />
          </div>
          <div className="col-md-3">
            <Dial
              name={"vibratoRate"}
              displayName={"Rate"}
              parentName={this.props.name}
              min={0}
              max={100}
            />
          </div>
          <div className="col-md-3">
            <Dial
              name={"harmonicity"}
              displayName={"Harmonicity"}
              parentName={this.props.name}
              min={-2}
              max={2}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Modulation
