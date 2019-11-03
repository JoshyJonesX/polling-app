import C from "../constants"


export const createGridActionDepartment = (partialStateName, partialStateValue) => ({
    type: C.DEPARTMENT_GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
  })

export const createGridActionFaculty = (partialStateName, partialStateValue) => ({
    type: C.FACULTY_GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
  })

export const createGridActionElection = (partialStateName, partialStateValue) => ({
    type: C.ELECTION_GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
  })