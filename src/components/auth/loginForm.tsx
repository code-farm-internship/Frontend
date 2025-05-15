import { Form, Input, Button, Checkbox, message, FormProps } from 'antd';
import { Link } from 'react-router-dom';

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
        <div className="flex min-h-screen flex-col items-center justify-center bg-[url('https://i.pinimg.com/originals/a8/9a/87/a89a87cd8e488110798dce4edb14706a.jpg')] bg-cover bg-center bg-no-repeat px-4">
            <h1 className='mb-6 text-center text-3xl font-bold uppercase tracking-wide text-blue-600 md:text-4xl'>
                Chào mừng bạn đến với Aya Book
            </h1>

            <main className='relative w-full max-w-md rounded-xl bg-white/60 p-8 shadow-md backdrop-blur-md'>
                <button className='absolute right-4 top-4 h-8 w-8 rounded bg-cyan-300 text-center text-2xl leading-7 text-black hover:bg-red-400'>
                    ×
                </button>

                <h2 className='mb-6 text-center text-xl font-bold text-cyan-400'>Đăng nhập</h2>

                <Form<LoginFormValues>
                    name='login'
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name='email'
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder='Email' prefix='📧' />
                    </Form.Item>

                    <Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                        <Input.Password placeholder='Mật khẩu' prefix='🔒' />
                    </Form.Item>

                    <div className='mb-3 flex justify-between text-sm text-cyan-500'>
                        <Form.Item name='remember' valuePropName='checked' noStyle>
                            <Checkbox>Nhớ mật khẩu</Checkbox>
                        </Form.Item>
                        <a href='#' className='hover:underline'>
                            Quên mật khẩu
                        </a>
                    </div>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='w-full bg-gradient-to-b from-cyan-300 to-blue-300 font-bold text-black hover:opacity-90'
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <div className='text-center text-sm text-cyan-600'>
                        <span className='mr-2'>Sẵn sàng tạo tài khoản?</span>
                        <Link to='/register'>
                            <Button size='small' className='bg-gray-300 text-gray-800 hover:bg-gray-400'>
                                Đăng ký ngay
                            </Button>
                        </Link>
                    </div>
                </Form>
            </main>
        </div>
    );
}
