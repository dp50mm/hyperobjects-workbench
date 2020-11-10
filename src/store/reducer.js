import userReducer, { initialUserState } from './reducers/userReducer'

const initialState = {
    user: initialUserState
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default: {
            return {
                ...state,
                user: userReducer(state.user, action)
            }
        }
    }
}

export { initialState, reducer }