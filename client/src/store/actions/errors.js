import C from "../constants"

export const addError = error => ({
    type: C.ADD_ERROR,
    error
})

export const removeError = () => ({
    type: C.REMOVE_ERROR
})