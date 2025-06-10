import { useCartStore } from '@/store/cartStore';
import { calculateTotalDiscountedPrice, calculateTotalDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { CloseOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Radio, Space, Tooltip, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import OrderItem from './components/OrderItem';
import CouponInput from './components/CouponInput';

const { Title, Text } = Typography;

const Checkout: React.FC = () => {
    const cartItems = useCartStore((state) => state.items);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { totalPrice, totalPriceNotDiscount, totalDiscountedPrice } = useMemo(() => {
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <Title level={2}>Thanh toán</Title>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                <div className='space-y-6'>
                    <div className='rounded-lg bg-white p-6 shadow-sm'>
                        <Form layout='vertical'>
                            <Title level={4}>THÔNG TIN NGƯỜI NHẬN</Title>
                            <Form.Item label='Họ và tên'>
                                <Input prefix={<UserOutlined />} />
                            </Form.Item>
                            <Form.Item label='Số điện thoại'>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Địa chỉ'>
                                <Input placeholder='Nhập địa chỉ' />
                            </Form.Item>
                        </Form>
                    </div>

                    <div className='rounded-lg bg-white p-6 shadow-sm'>
                        <Title level={4}>CHỌN PHƯƠNG THỨC THANH TOÁN</Title>
                        <Radio.Group className='w-full' defaultValue={1}>
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
                <div className='grid grid-cols-1 gap-8'>
                    <div className='rounded-lg bg-white p-6 shadow-sm'>
                        <Title level={4}>Mã khuyến mãi</Title>
                        <div className='flex gap-7'>
                            <div className='hidden uppercase xl:block'>Mã KM</div>
                            <div>
                                <div className='flex flex-wrap'>
                                    <CouponInput />
                                    <span
                                        onClick={showModal}
                                        className='ml-2 cursor-pointer text-sm text-blue-500 underline'
                                    >
                                        Chọn mã khuyễn mãi
                                    </span>
                                </div>
                                <div className='flex flex-wrap'>
                                    <div className='my-2 inline-flex items-center gap-2 bg-discountTicket bg-cover bg-repeat-round px-4 py-1.5 font-semibold'>
                                        <span className='text-sm text-amber-700'>Mã giảm 20k</span>
                                        <CloseOutlined className='cursor-pointer' />
                                    </div>
                                    <div className='my-2 inline-flex items-center gap-2 bg-freeshipTicket bg-cover bg-repeat-round px-4 py-1.5 font-semibold'>
                                        <span className='text-sm text-green-700'>Freeship 20k</span>
                                        <CloseOutlined className='cursor-pointer' />
                                    </div>
                                </div>
                                <div className='flex items-center text-sm text-gray-500'>
                                    <span>Có thể áp dụng đồng thời nhiều mã</span>
                                    <Tooltip
                                        placement='bottom'
                                        arrow={false}
                                        title='Áp dụng tối đã 1 mã giảm giá và 1 mã freeship'
                                    >
                                        <InfoCircleOutlined className='p-1' style={{ fontSize: 16 }} />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-lg bg-white p-6 shadow-sm'>
                        <Title level={4}>THÔNG TIN ĐƠN HÀNG</Title>
                        <div className='space-y-4'>
                            {cartItems.map((item) => (
                                <OrderItem item={item} key={item.variantId._id} />
                            ))}

                            <div className='space-y-2 pt-4'>
                                <div className='flex justify-between'>
                                    <Text>Tạm tính:</Text>
                                    <Text>{formatCurrency(totalPriceNotDiscount)}</Text>
                                </div>
                                <div className='flex justify-between'>
                                    <Text>Giảm giá:</Text>
                                    <Text>{formatCurrency(totalDiscountedPrice)}</Text>
                                </div>
                                <div className='flex justify-between border-t pt-4'>
                                    <Text strong>Thành tiền:</Text>
                                    <Text className='text-xl font-bold text-red-500'>{formatCurrency(totalPrice)}</Text>
                                </div>
                            </div>

                            <Button type='primary' disabled={cartItems.length === 0} size='large' block>
                                Đặt hàng
                            </Button>
                            <Text type='secondary' className='mt-4 block text-center'>
                                Bằng việc nhấn nút Đặt hàng, bạn đồng ý với Điều khoản giao dịch của ApoBook
                            </Text>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coupon model */}
            <Modal
                title={
                    <div className='flex gap-2'>
                        <span className='uppercase text-primary'>Chọn mã khuyến mãi</span>
                        <div className='flex items-center text-sm text-gray-500'>
                            <span>Có thể áp dụng đồng thời nhiều mã</span>
                            <Tooltip
                                placement='bottom'
                                arrow={false}
                                title='Áp dụng tối đã 1 mã giảm giá và 1 mã freeship'
                            >
                                <InfoCircleOutlined className='p-1' style={{ fontSize: 16 }} />
                            </Tooltip>
                        </div>
                    </div>
                }
                open={isModalOpen}
                footer={<></>}
                onCancel={handleCancel}
            >
                <div className=''>
                    <CouponInput />
                </div>
            </Modal>
        </div>
    );
};

export default Checkout;
