import "./static/login.css"
import "./static/main.css"
import {io} from 'socket.io-client';
import Navbar from "./navigation/navbar";
import {BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import {SocketContext} from "./context/SocketContext";
import {useDispatch, useSelector} from "react-redux";
import {authState} from "./redux/selectors";
import {setSocketId} from "./redux/auth";

function App() {

    const dispatch = useDispatch()
    const [socket, setSocket] = useState(null);
    const user = useSelector(authState)
    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    useEffect(() => {
        if (user.authenticated) {
            const socket = io(process.env.REACT_APP_SERVER_URL);
            socket.on("connect", () => {
                dispatch(setSocketId(socket.id))
                socket.emit("addUser", {...user, socketID: socket.id})
            })
            setSocket(socket);
        }
    }, [user.authenticated]);

    return (<BrowserRouter>
        <SocketContext.Provider value={{socket, setSocket}}>
            <Navbar/>
        </SocketContext.Provider>
    </BrowserRouter>);
}

export default App;
