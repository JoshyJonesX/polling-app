import C from '../constants'

const contestant = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_CONTESTANT:
            return {
                ...action.contestant
            }
        case C.UPDATE_CONTESTANT:
            return {
                    ...action.contestant
                }
        default:
            return state
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case C.ADD_CONTESTANT:
            return [
                ...state,
                contestant({}, action)
            ]
        case C.GET_CONTESTANTS:
            return [...action.contestants]
        case C.UPDATE_CONTESTANT:
                return [
                    ...state.filter(c => c._id !== action.contestant._id), contestant({}, action)
                ]
        case C.REMOVE_CONTESTANT:
            return state.filter(
                c => c._id !== action.contestant._id
            )
        default:
            return state
    }
}