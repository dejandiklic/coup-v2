import React from 'react';
import {useParams} from "react-router-dom";

function Room() {

    let {roomName} = useParams()

    return (
        <div>
            {roomName}
        </div>
    );
}

export default Room;