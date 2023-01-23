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
        },
        setSocketId: (state, action) => {
            state.socketID = action.payload
        }
    },
    extraReducers: builder => {

    }
})

export const {guestLogin,setSocketId} = authSlice.actions
export default authSlice.reducer