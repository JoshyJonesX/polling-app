import { combineReducers } from 'redux'
import currentUser from './currentUser'
import errors from './errors'
import {
    facultyGrid,
    departmentGrid,
    electionGrid
} from './grid'
import faculties from './faculties'
import departments from './departments'
import elections from './elections'

const rootReducer = combineReducers({
    currentUser,
    errors,
    faculties,
    departments,
    elections,
    facultyGrid,
    departmentGrid,
    electionGrid
})

export default rootReducer