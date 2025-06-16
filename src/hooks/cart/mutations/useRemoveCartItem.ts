import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { cartService } from '@/services/cart.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useRemoveCartItem = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationKey: [TANSTACK_QUERY_KEYS.CART.REMOVE],
        mutationFn: (id: string) => cartService.removeCartItem(id),
        onSuccess() {
            void queryClient.invalidateQueries({ queryKey: [TANSTACK_QUERY_KEYS.CART.ALL] });
        },
        onError() {
            toast('error', 'Xóa thất bại');
        },
    });
};

export default useRemoveCartItem;
