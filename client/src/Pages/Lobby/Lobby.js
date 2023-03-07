import React, {useContext, useEffect, useState} from 'react';
import {Button, Row, Table, Tag} from "antd";
import CreateRoomModal from "./Room/CreateRoomModal";
import {SocketContext} from "../../context/SocketContext";
import {setRoom, setRooms} from "../../redux/rooms";
import {useDispatch, useSelector} from "react-redux";
import {roomsState} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import RoomPasswordModal from "./Room/RoomPasswordModal";

function Lobby() {

    const dispatch = useDispatch()
    const {socket} = useContext(SocketContext);

    const navigate = useNavigate()

    const {rooms} = useSelector(roomsState)

    const [show, setShow] = useState(false)
    const [showPassModal, setShowPassModal] = useState(false)
    const [roomName, setRoomName] = useState("")

    useEffect(() => {
        if (socket) {
            socket.emit("get rooms update")
            socket.on("room list update", (data) => {
                dispatch(setRooms(data))
            })
            return () => {
                socket.off("room list update")
            }
        }
    }, [socket])

    const handleJoin = (name, type) => {
        if (type === "private") {
            setShowPassModal(true)
            setRoomName(name)
        } else {
            socket.emit("join room", {roomName: name, playerID: socket.id}, (response) => {
                dispatch(setRoom(response))
                navigate(`/lobby/${response.name}`)
            })
        }

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
            render:(cell) =>{
                if(cell==="public"){
                    return <Tag color={"green"}>
                        PUBLIC
                    </Tag>
                }else{
                    return <Tag color={"orange"}>
                        PRIVATE
                    </Tag>
                }
            }
        },
        {
            title: 'Players',
            dataIndex: 'players',
            key: 'players',
            render: (cell, row) => {
                return `${row.playerList.length}/6`
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: ({name, type}, row) => {
                return <Button disabled={row.playerList.length >= 6}
                               onClick={() => handleJoin(name, type)}>JOIN</Button>
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
            <RoomPasswordModal show={showPassModal} setShow={setShowPassModal} roomName={roomName}/>
        </>
    );
}

export default Lobby;