import { combineReducers } from 'redux'
import currentUser from './currentUser'
import errors from './errors'
import Facultygrid from './grid'
import Departmentgrid from './grid'
import Electiongrid from './grid'
import faculties from './faculties'
import departments from './departments'
import elections from './elections'

const rootReducer = combineReducers({
    currentUser,
    errors,
    faculties,
    departments,
    elections,
    Facultygrid,
    Departmentgrid,
    Electiongrid
})

export default rootReducer