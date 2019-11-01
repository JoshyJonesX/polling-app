import C from '../constants'

const election = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_ELECTION:
            return {
                ...action.election
            }
        case C.UPDATE_ELECTION:
            return {
                    ...action.election
                }
        default:
            return state
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case C.ADD_ELECTION:
            return [
                ...state,
                election({}, action)
            ]
        case C.GET_ELECTIONS:
            return [...action.elections]
        case C.UPDATE_ELECTION:
                return [
                    ...state.filter(d => d._id !== action.election._id), election({}, action)
                ]
        case C.REMOVE_ELECTION:
            return state.filter(
                d => d._id !== action.election._id
            )
        default:
            return state
    }
}