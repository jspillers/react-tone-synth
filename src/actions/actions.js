import {
  CHANGE_SYNTH,
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

export const changeSynth = synthName => {
  return {
    type: CHANGE_SYNTH,
    payload: synthName
  }
}

export const changeDial = dial => {
  return {
    type: CHANGE_DIAL,
    payload: dial
  }
}

export const changeWaveform = select => {
  return {
    type: CHANGE_WAVEFORM,
    payload: select
  }
}

export const changeFilterType = val => {
  return {
    type: CHANGE_FILTER_TYPE,
    payload: val
  }
}

export const setSequencerCell = cell => {
  return {
    type: SEQUENCER_SET_CELL,
    payload: cell
  }
}

export const playPause = props => {
  return {
    type: SEQUENCER_START_STOP,
    payload: props
  }
}

export const triggerColumn = columnIndex => {
  return {
    type: SEQUENCER_TRIGGER_COLUMN,
    payload: columnIndex
  }
}

export const bpmUpdate = val => {
  return {
    type: BPM_UPDATE,
    payload: val
  }
}

export const clearAllCells = () => {
  return {
    type: CLEAR_ALL_CELLS,
    payload: {}
  }
}

export const sequencerCellMouseDown = props => {
  return {
    type: SEQUENCER_CELL_MOUSE_DOWN,
    payload: props
  }
}

export const sequencerCellMouseUp = props => {
  return {
    type: SEQUENCER_CELL_MOUSE_UP,
    payload: props
  }
}

export const sequencerCellMouseOut = props => {
  return {
    type: SEQUENCER_CELL_MOUSE_OUT,
    payload: props
  }
}

export const globalMouseUp = evnt => {
  return {
    type: GLOBAL_MOUSE_UP,
    payload: evnt
  }
}

