import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { authService } from '@/services/auth.service';
import { useUserStore } from '@/store/userStore';
import { ILoginPayload } from '@/types/auth';
import { IErrorResponse } from '@/types/response';
import { setAccessToken } from '@/utils/apiHelpers';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const setAuthenticate = useUserStore((state) => state.setAuthenicate);
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    return useMutation({
        mutationKey: [TANSTACK_QUERY_KEYS.AUTH.LOGIN],
        mutationFn: (body: ILoginPayload) => authService.login(body),
        onSuccess(res) {
            setUserInfo({ avatar: res.avatar, email: res.email, username: res.username });
            setAuthenticate(true);
            setAccessToken(res.accessToken);

            toast('success', 'Đăng nhập thành công.');

            void navigate('/', { replace: true });
        },
        onError(error: IErrorResponse) {
            toast('error', error.response.data.message);
        },
    });
};

export default useLogin;
