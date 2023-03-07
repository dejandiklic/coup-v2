import React, {useContext, useEffect} from 'react';
import {SocketContext} from "../../../context/SocketContext";
import {useDispatch, useSelector} from "react-redux";
import {roomsState} from "../../../redux/selectors";
import {Row, Table, Tag} from "antd";
import {setRoom} from "../../../redux/rooms";

function Room() {

    const {room} = useSelector(roomsState)
    const dispatch = useDispatch()

    const {socket} = useContext(SocketContext);

    useEffect(() => {
        if (socket) {

            socket.on("room update", (data) => {
                dispatch(setRoom(data))
            })

            return () => {
                dispatch(setRoom({}))
                socket.off("room update")
                socket.emit("leaving room")
            }
        }
    }, [])

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'type',
            key: 'type',
            render: (cell, row) => {
                if (row.socketID === room.admin) {
                    return <>
                        <Tag color={"orange"}>
                            PLAYER
                        </Tag>
                        <Tag color={"green"}>
                            ADMIN
                        </Tag>
                    </>
                } else {
                    return <Tag color={"orange"}>
                        PLAYER
                    </Tag>
                }
            }
        },
        {
            title: 'Action',
            key: 'action',
        },
    ];


    return (
        <>
            <Row>
                <Table rowKey="socketID" className="lobby-table" columns={columns} dataSource={room.playerList}/>
            </Row>
        </>
    );
}

export default Room;