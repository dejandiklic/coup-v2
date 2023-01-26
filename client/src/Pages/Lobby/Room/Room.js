import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {SocketContext} from "../../../context/SocketContext";

function Room() {

    let {roomName} = useParams()

    const {socket} = useContext(SocketContext);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.emit("leaving room")
            }
        }
    }, [])

    return (
        <div>
            {roomName}
        </div>
    );
}

export default Room;