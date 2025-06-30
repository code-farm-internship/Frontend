import useGetAllUserCart from '@/hooks/cart/queries/getAllUserCart';
import useWindowSize from '@/hooks/common/useWindowSize';
import { useCartStore } from '@/store/cartStore';
import { calculateTotalDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button, Drawer, List } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './components/CartItem';
import { PUBLIC_ROUTES } from '@/constants/routes';

const CartDrawer = () => {
    const isOpen = useCartStore((state) => state.isOpen);
    const setToggleCart = useCartStore((state) => state.toggleCart);
    const { data: cartResponse, isLoading } = useGetAllUserCart();
    const cartItems = useMemo(() => cartResponse?.cart.items, [cartResponse]);
    const { windowWidth } = useWindowSize();
    const totalPrice = useMemo(
        () =>
            cartItems?.reduce((prev, curr) => {
                const discountPrice = calculateTotalDiscountPrice(curr);
                return prev + discountPrice;
            }, 0),
        [cartItems],
    );

    const handleToggleCart = () => {
        if (window.location.pathname !== `/${PUBLIC_ROUTES.CART_DETAIL}`) {
            setToggleCart();
        }
    };

    const handleResizeCartDrawer = (windowWidth: number) => {
        const lgBreakPoint = 1024;
        const mdBreakPoint = 768;

        if (windowWidth > lgBreakPoint) {
            return '36vw';
        } else if (windowWidth > mdBreakPoint) {
            return '40vw';
        } else {
            return '100vw';
        }
    };

    return (
        <Drawer
            title='Giỏ hàng'
            className='relative'
            width={handleResizeCartDrawer(windowWidth)}
            closable={{ 'aria-label': 'Close Button' }}
            onClose={handleToggleCart}
            open={isOpen}
        >
            <div className='px-2'>
                <List
                    dataSource={cartItems}
                    className='h-[56vh] w-full overflow-y-auto overflow-x-hidden pb-3'
                    renderItem={(item) => {
                        return <CartItem item={item} />;
                    }}
                    loading={isLoading}
                ></List>
                <div className='border-t border-gray-200'>
                    {cartItems && cartItems.length > 0 && (
                        <div className='mx-2 flex justify-between pt-2'>
                            <span className='font-medium'>Tổng tiền:</span>
                            <span className='text-xl font-medium'>{formatCurrency(totalPrice || 0)}</span>
                        </div>
                    )}
                    <div className='mt-3 space-y-2'>
                        {cartItems && cartItems.length > 0 && (
                            <div className='group cursor-pointer rounded-md border py-1.5 text-center duration-300 hover:border-primary'>
                                <Link to='/cart' onClick={handleToggleCart} className='block w-full hover:text-primary'>
                                    Thanh toán
                                </Link>
                            </div>
                        )}
                        <div className='text-center'>
                            <Button onClick={handleToggleCart} className='w-full'>
                                Tiếp tục mua hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
