import emptyCartIcon from '@/assets/icons/ico_emptycart.svg';
import { useCartStore } from '@/store/cartStore';
import { ICartItems } from '@/types/cart';
import { calculateTotalDiscountedPrice, calculateTotalDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button, Table, Typography } from 'antd';
import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartColumns } from './components/CartTableColumn';
import '@/styles/customAntd.css';

const { Title, Text } = Typography;

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const cartItems = useCartStore((state) => state.items);

    const { totalPrice, totalDiscountedPrice, totalPriceNotDiscount } = useMemo(() => {
        const totalPrice = cartItems.reduce((prev, curr) => {
            if (!curr.isSelected) return prev;
            const discountPrice = calculateTotalDiscountPrice(curr);
            return prev + discountPrice;
        }, 0);
        const totalPriceNotDiscount = cartItems.reduce((prev, curr) => {
            if (!curr.isSelected) return prev;
            const discountPrice = calculateTotalDiscountPrice(curr, false);
            return prev + discountPrice;
        }, 0);

        const totalDiscountedPrice = cartItems.reduce((prev, curr) => {
            if (!curr.isSelected) return prev;
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
                    columns={cartColumns}
                    pagination={false}
                    rowKey={(item) => item.variantId._id}
                    locale={{
                        emptyText: (
                            <div className='flex items-center justify-center'>
                                <div className='space-y-3'>
                                    <div className='flex justify-center'>
                                        <img src={emptyCartIcon} alt='empty' />
                                    </div>
                                    <div>
                                        <span className='text-gray-500'>
                                            Chưa có sản phẩm nào trong giỏ hàng của bạn
                                        </span>
                                    </div>
                                    <div>
                                        <Link
                                            className='inline-block rounded-md bg-primary px-6 py-2 text-white duration-300 hover:bg-red-500/95 hover:text-white'
                                            to={`/`}
                                        >
                                            Mua sắm ngay
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ),
                    }}
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
                            disabled={totalPrice === 0}
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
