import React from 'react';
import { Typography, Button, InputNumber, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { bestSellers } from '../data/mock-data';

const { Title, Text } = Typography;

interface Book {
    id: string;
    title: string;
    coverImage: string;
    price: number;
}

interface CartItem extends Book {
    quantity: number;
}

const Cart: React.FC = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = React.useState<CartItem[]>(
        bestSellers.slice(0, 2).map((book) => ({
            ...book,
            quantity: 1,
        })),
    );

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const columns = [
        {
            title: 'Sản phẩm',
            key: 'product',
            render: (_: unknown, item: CartItem) => (
                <div className='flex items-center space-x-4'>
                    <img src={item.coverImage} alt={item.title} className='h-28 w-20 rounded object-cover' />
                    <div>
                        <Text strong>{item.title}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            key: 'price',
            render: (_: unknown, item: CartItem) => (
                <Text className='text-red-500'>{item.price.toLocaleString('vi-VN')}đ</Text>
            ),
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            render: (_: unknown, item: CartItem) => (
                <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => {
                        const newCartItems = cartItems.map((cartItem) =>
                            cartItem.id === item.id ? { ...cartItem, quantity: value ?? 1 } : cartItem,
                        );
                        setCartItems(newCartItems);
                    }}
                />
            ),
        },
        {
            title: 'Thành tiền',
            key: 'total',
            render: (_: unknown, item: CartItem) => (
                <Text className='font-bold text-red-500'>{(item.price * item.quantity).toLocaleString('vi-VN')}đ</Text>
            ),
        },
        {
            title: '',
            key: 'actions',
            render: (_: unknown, item: CartItem) => (
                <Button
                    type='text'
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
                    }}
                />
            ),
        },
    ];

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <Title level={2}>Giỏ hàng</Title>

            <div className='rounded-lg bg-white p-6 shadow-sm'>
                <Table dataSource={cartItems} columns={columns} pagination={false} rowKey='id' />

                <div className='mt-8 flex justify-end'>
                    <div className='w-80 space-y-4'>
                        <div className='flex justify-between'>
                            <Text>Tạm tính:</Text>
                            <Text className='font-bold text-red-500'>{total.toLocaleString('vi-VN')}đ</Text>
                        </div>
                        <div className='flex justify-between'>
                            <Text>Giảm giá:</Text>
                            <Text className='text-red-500'>0đ</Text>
                        </div>
                        <div className='flex justify-between border-t pt-4'>
                            <Text strong>Thành tiền:</Text>
                            <Text className='text-xl font-bold text-red-500'>{total.toLocaleString('vi-VN')}đ</Text>
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
