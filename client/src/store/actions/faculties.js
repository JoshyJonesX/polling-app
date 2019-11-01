import { apiCall } from "../../services/api"
import C from "../constants"
import { addError } from "./errors"

const addFaculty = faculty => ({
    type: C.ADD_FACULTY,
    faculty
})

const fetchFaculties = faculties => ({
    type: C.GET_FACULTIES,
    faculties
})

const updateFaculty = faculty => ({
    type: C.UPDATE_FACULTY,
    faculty
})

const removeFaculty = faculty => ({
    type: C.REMOVE_FACULTY,
    faculty
})

export const createFaculty = faculty => {
    return dispatch => apiCall("post", "/admin/api/faculty", faculty)
        .then(res => {
            dispatch(addFaculty(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const getFaculties = () => {
    return dispatch => apiCall("get", "/admin/api/faculty")
        .then(res => {
            dispatch(fetchFaculties(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}
 
export const editFaculty = faculty => {
    return dispatch => apiCall("put", `/admin/api/faculty/${faculty._id}`, faculty)
        .then(res => {
            dispatch(updateFaculty(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const deleteFaculty = faculty => {
    return dispatch => apiCall("delete", `/admin/api/faculty/${faculty._id}`)
        .then(res => {
            dispatch(removeFaculty(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}