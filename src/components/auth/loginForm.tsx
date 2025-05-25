import { Form, Input, Button, Checkbox, message, FormProps } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

interface LoginFormValues {
    email: string;
    password: string;
    remember?: boolean;
}

export default function LoginForm() {
    const onFinish: FormProps<LoginFormValues>['onFinish'] = (values) => {
        console.log('Success:', values);
        message.success('Đăng nhập thành công!');
    };

    const onFinishFailed: FormProps<LoginFormValues>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Vui lòng kiểm tra lại thông tin đăng nhập.');
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794')] bg-cover bg-center px-4">
            <div className='w-full max-w-md rounded-xl bg-white/80 p-8 shadow-2xl backdrop-blur-md'>
                <h1 className='mb-6 text-center text-3xl font-bold tracking-wide text-gray-900'>Aya Book</h1>

                <h2 className='mb-6 text-center text-xl font-semibold text-gray-700'>Đăng nhập tài khoản</h2>

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

                <Form<LoginFormValues>
                    name='login'
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
                    >
                        <Input.Password placeholder='Mật khẩu' size='large' />
                    </Form.Item>

                    <div className='mb-4 flex items-center justify-between text-sm text-gray-600'>
                        <Form.Item name='remember' valuePropName='checked' noStyle>
                            <Checkbox>Nhớ mật khẩu</Checkbox>
                        </Form.Item>
                        <a href='#' className='text-blue-500 hover:underline'>
                            Quên mật khẩu?
                        </a>
                    </div>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            size='large'
                            className='w-full bg-blue-500 font-semibold text-white hover:bg-blue-600'
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <div className='text-center text-sm text-gray-700'>
                    <span>Bạn chưa có tài khoản? </span>
                    <Link to='/register'>
                        <Button size='small' className='ml-1 bg-gray-200 text-gray-800 hover:bg-gray-300'>
                            Đăng ký ngay
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
