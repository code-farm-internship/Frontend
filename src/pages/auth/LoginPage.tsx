import useLogin from '@/hooks/auth/mutations/useLogin';
import { loginSchema } from '@/validations/auth/login';
import { GoogleOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { mutate: login, isPending } = useLogin();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            usernameOrEmail: '',
            password: '',
        },
    });

    const onSubmit = (payload: LoginForm) => {
        login(payload, {
            onError() {
                setValue('password', '');
            },
        });
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

                <Form
                    onFinish={() => {
                        void handleSubmit(onSubmit)();
                    }}
                    layout='vertical'
                >
                    <Form.Item
                        label='Tài khoản'
                        validateStatus={errors.usernameOrEmail ? 'error' : ''}
                        help={errors.usernameOrEmail?.message}
                    >
                        <Controller
                            name='usernameOrEmail'
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='Nhập email hoặc username' />}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Mật khẩu'
                        validateStatus={errors.password ? 'error' : ''}
                        help={errors.password?.message}
                    >
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => <Input.Password {...field} placeholder='Nhập mật khẩu' />}
                        />
                    </Form.Item>

                    <Button
                        type='primary'
                        className='my-2 mb-4 w-full'
                        htmlType='submit'
                        disabled={isPending}
                        loading={isPending}
                    >
                        Đăng nhập
                    </Button>
                </Form>

                <div className='text-center text-sm text-gray-700'>
                    <span>Bạn chưa có tài khoản? </span>
                    <Link to='/auth/register'>
                        <Button size='small' className='ml-1'>
                            Đăng ký ngay
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
