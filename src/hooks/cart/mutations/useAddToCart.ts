import { QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { cartService } from '@/services/cart.service';
import { useCartStore } from '@/store/cartStore';
import { ICartPayload } from '@/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddToCart = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const setToggleCart = useCartStore((state) => state.toggleCart);

    return useMutation({
        mutationKey: [QUERY_KEYS.CART.ADD],
        mutationFn: (payload: ICartPayload) => cartService.addToCart(payload),
        onSuccess() {
            void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART.ALL] });
            setToggleCart();
        },
        onError() {
            toast('error', 'Thêm sản phẩm thất bại');
        },
    });
};

export default useAddToCart;
