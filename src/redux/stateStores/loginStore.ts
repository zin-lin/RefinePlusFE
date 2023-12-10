import {configureStore} from "@reduxjs/toolkit";
import LoginReducer from './loginState';

let store;
export default store = configureStore({
    enhancers: undefined, middleware: undefined, preloadedState: undefined, reducer: {
        log: LoginReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch