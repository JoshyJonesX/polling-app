import { apiCall } from "../../services/api"
import C from "../constants"
import { addError } from "./errors"

const addDepartment = department => ({
    type: C.ADD_DEPARTMENT,
    department
})

const fetchDepartment = departments => ({
    type: C.GET_DEPARTMENTS,
    departments
})

const updateDepartment = department => ({
    type: C.UPDATE_DEPARTMENT,
    department
})

const removeDepartment = department => ({
    type: C.REMOVE_DEPARTMENT,
    department
})

export const createDepartment = department => {
    return dispatch => apiCall("post", "/admin/api/department", department)
        .then(res => {
            dispatch(addDepartment(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const getDepartments = () => {
    return dispatch => apiCall("get", "/admin/api/department")
        .then(res => {
            dispatch(fetchDepartment(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}
 
export const editDepartment = department => {
    return dispatch => apiCall("put", `/admin/api/department/${department._id}`, department)
        .then(res => {
            dispatch(updateDepartment(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const deleteDepartment = department => {
    return dispatch => apiCall("delete", `/admin/api/department/${department._id}`)
        .then(res => {
            dispatch(removeDepartment(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}