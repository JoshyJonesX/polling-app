import C from "../constants"


export default (partialStateName, partialStateValue) => ({
    type: C.GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
  })