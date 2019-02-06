import React from "react"
import Modulation from "./Modulation"
import Filter from "./Filter"
import Oscillator from "./Oscillator"
import Master from "./Master"

const DuoSynth = () => (
  <div id="duo-synth">
    <div className="row">
      <div className="col-md-6">
        <Oscillator name={"oscillator1"} displayName={"Oscillator 1"} />
      </div>
      <div className="col-md-6">
        <Oscillator name={"oscillator2"} displayName={"Oscillator 2"} />
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <Modulation name={"modulation"} displayName={"Modulation"} />
      </div>
      <div className="col-md-3">
        <Filter name={"filter"} displayName={"Filter"} />
      </div>
      <div className="col-md-5">
        <Master name={"master"} />
      </div>
    </div>
  </div>
)

export default DuoSynth
