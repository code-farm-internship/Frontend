import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { cartService } from '@/services/cart.service';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useQuery } from '@tanstack/react-query';

const useGetAllUserCart = () => {
    const setCartItems = useCartStore((state) => state.setCartItems);
    const setCoupons = useCheckoutStore((state) => state.setCoupons);
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.CART.ALL],
        queryFn: async () => {
            const res = await cartService.getUserCart();
            setCartItems(res.cart.items);
            setCoupons(res.coupons);
            return res;
        },
    });
};

export default useGetAllUserCart;
