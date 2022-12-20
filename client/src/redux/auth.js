import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    username: "",
    type: "",
    socketID: "",
    authenticated: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        guestLogin: (state, action) => {
            state.username = action.payload.username
            state.authenticated = true
            state.type = "GUEST"
        }
    },
    extraReducers: builder => {

    }
})

export const {guestLogin} = authSlice.actions
export default authSlice.reducer