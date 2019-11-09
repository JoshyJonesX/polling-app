import { apiCall } from "../../services/api"
import C from "../constants"
import { addError } from "./errors"

const addContestant = contestant => ({
    type: C.ADD_CONTESTANT,
    contestant
})

const updateContestant = contestant => ({
    type: C.UPDATE_CONTESTANT,
    contestant
})

const removeContestant = contestant => ({
    type: C.REMOVE_CONTESTANT,
    contestant
})

export const createContestant = contestant => {
    return dispatch => apiCall("post", `/admin/api/election/${contestant.election_id}/contestant/`, contestant)
        .then(res => {
            dispatch(addContestant(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

 
export const editContestant = contestant => {
    return dispatch => apiCall("put", `/admin/api/election/${contestant.election_id}/contestant/${contestant._id}`, contestant)
        .then(res => {
            dispatch(updateContestant(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const deleteContestant = contestant => {
    return dispatch => apiCall("delete", `/admin/api/election/${contestant.election_id}/contestant/${contestant._id}`)
        .then(res => {
            dispatch(removeContestant(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}