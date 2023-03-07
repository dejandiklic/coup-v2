import React, {useContext} from 'react';
import {Form, Modal} from "antd";
import Password from "antd/es/input/Password";
import {setRoom} from "../../../redux/rooms";
import {useDispatch} from "react-redux";
import {SocketContext} from "../../../context/SocketContext";
import {useNavigate} from "react-router-dom";

function RoomPasswordModal({show, setShow, roomName}) {


    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const {socket} = useContext(SocketContext);
    const navigate = useNavigate()

    const handleCancel = () => {
        setShow(false)
    }

    const onFinish = () => {
        form.submit()
    }

    const handleSubmit = (data) => {
        data.roomName = roomName
        data.playerID = socket.id
        socket.emit("room password submit", data, (response) => {
            if (response.error) {
                form.setFields([
                    {
                        name: 'password',
                        errors: [response.error],
                    }
                ])
            } else {
                dispatch(setRoom(response.room))
                navigate(`/lobby/${response.room.name}`)
                setShow(false)
            }
        })
    }

    return (
        <Modal title="Enter password" open={show} onCancel={handleCancel} onOk={onFinish} okText="Create">
            <Form
                name="normal_login"
                className="login-form"
                form={form}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Password is required"
                        },
                    ]}
                >
                    <Password placeholder="Password"/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default RoomPasswordModal;