import { QUERY_KEYS } from '@/constants/queryKeys';
import { cartService } from '@/services/cart.service';
import { ICartPayload } from '@/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateCartQuantity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEYS.CART.UPDATE],
        mutationFn: (payload: ICartPayload) => cartService.updateCartItemQuantity(payload),
        onSuccess() {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART.ALL] });
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useUpdateCartQuantity;
