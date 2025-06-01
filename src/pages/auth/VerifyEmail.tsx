import successVerifyIcon from '@/assets/icons/email-is-active.svg';
import failVerifyIcon from '@/assets/icons/email-token-expired-new.svg';
import { useToast } from '@/contexts/ToastProvider';
import useResendVerifyEmail from '@/hooks/auth/useResendVerifyEmail';
import useVerifyEmail from '@/hooks/auth/useVerifyEmail';
import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('tk');
    const { mutate: verifyEmail, isSuccess, isError } = useVerifyEmail();
    const { mutate: resendVerifyEmail, isPending } = useResendVerifyEmail();
    const [retry, setRetry] = useState(0);
    const toast = useToast();
    const navigate = useNavigate();

    const handleResetVerifyEmail = (email: string) => {
        resendVerifyEmail({ email });
        setRetry((prevState) => prevState + 1);
    };

    const handleLogin = useCallback(() => {
        void navigate('/auth/login');
    }, [navigate]);

    useEffect(() => {
        if (token) {
            verifyEmail(token, {
                onSuccess() {
                    searchParams.delete('token');
                    searchParams.delete('tk');
                    setSearchParams(searchParams, { replace: true });
                },
                onError() {
                    searchParams.delete('token');
                    setSearchParams(searchParams, { replace: true });
                },
            });
        }
        if (!token || !email) {
            void navigate('/', { replace: true });
        }
    }, []);

    useEffect(() => {
        if (retry && retry >= 5) {
            toast('info', 'Bạn đã thử quá nhiều lần vui lòng thử lại sau ');
        }
    }, [retry, toast]);

    return (
        <div className='mx-auto my-10 w-1/2'>
            <div className='text-center'>
                {isSuccess && (
                    <>
                        <div className='flex items-center justify-center'>
                            <img src={successVerifyIcon} alt='' className='w-20 select-none' />
                        </div>
                        <p>
                            Cảm ơn bạn, email của bạn đã được xác minh thành công. Tài khoản của bạn hiện đã được kích
                            hoạt. Vui lòng nhấp vào nút Đăng nhập để truy cập vào tài khoản của bạn.
                        </p>

                        <Button
                            disabled={isPending}
                            loading={isPending}
                            className='my-2 inline-block cursor-pointer rounded-lg bg-primary font-semibold text-white duration-300 hover:opacity-90'
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                    </>
                )}
                {isError && (
                    <div>
                        <div className='flex items-center justify-center'>
                            <img src={failVerifyIcon} alt='' className='w-20 select-none' />
                        </div>
                        <p className='mt-6'>
                            Rất tiếc, đã xảy ra lỗi khi xác minh email của bạn. Vui lòng thử lại hoặc liên hệ với bộ
                            phận hỗ trợ để được giúp đỡ.
                        </p>
                        {email && (
                            <Button
                                disabled={isPending || retry >= 3}
                                loading={isPending}
                                className='my-2 inline-block cursor-pointer rounded-lg bg-primary font-semibold text-white duration-300 hover:opacity-90'
                                onClick={() => {
                                    if (email) {
                                        handleResetVerifyEmail(email);
                                    }
                                }}
                            >
                                Gửi lại token
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
