import './App.css';
import socketIO from 'socket.io-client';
import {useEffect} from "react";

const socket = socketIO.connect('http://localhost:4000');

function App() {


    useEffect(() => {
        socket.on("response", (data) => {
            console.log(data)
            alert(data)
        })
    }, [socket])

    const handleClick = () => {
        socket.emit("test", "test");
    }

    console.log(process.env)

    return (
        <div>
            <button onClick={handleClick}>TEST</button>
        </div>
    );
}

export default App;
