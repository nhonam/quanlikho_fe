import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import Reducers from './reducers';

const initialState = {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    isLoading: false,
};

const ChangeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        case 'SHOW_LOADER':
            return { ...state, isLoading: true }
        case 'HIDE_LOADER':
            return { ...state, isLoading: false }
        case 'SHOW_SIDEBAR':
            return { ...state, sidebarShow: true }
        case 'HIDE_SIDEBAR':
            return { ...state, sidebarShow: false }
        default:
            return state
    }
};

const store = configureStore({
    reducer: { ChangeState, ...Reducers },
    middleware: [thunkMiddleware],
    preloadedState: {},
})
export default store;
