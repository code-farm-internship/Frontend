import { Form, Input, Button, Checkbox, message, FormProps } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms?: boolean;
}

export default function LoginPage() {
    const onFinish: FormProps<RegisterFormValues>['onFinish'] = (values) => {
        console.log('Register Success:', values);
        message.success('Đăng ký thành công!');
    };

    const onFinishFailed: FormProps<RegisterFormValues>['onFinishFailed'] = (errorInfo) => {
        console.log('Register Failed:', errorInfo);
        message.error('Vui lòng kiểm tra lại thông tin đăng ký.');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('https://image.shutterstock.com/image-photo/cozy-home-library-interior-collection-260nw-2096092468.jpg')] bg-cover bg-center px-4">
            <div className='w-full max-w-md rounded-xl bg-white/80 p-8 shadow-2xl backdrop-blur-md'>
                <h1 className='mb-6 text-center text-3xl font-bold tracking-wide text-gray-900'>Aya Book</h1>

                <h2 className='mb-6 text-center text-xl font-semibold text-gray-700'>Đăng ký tài khoản</h2>

                <div className='mb-6 flex flex-col gap-3'>
                    <Button
                        icon={<GoogleOutlined />}
                        className='flex w-full items-center justify-center rounded-md border border-[#DADCE0] text-base font-medium text-[#ea4335] hover:border-[#DADCE0]'
                        style={{
                            height: '48px',
                            backgroundColor: '#fff',
                        }}
                    >
                        Login with Google
                    </Button>
                </div>

                <div className='my-6 flex items-center'>
                    <div className='flex-grow border-t-2 border-gray-900'></div>
                    <span className='mx-4 text-base font-medium text-gray-500'>or</span>
                    <div className='flex-grow border-t-2 border-gray-900'></div>
                </div>

                <Form<RegisterFormValues>
                    name='register'
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder='Email' size='large' />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        label='Mật khẩu'
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Mật khẩu' size='large' />
                    </Form.Item>

                    <Form.Item
                        name='agreeToTerms'
                        valuePropName='checked'
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Bạn phải đồng ý điều khoản!')),
                            },
                        ]}
                    >
                        <Checkbox>
                            Tôi đồng ý với{' '}
                            <a href='#' className='text-blue-500 hover:underline'>
                                Điều khoản dịch vụ
                            </a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            size='large'
                            className='w-full bg-blue-500 font-semibold text-white hover:bg-blue-600'
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>

                <div className='text-center text-sm text-gray-700'>
                    <span>Đã có tài khoản? </span>
                    <Link to='/login'>
                        <Button size='small' className='ml-1 bg-gray-200 text-gray-800 hover:bg-gray-300'>
                            Đăng nhập
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
