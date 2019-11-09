import { apiCall } from "../../services/api"
import C from "../constants"
import { addError } from "./errors"

const addStudent = student => ({
    type: C.ADD_STUDENT,
    student
})

const fetchStudents = students => ({
    type: C.GET_STUDENTS,
    students
})

const updateStudent = student => ({
    type: C.UPDATE_STUDENT,
    student
})

const removeStudent = student => ({
    type: C.REMOVE_STUDENT,
    student
})

export const createStudent = student => {
    return dispatch => apiCall("post", "/admin/api/student", student)
        .then(res => {
            dispatch(addStudent(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const getStudents = () => {
    return dispatch => apiCall("get", "/admin/api/student")
        .then(res => {
            dispatch(fetchStudents(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}
 
export const editStudent = student => {
    return dispatch => apiCall("put", `/admin/api/student/${student._id}`, student)
        .then(res => {
            dispatch(updateStudent(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}

export const deleteStudent = student => {
    return dispatch => apiCall("delete", `/admin/api/student/${student._id}`)
        .then(res => {
            dispatch(removeStudent(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        })
}