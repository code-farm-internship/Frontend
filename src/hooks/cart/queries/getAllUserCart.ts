import { QUERY_KEYS } from '@/constants/queryKeys';
import { cartService } from '@/services/cart.service';
import { useCartStore } from '@/store/cartStore';
import { useCouponStore } from '@/store/couponStore';
import { useQuery } from '@tanstack/react-query';

const useGetAllUserCart = () => {
    const setCartItems = useCartStore((state) => state.setCartItems);
    const setCoupons = useCouponStore((state) => state.setCoupons);
    return useQuery({
        queryKey: [QUERY_KEYS.CART.ALL],
        queryFn: async () => {
            const res = await cartService.getUserCart();
            setCartItems(res.cart.items);
            setCoupons(res.coupons);
            return res;
        },
    });
};

export default useGetAllUserCart;
