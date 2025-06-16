import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { authService } from '@/services/auth.service';
import { IErrorResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';

const useResendVerifyEmail = () => {
    const toast = useToast();

    return useMutation({
        mutationKey: [TANSTACK_QUERY_KEYS.AUTH.RESEND_VERIFY_EMAIL],
        mutationFn: (body: { email: string }) => authService.resendVerifyEmail(body),
        onSuccess(res) {
            console.log(res);
        },
        onError(error: IErrorResponse) {
            toast('error', error.response.data.message);
        },
    });
};

export default useResendVerifyEmail;
