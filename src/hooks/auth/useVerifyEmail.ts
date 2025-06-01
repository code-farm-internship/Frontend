import { QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { authService } from '@/services/auth.service';
import { IErrorResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';

const useVerifyEmail = () => {
    const toast = useToast();

    return useMutation({
        mutationKey: [QUERY_KEYS.AUTH.VERIFY_EMAIL],
        mutationFn: (token: string) => authService.verifyEmail(token),
        onSuccess(res) {
            console.log(res);
        },
        onError(error: IErrorResponse) {
            toast('error', error.response.data.message);
        },
    });
};

export default useVerifyEmail;
