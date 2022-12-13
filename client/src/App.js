import './App.css';
import socketIO from 'socket.io-client';
import {useEffect} from "react";

const socket = socketIO.connect(process.env.REACT_APP_SERVER_URL);

function App() {


    useEffect(() => {
        socket.on("response", (data) => {
            alert(data)
        })
    }, [socket])

    const handleClick = () => {
        socket.emit("test", "test");
    }

    return (
        <div>
            <button onClick={handleClick}>TEST</button>
        </div>
    );
}

export default App;
