import { Form, Input, Checkbox, Button, message, FormProps } from 'antd';
import { Link } from 'react-router-dom';

interface RegisterFormValues {
    email: string;
    password: string;
    name: string;
    agreement: boolean;
}

export default function RegisterForm() {
    const onFinish: FormProps<RegisterFormValues>['onFinish'] = (values) => {
        console.log('Success:', values);
        message.success('Đăng ký thành công!');
    };

    const onFinishFailed: FormProps<RegisterFormValues>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Vui lòng kiểm tra lại thông tin!');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('https://i.pinimg.com/originals/a8/9a/87/a89a87cd8e488110798dce4edb14706a.jpg')] bg-cover bg-center bg-no-repeat px-4">
            <main className='relative w-full max-w-md rounded-xl bg-white/60 p-8 shadow-md backdrop-blur-md'>
                <button className='absolute right-4 top-4 h-8 w-8 rounded bg-cyan-300 text-center text-2xl leading-7 text-black hover:bg-red-400'>
                    ×
                </button>

                <h2 className='mb-6 text-center text-xl font-bold text-cyan-400'>Đăng ký</h2>

                <Form<RegisterFormValues>
                    layout='vertical'
                    name='register'
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

                    <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder='Tên của bạn' prefix='👤' />
                    </Form.Item>

                    <Form.Item
                        name='agreement'
                        valuePropName='checked'
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Bạn cần đồng ý với điều khoản')),
                            },
                        ]}
                    >
                        <Checkbox className='text-cyan-600'>Tôi đồng ý với các điều khoản</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='w-full bg-gradient-to-b from-cyan-300 to-blue-300 font-bold text-black hover:opacity-90'
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <div className='text-center text-sm text-cyan-600'>
                        <span className='mr-2'>Sẵn sàng tạo tài khoản?</span>
                        <Link to='/login'>
                            <Button size='small' className='bg-gray-300 text-gray-800 hover:bg-gray-400'>
                                Đăng nhập ngay
                            </Button>
                        </Link>
                    </div>
                </Form>
            </main>
        </div>
    );
}
