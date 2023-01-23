import React, {useState} from 'react';
import {Button, Card, Checkbox, Col, Divider, Form, Input, Row, Space, Switch} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {guestLogin} from "../../redux/auth";
import {useNavigate} from "react-router-dom";

function Login(props) {


    const [guest, setGuest] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = (values) => {
        if (guest) {
            dispatch(guestLogin(values))
            navigate("/")
        }
    };

    return (
        <Row className="login-container">
            <Card>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: !guest,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            disabled={guest}
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox disabled={guest}>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Row justify="space-around">
                            <Col>Guest:</Col>
                            <Col>
                                <Switch disabled={true} defaultChecked={guest} onClick={() => {
                                    setGuest(prevState => !prevState)
                                }}/>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row justify="center">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        </Row>

    );
}

export default Login;