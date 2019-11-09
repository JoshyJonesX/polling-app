import C from '../constants'

const unRegUser = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_UNREGUSER:
            return {
                ...action.unRegUser
            }
        case C.UPDATE_UNREGUSER:
            return {
                    ...action.unRegUser
                }
        default:
            return state
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case C.ADD_UNREGUSER:
            return [
                ...state,
                unRegUser({}, action)
            ]
        case C.GET_UNREGUSERS:
            return [...action.faculties]
        case C.UPDATE_UNREGUSER:
                return [
                    ...state.filter(u => u._id !== action.unRegUser._id), unRegUser({}, action)
                ]
        case C.REMOVE_UNREGUSER:
            return state.filter(
                u => u._id !== action.unRegUser._id
            )
        default:
            return state
    }
}