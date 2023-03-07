import React, {useContext, useState} from 'react';
import {Button, Popover} from "antd";
import {SocketContext} from "../context/SocketContext";

function KickPlayerPopover({playerID, roomName}) {
    const [show, setShow] = useState(false)
    const {socket} = useContext(SocketContext);

    const handleOpenChange = (newState) => {
        setShow(newState)
    }

    const content = () => {

        const handleKick = () => {
            socket.emit("kick player", {playerID, roomName})
        }

        return (
            <>
                <Button onClick={handleKick} danger>Kick</Button>
                <Button onClick={() => {
                    setShow(false)
                }}>Cancel</Button>
            </>
        )
    }

    return (
        <Popover open={show} content={content} title="Kick player" trigger="click" onOpenChange={handleOpenChange}>
            <Button onClick={() => {
                setShow(true)
            }} danger>Kick</Button>
        </Popover>
    );
}

export default KickPlayerPopover;