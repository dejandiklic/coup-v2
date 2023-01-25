import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    room: {},
    rooms: []
}

export const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload
        },
        setRoom: (state, action) => {
            state.room = action.payload
        }
    }
})

export const {setRooms, setRoom} = roomsSlice.actions
export default roomsSlice.reducer