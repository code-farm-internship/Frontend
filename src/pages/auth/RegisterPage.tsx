import { GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import useRegister from '@/hooks/auth/mutations/useRegister';
import { Provider } from '@/types/auth';
import { registerSchema } from '@/validations/auth/register';

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const { mutate: register, isPending } = useRegister();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            retypePassword: '',
        },
    });

    const onSubmit = (payload: RegisterForm) => {
        register(
            {
                email: payload.email,
                username: payload.username,
                password: payload.password,
                provider: Provider.email,
            },
            {
                onSettled() {
                    reset();
                },
            },
        );
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

                <Form
                    onFinish={() => {
                        void handleSubmit(onSubmit)();
                    }}
                    layout='vertical'
                >
                    <Form.Item label='Email' validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='Nhập email' />}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Username'
                        validateStatus={errors.username ? 'error' : ''}
                        help={errors.username?.message}
                    >
                        <Controller
                            name='username'
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='Nhập username' />}
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

                    <Form.Item
                        label='Nhập lại mật khẩu'
                        validateStatus={errors.retypePassword ? 'error' : ''}
                        help={errors.retypePassword?.message}
                    >
                        <Controller
                            name='retypePassword'
                            control={control}
                            render={({ field }) => <Input.Password {...field} placeholder='Nhập lại mật khẩu' />}
                        />
                    </Form.Item>

                    <Button className='my-2 mb-4 w-full' type='primary' htmlType='submit' loading={isPending}>
                        Đăng ký
                    </Button>
                </Form>
                <div className='text-center text-sm text-gray-700'>
                    <span>Đã có tài khoản? </span>
                    <Link to='/auth/login'>
                        <Button size='small' className='ml-1 bg-gray-200 text-gray-800 hover:bg-gray-300'>
                            Đăng nhập
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
