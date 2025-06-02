import { QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { authService } from '@/services/auth.service';
import { IRegisterPayload } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from '@/types/response';

const useRegister = () => {
    const toast = useToast();
    return useMutation({
        mutationKey: [QUERY_KEYS.AUTH.REGISTER],
        mutationFn: (body: IRegisterPayload) => authService.register(body),
        onSuccess() {
            toast('info', 'Tạo tài khoản thành công. Vui lòng kiểm tra email để xác thực tài khoản.');
        },
        onError(error: IErrorResponse) {
            toast('error', error.response.data.message);
        },
    });
};

export default useRegister;
