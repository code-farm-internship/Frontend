import CartItemQuantity from '@/components/element/CartItemQuantity';
import RemoveCartItem from '@/components/element/RemoveCartItem';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { ICartItems } from '@/types/cart';
import { calculateDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { DeleteOutlined } from '@ant-design/icons';
import { TableProps, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

export const columns: TableProps<ICartItems>['columns'] = [
    {
        title: 'Sản phẩm',
        key: 'product',
        render: (_, item) => (
            <div className='flex gap-3'>
                <Link to={`/${PUBLIC_ROUTES.PRODUCT}/${item.productId._id}`} className='flex items-center space-x-4'>
                    <img
                        src={item.variantId.image}
                        alt={item.variantId.formatId.name}
                        className='h-28 w-20 rounded object-cover'
                    />
                </Link>
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
                        <span className='text-primary'>{formatCurrency(calculateDiscountPrice(item))}</span>
                        <span className='text-gray-400 line-through'>{formatCurrency(item.variantId.price)}</span>
                        {item.variantId.discountId && (
                            <span className='text-primary'>-{item.variantId.discountId.discountValue}%</span>
                        )}
                    </div>
                </div>
            </div>
        ),
    },

    {
        title: 'Đơn giá',
        key: 'price',
        render: (_, item) => <Text className='text-red-500'>{formatCurrency(item.variantId.price)}</Text>,
    },
    {
        title: 'Số lượng',
        key: 'quantity',
        render: (_, item) => <CartItemQuantity variant={item.variantId} quantity={item.quantity} />,
    },
    {
        title: 'Thành tiền',
        key: 'total',
        render: (_, item) => <span>{formatCurrency(item.variantId.price * item.quantity)}</span>,
    },
    {
        title: '',
        key: 'actions',
        render: (_, item) => (
            <RemoveCartItem variantId={item.variantId._id}>
                <div className='inline-block cursor-pointer rounded-full bg-red-500 px-2 py-1 duration-300 hover:bg-red-400'>
                    <DeleteOutlined style={{ color: '#fff' }} />
                </div>
            </RemoveCartItem>
        ),
    },
];
