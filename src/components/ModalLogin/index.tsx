import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import './ModalLogin.scss'
import logo from 'src/assets/images/logo.png'
import userAPI from 'src/api/user'
import { useDispatch } from 'react-redux'
import { login } from "src/redux/auth";
type Props = {
    visible: boolean,
    onCancel: () => void,
}

const ModalType = {
    Login: 'Login',
    Register: 'Register',
    ForgetPassword: 'ForgetPassword',
}

const ModalLogin = (props: Props) => {
    const [form] = useForm()
    const dispatch =useDispatch()

    const [modalType, setModalType] = React.useState(ModalType.Login)

    const handleLogin = async () => {
        const res = await userAPI.login(form.getFieldsValue())
        if(!res){

        }else{
            localStorage.setItem("token", res.data.token)
            dispatch(login(res.data))
            props.onCancel();
        }
    }

    const handleRegister = () => {
        console.log(form.getFieldsValue)
    }

    const handleForgetPassword = () => {
        console.log(form.getFieldsValue)
    }

    return (
        <Modal
            visible={props.visible}
            onCancel={() => {
                props.onCancel();
                setModalType(ModalType.Login);
            }}
            footer={null}
            closable={false}
            className="modal-login"
            width={600}
            destroyOnClose
        >
            <div className="modal-content">
                <div className="logo">
                    <img src={logo} alt="logo" width={100} />
                </div>
                {modalType === ModalType.Login ?
                    <Form form={form} onFinish={handleLogin}>
                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder='Email' className='custom-input' />
                        </Form.Item>
                        <Form.Item
                            className='password'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters!',
                                },
                            ]}
                        >
                            <Input.Password placeholder='Password' className='custom-input' />
                        </Form.Item>
                        <div className='forget-password'><span onClick={() => setModalType(ModalType.ForgetPassword)}>Forget password?</span></div>
                        <Form.Item className='btn-submit'>
                            <button className='btn' type='submit'>
                                Login
                            </button>
                        </Form.Item>
                        <div className="register">Do not have account? <span onClick={() => setModalType(ModalType.Register)}>Free register</span></div>
                    </Form>
                    :
                    modalType === ModalType.Register ?
                        <Form form={form} onFinish={handleRegister}>
                            <Form.Item
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder='Email' className='custom-input' />
                            </Form.Item>

                            <Form.Item
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        min: 6,
                                        message: 'Password must be at least 6 characters!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder='Password' className='custom-input' />
                            </Form.Item>
                            <Form.Item
                                name='rePassword'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder='Retype password' className='custom-input' />
                            </Form.Item>
                            <Form.Item className='btn-submit'>
                                <button className='btn' type='submit'>
                                    Register
                                </button>
                            </Form.Item>
                            <div className="register">Already have account? <span onClick={() => setModalType(ModalType.Login)}>Login</span></div>
                        </Form>
                        :
                        <Form form={form} onFinish={handleForgetPassword}>
                            <Form.Item
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                ]}
                            >
                                <Input placeholder='Email' className='custom-input' />
                            </Form.Item>
                            <Form.Item className='btn-submit'>
                                <button className='btn' type='submit'>
                                    Send mail
                                </button>
                            </Form.Item>
                            <div className="register">Already have account? <span onClick={() => setModalType(ModalType.Login)}>Login</span></div>
                        </Form>
                }
            </div>
        </Modal >
    )
}

export default ModalLogin