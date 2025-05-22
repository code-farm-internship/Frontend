import React from 'react';
import { Typography, Button, Form, Input, Radio, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { bestSellers } from '../data/mock-data';

const { Title, Text } = Typography;

const Checkout: React.FC = () => {
    const cartItems = bestSellers.slice(0, 2).map((book) => ({
        ...book,
        quantity: 1,
    }));

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <Title level={2}>Thanh toán</Title>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                <div className='space-y-6'>
                    <div className='rounded-lg bg-white p-6 shadow-sm'>
                        <Title level={4}>THÔNG TIN NGƯỜI NHẬN</Title>
                        <Form layout='vertical'>
                            <Form.Item label='Họ và tên'>
                                <Input prefix={<UserOutlined />} defaultValue='Nguyễn Mạnh Cường' />
                            </Form.Item>
                            <Form.Item label='Số điện thoại'>
                                <Input defaultValue='0345945927' />
                            </Form.Item>
                            <Form.Item label='Email'>
                                <Input defaultValue='cuongng@gmail.com' />
                            </Form.Item>
                            <Form.Item label='Địa chỉ'>
                                <Input.TextArea rows={4} placeholder='Nhập địa chỉ' />
                            </Form.Item>
                        </Form>
                    </div>

                    <div className='rounded-lg bg-white p-6 shadow-sm'>
                        <Title level={4}>CHỌN PHƯƠNG THỨC THANH TOÁN</Title>
                        <Radio.Group className='w-full'>
                            <Space direction='vertical' className='w-full'>
                                <Radio value={1} className='w-full rounded border px-4 py-3'>
                                    Thanh toán khi nhận hàng
                                </Radio>
                                <Radio value={2} className='w-full rounded border px-4 py-3'>
                                    Ví điện tử Momo
                                </Radio>
                                <Radio value={3} className='w-full rounded border px-4 py-3'>
                                    Ví ZaloPay
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>

                <div className='rounded-lg bg-white p-6 shadow-sm'>
                    <Title level={4}>THÔNG TIN ĐƠN HÀNG</Title>
                    <div className='space-y-4'>
                        {cartItems.map((item) => (
                            <div key={item.id} className='flex items-center space-x-4 border-b py-4'>
                                <img
                                    src={item.coverImage}
                                    alt={item.title}
                                    className='h-28 w-20 rounded object-cover'
                                />
                                <div className='flex-1'>
                                    <Text strong>{item.title}</Text>
                                    <div className='mt-2 flex justify-between'>
                                        <Text type='secondary'>Số lượng: {item.quantity}</Text>
                                        <Text className='text-red-500'>
                                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='space-y-2 pt-4'>
                            <div className='flex justify-between'>
                                <Text>Tạm tính:</Text>
                                <Text>{total.toLocaleString('vi-VN')}đ</Text>
                            </div>
                            <div className='flex justify-between'>
                                <Text>Giảm giá:</Text>
                                <Text>0đ</Text>
                            </div>
                            <div className='flex justify-between border-t pt-4'>
                                <Text strong>Thành tiền:</Text>
                                <Text className='text-xl font-bold text-red-500'>{total.toLocaleString('vi-VN')}đ</Text>
                            </div>
                        </div>

                        <Button type='primary' size='large' block>
                            Đặt hàng
                        </Button>
                        <Text type='secondary' className='mt-4 block text-center'>
                            Bằng việc nhấn nút Đặt hàng, bạn đồng ý với Điều khoản giao dịch của ApoBook
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
