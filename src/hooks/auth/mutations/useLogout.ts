import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { authService } from '@/services/auth.service';
import { useUserStore } from '@/store/userStore';
import { IErrorResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const setAuthenticate = useUserStore((state) => state.setAuthenicate);
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    return useMutation({
        mutationKey: [TANSTACK_QUERY_KEYS.AUTH.LOGOUT],
        mutationFn: () => authService.logout(),
        onSuccess() {
            setUserInfo({ avatar: '', email: '', username: '' }); // Xóa thông tin người dùng bằng cách đổi về trạng thái rỗng
            setAuthenticate(false); // Cập nhật trạng thái xác thực
            localStorage.removeItem('accessToken'); // Xóa token
            toast('success', 'Đăng xuất thành công.');
            void navigate('/', { replace: true });
        },
        onError(error: IErrorResponse) {
            toast('error', error.response.data.message);
        },
    });
};

export default useLogout;
