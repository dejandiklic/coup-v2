import React, {useEffect} from 'react';
import {Menu, Row} from "antd";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "../Pages/Home";
import Lobby from "../Pages/Lobby/Lobby";
import Login from "../Pages/Login/Login";
import {useSelector} from "react-redux";
import {authState} from "../redux/selectors";
import Room from "../Pages/Lobby/Room/Room";

const menuItems = [
    {
        label: 'Home',
        key: '/',
    },
    {
        label: 'Lobby',
        key: '/lobby',
    },
    {
        label: 'Profile',
        key: '/profile',
    },
];

function Navbar() {

    const navigate = useNavigate()
    const {authenticated} = useSelector(authState)

    const onClick = (e) => {
        navigate(e.key)
    };

    useEffect(() => {
        if (!authenticated) {
            navigate("/login")
        }
    }, [authenticated])

    return (
        <div>
            <Row justify={"center"}>
                {authenticated &&
                    <Menu onClick={onClick} defaultSelectedKeys={[window.location.pathname]} mode="horizontal"
                          items={menuItems}/>}
            </Row>
            <Content/>
        </div>
    );
}

function Content() {
    return <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/lobby" element={<Lobby/>}/>
            <Route path="/lobby/:roomName" element={<Room/>}/>
            <Route path={"/login"} element={<Login/>}/>
        </Routes>
    </div>
}

export default Navbar;