import { ICartItems } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';
import { Typography } from 'antd';
import { memo } from 'react';

type Props = {
    item: ICartItems;
};

const { Text } = Typography;

const OrderItem = ({ item }: Props) => {
    return (
        <div key={item.variantId._id} className='flex items-center space-x-4 border-b py-4'>
            <img src={item.variantId.image} alt={item.productId.name} className='w-14 rounded object-cover' />

            <div className='flex-1'>
                <div className='space-x-2'>
                    <Text strong>{item.productId.name}</Text>
                    <span className='rounded-sm border border-black/30 bg-white px-1 text-xs capitalize'>
                        {item.variantId.formatId.name}
                    </span>
                </div>
                <div className='mt-1 flex gap-2'>
                    <Text>Số lượng: {item.quantity}</Text>
                    <span className='text-primary'>{formatCurrency(item.variantId.price * item.quantity)}</span>
                    {item.variantId.discountId && (
                        <span className='text-primary'>-{item.variantId.discountId.discountValue}%</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(OrderItem);
