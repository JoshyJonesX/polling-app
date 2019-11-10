import { apiCall } from "../../services/api"
import C from "../constants"
import { addError } from "./errors"

const addUnRegUser = unRegUser => ({
    type: C.ADD_UNREGUSER,
    unRegUser
})

const fetchUnRegUsers = unRegUsers => ({
    type: C.GET_UNREGUSERS,
    unRegUsers
})

const updateUnRegUser = unRegUser => ({
    type: C.UPDATE_UNREGUSER,
    unRegUser
})

const removeUnRegUser = unRegUser => ({
    type: C.REMOVE_UNREGUSER,
    unRegUser
})

export const createUnRegUser = unRegUser => {
    return dispatch => apiCall("post", "/admin/api/unregstudent", unRegUser)
        .then(res => {
            dispatch(addUnRegUser(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const getUnRegUsers = () => {
    return dispatch => apiCall("get", "/admin/api/unregstudent")
        .then(res => {
            dispatch(fetchUnRegUsers(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}
 
export const editUnRegUser = unRegUser => {
    return dispatch => apiCall("put", `/admin/api/unregstudent/${unRegUser._id}`, unRegUser)
        .then(res => {
            dispatch(updateUnRegUser(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const deleteUnRegUser = unRegUser => {
    return dispatch => apiCall("delete", `/admin/api/unregstudent/${unRegUser._id}`)
        .then(res => {
            dispatch(removeUnRegUser(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}