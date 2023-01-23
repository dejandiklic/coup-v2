import React, {useContext, useState} from 'react';
import {Button, Row, Table} from "antd";
import CreateRoomModal from "./CreateRoomModal";
import {SocketContext} from "../../context/SocketContext";

function Lobby(props) {


    const {socket} = useContext(SocketContext);

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)

    const handleJoin = (id) => {
        console.log(id)
    }

    const columns = [
        {
            title: 'Room name',
            dataIndex: 'room_name',
            key: 'room_name',
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


    const testServer = () => {
        socket.emit("test","ajmo")
    }

    return (
        <>
            <Row>
                <Button onClick={() => {
                    setShow(true)
                }}>New room</Button>
                <Button onClick={testServer}>TEST</Button>
            </Row>
            <Row>
                <Table className="lobby-table" columns={columns} dataSource={data}/>
            </Row>
            <CreateRoomModal show={show} setShow={setShow}/>
        </>
    );
}

export default Lobby;