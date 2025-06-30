import CartItemQuantity from '@/components/element/CartItemQuantity';
import RemoveCartItem from '@/components/element/RemoveCartItem';
import { ICartItems } from '@/types/cart';
import { calculateDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { DeleteOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

type CartItem = {
    item: ICartItems;
};

const CartItem = ({ item }: CartItem) => {
    const discountPrice = useMemo(() => {
        return calculateDiscountPrice(item.variantId);
    }, [item]);

    return (
        <>
            <List.Item className='relative'>
                <div className='flex gap-4'>
                    <Link to={`/product/${item.productId._id}`} className='w-14'>
                        <img src={item.variantId.image} className='w-full object-contain' />
                    </Link>
                    <div className='space-y-2'>
                        <div className='flex gap-2'>
                            <Link
                                className='text-base font-medium duration-300 hover:text-primary'
                                to={`/product/${item.productId._id}`}
                            >
                                {item.productId.name}
                            </Link>
                            <span className='flex items-center justify-center rounded-sm border border-black/30 bg-white px-1 text-xs capitalize'>
                                {item.variantId.formatId.name}
                            </span>
                        </div>

                        <div className='flex gap-2'>
                            <span className='text-primary'>{formatCurrency(discountPrice)}</span>
                            <span className='text-gray-400 line-through'>{formatCurrency(item.variantId.price)}</span>
                            <span className='text-primary'>-{item.variantId.discountId?.discountValue}%</span>
                        </div>
                        <CartItemQuantity variant={item.variantId} quantity={item.quantity} />
                    </div>
                </div>
                <RemoveCartItem variantId={item.variantId._id}>
                    <div className='absolute right-0 top-3 cursor-pointer rounded-full bg-red-500 px-2 py-1 duration-300 hover:bg-red-400'>
                        <DeleteOutlined style={{ color: '#fff' }} />
                    </div>
                </RemoveCartItem>
            </List.Item>
        </>
    );
};

export default memo(CartItem);
