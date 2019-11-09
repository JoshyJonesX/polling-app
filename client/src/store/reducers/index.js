import { combineReducers } from 'redux'
import currentUser from './currentUser'
import otp from './otp'
import errors from './errors'
import {
    facultyGrid,
    departmentGrid,
    electionGrid,
    studentGrid,
    contestantGrid,
    unRegUserGrid
} from './grid'
import faculties from './faculties'
import departments from './departments'
import elections from './elections'
import students from './students'
import contestants from './contestants'
import unRegUser from './unRegUsers'

const rootReducer = combineReducers({
    currentUser,
    otp,
    errors,
    faculties,
    departments,
    elections,
    students,
    contestants,
    unRegUser,
    facultyGrid,
    departmentGrid,
    electionGrid,
    studentGrid,
    contestantGrid,
    unRegUserGrid
})

export default rootReducer