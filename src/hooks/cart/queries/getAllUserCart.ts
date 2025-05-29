import { QUERY_KEYS } from '@/constants/queryKeys';
import { cartServie } from '@/services/cart.service';
import { useCartStore } from '@/store/cartStore';
import { useQuery } from '@tanstack/react-query';

const useGetAllUserCart = () => {
    const setCartQuantity = useCartStore((state) => state.setCartQuantity);
    return useQuery({
        queryKey: [QUERY_KEYS.CART.ALL],
        queryFn: async () => {
            const res = await cartServie.getUserCart();
            setCartQuantity(res.items.length);
            return res;
        },
    });
};

export default useGetAllUserCart;
