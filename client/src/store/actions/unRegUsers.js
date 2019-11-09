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

export const createUnRegUser = unregUser => {
    return dispatch => apiCall("post", "/admin/api/unregUser", unregUser)
        .then(res => {
            dispatch(addUnRegUser(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const getUnRegUsers = () => {
    return dispatch => apiCall("get", "/admin/api/unregUser")
        .then(res => {
            dispatch(fetchUnRegUsers(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}
 
export const editUnRegUser = unregUser => {
    return dispatch => apiCall("put", `/admin/api/unregUser/${unregUser._id}`, unRegUser)
        .then(res => {
            dispatch(updateUnRegUser(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const deleteunRegUser = unRegUser => {
    return dispatch => apiCall("delete", `/admin/api/unRegUser/${unRegUser._id}`)
        .then(res => {
            dispatch(removeUnRegUser(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}