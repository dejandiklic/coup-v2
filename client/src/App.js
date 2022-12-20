import "./static/login.css"
import socketIO from 'socket.io-client';
import Navbar from "./navigation/navbar";
import {BrowserRouter} from "react-router-dom";
import {useEffect} from "react";

const socket = socketIO.connect(process.env.REACT_APP_SERVER_URL);

function App() {

    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    return (<BrowserRouter>
        <Navbar/>
    </BrowserRouter>);
}

export default App;
