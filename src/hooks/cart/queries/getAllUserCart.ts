import { QUERY_KEYS } from '@/constants/queryKeys';
import { cartService } from '@/services/cart.service';
import { useCartStore } from '@/store/cartStore';
import { useQuery } from '@tanstack/react-query';

const useGetAllUserCart = () => {
    const setCartItems = useCartStore((state) => state.setCartItems);
    const setIsLoading = useCartStore((state) => state.setIsLoading);
    return useQuery({
        queryKey: [QUERY_KEYS.CART.ALL],
        queryFn: async () => {
            setIsLoading(true);
            const res = await cartService.getUserCart();
            setCartItems(res.items);
            return res;
        },
    });
};

export default useGetAllUserCart;
