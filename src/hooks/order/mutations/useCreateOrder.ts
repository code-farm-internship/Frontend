import { PUBLIC_ROUTES } from '@/constants/routes';
import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { orderService } from '@/services/order.service';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { IOrderPayload } from '@/types/order';
import { IErrorResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useCreateOrder = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const reset = useCheckoutStore((state) => state.reset);
    const resetCart = useCartStore((state) => state.reset);
    return useMutation({
        mutationKey: [TANSTACK_QUERY_KEYS.ORDER.CREATE],
        mutationFn: (body: IOrderPayload) => orderService.createOrder(body),
        onSuccess() {
            toast('success', 'Đặt hàng thành công');
            reset();
            resetCart();
            void navigate(`/${PUBLIC_ROUTES.ORDER_SUCCESS}`);
        },
        onError(err: IErrorResponse) {
            toast('error', err.response.data.message);
        },
    });
};

export default useCreateOrder;
