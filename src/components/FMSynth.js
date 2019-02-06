import React from "react"
import Filter from "./Filter"
import Master from "./Master"

const FMSynth = () => (
  <div id="am-synth">
    <div className="row">
      <div className="col-md-6">
      </div>
    </div>
    <div className="row">
      <div className="col-md-3">
        <Filter name={"filter"} displayName={"Filter"} />
      </div>
      <div className="col-md-5">
        <Master name={"master"} />
      </div>
    </div>
  </div>
)

export default FMSynth
