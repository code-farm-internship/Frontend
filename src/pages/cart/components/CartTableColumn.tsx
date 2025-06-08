import CartItemQuantity from '@/components/element/CartItemQuantity';
import RemoveCartItem from '@/components/element/RemoveCartItem';
import { ICartItems } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';
import { DeleteOutlined } from '@ant-design/icons';
import { TableProps } from 'antd';
import CheckboxCartDetail from './CheckboxCartDetail';
import ProductInfoItemColumn from './ProductInfoItemColumn';

export const cartColumns: TableProps<ICartItems>['columns'] = [
    {
        title: <CheckboxCartDetail type='all' />,
        key: 'isSelected',
        render: (_, item) => (
            <CheckboxCartDetail type='item' isSeleted={item.isSelected} variantId={item.variantId._id} />
        ),
    },
    {
        title: 'Sản phẩm',
        key: 'product',
        render: (_, item) => <ProductInfoItemColumn item={item} />,
    },
    {
        title: 'Số lượng',
        key: 'quantity',
        render: (_, item) => <CartItemQuantity variant={item.variantId} quantity={item.quantity} />,
        responsive: ['lg'],
    },
    {
        title: 'Thành tiền',
        key: 'total',
        render: (_, item) => <span>{formatCurrency(item.variantId.price * item.quantity)}</span>,
        responsive: ['lg'],
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
