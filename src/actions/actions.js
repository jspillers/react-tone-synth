import {
  CHANGE_DIAL,
  CHANGE_WAVEFORM,
  CHANGE_FILTER_TYPE,
  SEQUENCER_SET_CELL,
  SEQUENCER_START_STOP,
  SEQUENCER_TRIGGER_COLUMN,
  BPM_UPDATE,
  CLEAR_ALL_CELLS
} from "../constants/action-types"

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
