import { apiCall } from "../../services/api"
import C from "../constants"
import { addError } from "./errors"

const addElection = election => ({
    type: C.ADD_ELECTION,
    election
})

const fetchElection = elections => ({
    type: C.GET_ELECTIONS,
    elections
})

const updateElection = election => ({
    type: C.UPDATE_ELECTION,
    election
})

const removeElection = election => ({
    type: C.REMOVE_ELECTION,
    election
})
// creates an individual election for department/faculty
export const createElection = election => {
    return dispatch => apiCall("post", `/admin/api/election/${election._id}`, election)
        .then(res => {
            dispatch(addElection(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}
// creates an multiple elections for each department/faculty or general
export const createElections = election => {
    return dispatch => apiCall("post", "/admin/api/election", election)
        .then(res => {
            dispatch(addElection(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const getElections = () => {
    return dispatch => apiCall("get", "/admin/api/election")
        .then(res => {
            dispatch(fetchElection(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}
 
export const editElection = election => {
    return dispatch => apiCall("put", `/admin/api/election/${election._id}`, election)
        .then(res => {
            dispatch(updateElection(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const deleteElection = election => {
    return dispatch => apiCall("delete", `/admin/api/election/${election._id}`)
        .then(res => {
            dispatch(removeElection(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}