import React from "react"
import Modulation from "./Modulation"
import Filter from "./Filter"
import Oscillator from "./Oscillator"
import Master from "./Master"

const MonoSynth = () => (
  <div id="mono-synth">
    <div className="row">
      <div className="col-md-6">
        <Oscillator name={"oscillator1"} displayName={"Oscillator 1"} />
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-6">
            <Filter name={"filter"} displayName={"Filter"} />
          </div>
        </div>
        <div className="row">
          <Master name={"master"} />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-5">
      </div>
    </div>
  </div>
)

export default MonoSynth
