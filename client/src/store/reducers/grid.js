import C from "../constants"

const gridInitialState = {
    editingRowIds: [],
    addedRows: [],
    rowChanges: {},
    sorting: [],
    grouping: [],
    expandedGroups: [],
    expandedRowIds: [1],
    searchValue: '',
    currentPage: 0,
    pageSize: 10,
    pageSizes: [5, 10, 15, 0],
  }

export const facultyGrid = (state = gridInitialState, action) => {
    if (action.type === C.FACULTY_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }
  
export const departmentGrid = (state = gridInitialState, action) => {
    if (action.type === C.DEPARTMENT_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }

export const electionGrid = (state = gridInitialState, action) => {
    if (action.type === C.ELECTION_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }