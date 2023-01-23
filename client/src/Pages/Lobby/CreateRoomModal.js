import React from 'react';
import {Form, Input, Modal, Select} from "antd";
import Password from "antd/es/input/Password";

function CreateRoomModal({show, setShow}) {


    const [form] = Form.useForm();


    const handleCancel = () => {
        setShow(false)
    }

    const onFinish = () => {
        form.submit()
    }

    const handleSubmit = (data) => {
        console.log(data)
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