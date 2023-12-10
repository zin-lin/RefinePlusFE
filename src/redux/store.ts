import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from './authState';

let store;
export default store =  configureStore({
 enhancers: undefined, middleware: undefined, preloadedState: undefined, reducer: {
    auth: AuthReducer
 }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch