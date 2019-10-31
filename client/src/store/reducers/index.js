import { combineReducers } from 'redux'
import currentUser from './currentUser'
import errors from './errors'
import Facultygrid from './grid'
import Departmentgrid from './grid'
import faculties from './faculties'
import departments from './departments'

const rootReducer = combineReducers({
    currentUser,
    errors,
    faculties,
    departments,
    Facultygrid,
    Departmentgrid
})

export default rootReducer