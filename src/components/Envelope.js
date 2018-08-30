import React from "react"
import { render } from "react-dom"
import Dial from "./Dial"

class Envelope extends React.Component {
  render() {
    return (
      <div className="envelope" id={this.props.name}>
        <div className="row">
          <div className="col-md-3">
            <h5>{this.props.displayName}</h5>
          </div>
          <div className="col-md-2">
            <Dial
              name={`${this.props.name}Attack`}
              displayName={"Attack"}
              parentName={this.props.name}
              min={0.0}
              max={5.0}
            />
          </div>
          <div className="col-md-2">
            <Dial
              name={`${this.props.name}Decay`}
              displayName={"Decay"}
              parentName={this.props.name}
              min={0.0}
              max={5.0}
            />
          </div>
          <div className="col-md-2">
            <Dial
              name={`${this.props.name}Sustain`}
              displayName={"Sustain"}
              parentName={this.props.name}
              min={0.0}
              max={5.0}
            />
          </div>
          <div className="col-md-2">
            <Dial
              name={`${this.props.name}Release`}
              displayName={"Release"}
              parentName={this.props.name}
              min={0.0}
              max={5.0}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Envelope
