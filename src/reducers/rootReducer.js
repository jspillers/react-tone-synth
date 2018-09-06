import {
  CHANGE_DIAL,
  CHANGE_WAVEFORM,
  CHANGE_FILTER_TYPE,
  SEQUENCER_SET_CELL,
  SEQUENCER_START_STOP,
  SEQUENCER_TRIGGER_COLUMN,
  BPM_UPDATE,
  CLEAR_ALL_CELLS,
  SEQUENCER_CELL_MOUSE_DOWN,
  SEQUENCER_CELL_MOUSE_UP,
  SEQUENCER_CELL_MOUSE_OUT,
  GLOBAL_MOUSE_UP
} from "../constants/action-types"

import * as dotProp from "dot-prop-immutable"
import initialState from "./initialState"
import Tone from "tone"
import ToneSynth from "../synth/ToneSynth"

const synth = new ToneSynth(initialState)

// copies the sequencer cell state, iterates through the copy of all sequencer cells,
// and potentially alters the state of each cell based on the contents/behavior of `func`
// returns the state structure of now potentially altered cells
const forAllCells = (state, func) => {
  let rows = dotProp.get(state, "sequencer.sequencerRows")

  Object.keys(rows).forEach((rowKey, ri) => {
    Object.keys(rows[rowKey]).forEach((colKey, ci) => {
      func(rows, rowKey, colKey, ri, ci)
    })
  })

  return rows
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_DIAL:
      synth.updateSetting(action.payload.name, action.payload.dialValue)

      return dotProp.set(
        state,
        `${action.payload.parentName}.${action.payload.name}`,
        action.payload.dialValue
      )

    case CHANGE_WAVEFORM:
      synth.updateSetting(action.payload.name, action.payload.selectValue)

      return dotProp.set(
        state,
        `${action.payload.parentName}.${action.payload.name}`,
        action.payload.selectValue
      )

    case CHANGE_FILTER_TYPE:
      console.log(action.payload)
      return dotProp.set(state, "filter.filterType", action.payload)

    case SEQUENCER_SET_CELL:
      return dotProp.set(
        state,
        `sequencer.sequencerRows.${action.payload.rowNum}.${action.payload.cellNum}`,
        action.payload
      )

    case SEQUENCER_START_STOP:
      return dotProp.set(state, "sequencer.isPlaying", action.payload.isPlaying)

    case SEQUENCER_TRIGGER_COLUMN:
      return dotProp.set(
        state, "sequencer.sequencerRows",
        forAllCells(state, (rows, rowKey, colKey, ri, ci) => {
          let cell = rows[rowKey][colKey]

          if (action.payload === ci) {
            cell.isHighlighted = true
            if (cell.isActive) {
              //console.log(cell.note + cell.octave)
              synth.triggerAttackRelease(cell.note + cell.octave, "16n")
            }
          } else {
            rows[rowKey][colKey].isHighlighted = false
          }
        })
      )

    case BPM_UPDATE:
      Tone.Transport.bpm.value = action.payload
      return dotProp.set(state, "sequencer.bpm", action.payload)

    case CLEAR_ALL_CELLS:
      return dotProp.set(
        state, "sequencer.sequencerRows",
        forAllCells(state, (rows, rowKey, colKey, ri, ci) => {
          let cell = rows[rowKey][colKey]
          cell.isActive = false
        })
      )

    case SEQUENCER_CELL_MOUSE_DOWN:
      console.log("mouse down", action.payload)
      return dotProp.set(state, "sequencer.mouseDown", action.payload)

    case GLOBAL_MOUSE_UP:
      return dotProp.set(state, "sequencer.mouseDown", null)

    case SEQUENCER_CELL_MOUSE_UP:
      console.log("mouse up", action.payload)
      return dotProp.merge(state,
        `sequencer.sequencerRows.${action.payload.rowNum}.${action.payload.cellNum}`,
        { isActive: !action.payload.isActive })

    case SEQUENCER_CELL_MOUSE_OUT:
      let mouseDown = dotProp.get(state, "sequencer.mouseDown")

      if (mouseDown !== null) {
        console.log(!mouseDown.isActive)
        return dotProp.set(state,
          `sequencer.sequencerRows.${action.payload.rowNum}.${action.payload.cellNum}`,
          { isActive: !mouseDown.isActive })
      } else {
        return state
      }

    default:
      return state

  }
}

export default rootReducer
