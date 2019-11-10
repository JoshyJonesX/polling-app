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

export const facultyGrid = (state = {
    ...gridInitialState,
    columnOrder: ['name', 'abv', 'nod', 'noe'],
    columnWidths: [
        { columnName: 'name', width: 200 },
        { columnName: 'abv', width: 100 },
        { columnName: 'nod', width: 200 },
        { columnName: 'noe', width: 170 }
    ]
}, action) => {
    if (action.type === C.FACULTY_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }
  
export const departmentGrid = (state = {
  ...gridInitialState,
  columnOrder: ['name', 'abv', 'faculty', 'nos', 'noe'],
  columnWidths: [
      { columnName: 'name', width: 200 },
      { columnName: 'abv', width: 100 },
      { columnName: 'faculty', width: 150 },
      { columnName: 'nos', width: 200 },
      { columnName: 'noe', width: 170 }
  ]}, action) => {
    if (action.type === C.DEPARTMENT_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }

export const electionGrid = (state = {
  ...gridInitialState,
  columnOrder: ['name', 'for', 'noc', 'active'],
  columnWidths: [
      { columnName: 'name', width: 300 },
      { columnName: 'for', width: 100 },
      { columnName: 'noc', width: 200 },
      { columnName: 'active', width: 170 }
  ]}, action) => {
    if (action.type === C.ELECTION_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }

export const studentGrid = (state = {
  ...gridInitialState,
  columnOrder: ['matNo', 'username', 'level', 'faculty', 'department', 'role'],
  columnWidths: [
      { columnName: 'matNo', width: 200 },
      { columnName: 'username', width: 200 },
      { columnName: 'level', width: 200 },
      { columnName: 'faculty', width: 100 },
      { columnName: 'department', width: 100 },
      { columnName: 'role', width: 100 },
  ]}, action) => {
    if (action.type === C.STUDENT_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }

export const contestantGrid = (state = {
  ...gridInitialState,
  columnOrder: ['fName', 'lName', 'matNo', 'votes'],
  columnWidths: [
      { columnName: 'fName', width: 200 },
      { columnName: 'lName', width: 200 },
      { columnName: 'matNo', width: 200 },
      { columnName: 'votes', width: 100 },
  ]}, action) => {
    if (action.type === C.CONTESTANT_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }

export const unRegUserGrid = (state = {
  ...gridInitialState,
  columnOrder: ['matNo', 'phoneNo',],
  columnWidths: [
      { columnName: 'matNo', width: 200 },
      { columnName: 'phoneNo', width: 200 },
  ]}, action) => {
    if (action.type === C.UNREGUSER_GRID_STATE_CHANGE_ACTION) {
      return {
        ...state,
        [action.partialStateName]: action.partialStateValue,
      }
    }
    return state
  }
  