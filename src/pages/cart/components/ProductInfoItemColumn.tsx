import CartItemQuantity from '@/components/element/CartItemQuantity';
import { BREAK_POINT } from '@/constants/breakpoints';
import { PUBLIC_ROUTES } from '@/constants/routes';
import useWindowSize from '@/hooks/common/useWindowSize';
import { ICartItems } from '@/types/cart';
import { calculateDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    item: ICartItems;
};

const ProductInfoColumnItem = ({ item }: Props) => {
    const { windowWidth } = useWindowSize();

    return (
        <div className='flex gap-3'>
            <div className='min-w-8'>
                <img
                    src={item.variantId.image}
                    alt={item.variantId.formatId.name}
                    className='w-14 rounded object-cover md:w-20'
                />
            </div>
            <div className='space-y-2'>
                <div className='flex items-baseline gap-2'>
                    <Link to={`/${PUBLIC_ROUTES.PRODUCT}/${item.productId._id}`}>
                        <span>{item.productId.name}</span>
                    </Link>
                    <span className='rounded-sm border border-black/30 bg-white px-1 text-xs capitalize'>
                        {item.variantId.formatId.name}
                    </span>
                </div>
                <div className='flex gap-2'>
                    <span className='text-primary'>{formatCurrency(calculateDiscountPrice(item.variantId))}</span>
                    <span className='text-gray-400 line-through'>{formatCurrency(item.variantId.price)}</span>
                    {item.variantId.discountId && (
                        <span className='text-primary'>-{item.variantId.discountId.discountValue}%</span>
                    )}
                </div>
                {windowWidth < BREAK_POINT.LG && <CartItemQuantity variant={item.variantId} quantity={item.quantity} />}
            </div>
        </div>
    );
};

export default memo(ProductInfoColumnItem);
