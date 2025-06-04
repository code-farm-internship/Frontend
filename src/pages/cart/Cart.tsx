import useGetAllUserCart from '@/hooks/cart/queries/getAllUserCart';
import { ICartItems } from '@/types/cart';
import { calculateTotalDiscountedPrice, calculateTotalDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button, Table, Typography } from 'antd';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { columns } from './components/CartTableColumn';

const { Title, Text } = Typography;

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { data: cartResponse, isLoading } = useGetAllUserCart();
    const cartItems = useMemo(() => cartResponse?.items, [cartResponse]);
    const { totalPrice, totalDiscountedPrice, totalPriceNotDiscount } = useMemo(() => {
        const totalPrice = cartItems?.reduce((prev, curr) => {
            const discountPrice = calculateTotalDiscountPrice(curr);
            return prev + discountPrice;
        }, 0);
        const totalPriceNotDiscount = cartItems?.reduce((prev, curr) => {
            const discountPrice = calculateTotalDiscountPrice(curr, false);
            return prev + discountPrice;
        }, 0);

        const totalDiscountedPrice = cartItems?.reduce((prev, curr) => {
            const discountPrice = calculateTotalDiscountedPrice(curr);
            return prev + discountPrice;
        }, 0);
        return { totalPrice, totalPriceNotDiscount, totalDiscountedPrice };
    }, [cartItems]);

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <Title level={2}>Giỏ hàng</Title>

            <div className='rounded-lg bg-white p-6 shadow-sm'>
                <Table<ICartItems>
                    dataSource={cartItems}
                    loading={isLoading}
                    columns={columns}
                    pagination={false}
                    rowKey='id'
                />

                <div className='mt-8 flex justify-end'>
                    <div className='w-80 space-y-4'>
                        <div className='flex justify-between'>
                            <Text>Tạm tính:</Text>
                            <Text className='font-bold text-red-500'>{formatCurrency(totalPriceNotDiscount || 0)}</Text>
                        </div>
                        <div className='flex justify-between'>
                            <Text>Giảm giá:</Text>
                            <Text className='text-red-500'>{formatCurrency(totalDiscountedPrice || 0)}</Text>
                        </div>
                        <div className='flex justify-between border-t pt-4'>
                            <Text strong>Thành tiền:</Text>
                            <Text className='text-xl font-bold text-red-500'>{formatCurrency(totalPrice || 0)}</Text>
                        </div>
                        <Button
                            type='primary'
                            size='large'
                            block
                            onClick={() => {
                                void navigate('/checkout');
                            }}
                        >
                            Tiến hành thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
