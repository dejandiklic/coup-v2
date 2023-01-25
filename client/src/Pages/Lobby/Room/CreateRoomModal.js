import React, {useContext} from 'react';
import {Form, Input, Modal, Select} from "antd";
import Password from "antd/es/input/Password";
import {SocketContext} from "../../../context/SocketContext";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setRoom} from "../../../redux/rooms";

function CreateRoomModal({show, setShow}) {


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
        setShow(false)
        socket.emit("new room", data, (resp) => {
            dispatch(setRoom(resp))
            navigate(`/lobby/${resp.name}`)
        })
    }


    return (
        <Modal title="New Room" open={show} onCancel={handleCancel} onOk={onFinish} okText="Create">
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
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter room name!',
                        },
                    ]}
                >
                    <Input placeholder="Name"/>
                </Form.Item>

                <Form.Item
                    name="type"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue="public"
                >
                    <Select
                        options={[
                            {
                                value: 'private',
                                label: 'PRIVATE',
                            },
                            {
                                value: 'public',
                                label: 'PUBLIC',
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
                >
                    {({getFieldValue}) =>
                        getFieldValue('type') === 'private' ? (
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Password placeholder="Password"/>
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateRoomModal;