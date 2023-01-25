import React, {useContext, useEffect, useState} from 'react';
import {Button, Row, Table} from "antd";
import CreateRoomModal from "./Room/CreateRoomModal";
import {SocketContext} from "../../context/SocketContext";
import {setRooms} from "../../redux/rooms";
import {useDispatch, useSelector} from "react-redux";
import {roomsState} from "../../redux/selectors";

function Lobby() {

    const dispatch = useDispatch()
    const {socket} = useContext(SocketContext);

    const {rooms} = useSelector(roomsState)

    const [show, setShow] = useState(false)

    useEffect(() => {
        socket.on("room list update", (data) => {
            dispatch(setRooms(data))
        })
    }, [])

    const handleJoin = (id) => {
        console.log(id)
    }

    const columns = [
        {
            title: 'Room name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Action',
            key: 'action',
            render: ({id}) => {
                return <Button onClick={() => handleJoin(id)}>JOIN</Button>
            }
        },
    ];

    return (
        <>
            <Row justify={"space-around"} className={"mt-2"}>
                <Button onClick={() => {
                    setShow(true)
                }}>New room</Button>
            </Row>
            <Row>
                <Table rowKey={"name"} className="lobby-table" columns={columns} dataSource={rooms}/>
            </Row>
            <CreateRoomModal show={show} setShow={setShow}/>
        </>
    );
}

export default Lobby;