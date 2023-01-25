import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth"
import roomsReducer from "./rooms"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        rooms: roomsReducer
    }
})