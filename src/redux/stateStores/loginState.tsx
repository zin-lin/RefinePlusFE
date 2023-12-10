import {createSlice} from "@reduxjs/toolkit";
interface RegisterState {
    value: string // initial State
}

// Define the initial state using that type
const initialState: RegisterState = {
    value: "Sign In to Store"
}

export const loginSlice = createSlice({
    extraReducers: undefined, initialState: {value: "Sign In to Store"}, name: "reg", reducers: {
        toLogin:(state)=> {
            state.value = "Sign In to Store";
        },
        toRegister: (state)=>{
            state.value = "Register Now";
        }
    }
});
export const {toLogin, toRegister} = loginSlice.actions;
export default loginSlice.reducer;