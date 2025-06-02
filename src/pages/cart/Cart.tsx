import CartItem from '@/components/CartDrawer/components/CartItem';
import { PUBLIC_ROUTES } from '@/constants/routes';
import useGetAllUserCart from '@/hooks/cart/queries/getAllUserCart';
import { ICartItems, IVariantItem } from '@/types/cart';
import {
    calculateDiscountPrice,
    calculateTotalDiscountedPrice,
    calculateTotalDiscountPrice,
} from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table, TableProps, Typography } from 'antd';
import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { data: cartResponse, isLoading } = useGetAllUserCart();
    const cartItems = useMemo(() => cartResponse?.items, [cartResponse]);
    const totalPrice = useMemo(
        () =>
            cartItems?.reduce((prev, curr) => {
                const discountPrice = calculateTotalDiscountPrice(curr);
                return prev + discountPrice;
            }, 0),
        [cartItems],
    );
    const totalPriceNotDiscount = useMemo(
        () =>
            cartItems?.reduce((prev, curr) => {
                const discountPrice = calculateTotalDiscountPrice(curr, false);
                return prev + discountPrice;
            }, 0),
        [cartItems],
    );

    const totalDiscountedPrice = useMemo(
        () =>
            cartItems?.reduce((prev, curr) => {
                const discountPrice = calculateTotalDiscountedPrice(curr);
                return prev + discountPrice;
            }, 0),
        [cartItems],
    );

    const columns: TableProps<ICartItems>['columns'] = [
        {
            title: 'Sản phẩm',
            key: 'product',
            render: (_, item) => (
                <div className='flex gap-3'>
                    <Link
                        to={`/${PUBLIC_ROUTES.PRODUCT}/${item.productId._id}`}
                        className='flex items-center space-x-4'
                    >
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
                            <span className='text-primary'>
                                {formatCurrency(calculateDiscountPrice(item.variantId))}
                            </span>
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
            render: (_, item) => <CartItem item={item} />,
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
                <Popconfirm
                    title={<></>}
                    placement='leftTop'
                    description='Bạn có muốn xóa sản phẩm này không?'
                    onConfirm={() => {
                        console.log('OK');
                    }}
                    okText='Đồng ý'
                    cancelText='Hủy'
                >
                    <div className='inline-block cursor-pointer rounded-full bg-red-500 px-2 py-1 duration-300 hover:bg-red-400'>
                        <DeleteOutlined style={{ color: '#fff' }} />
                    </div>
                </Popconfirm>
            ),
        },
    ];

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
