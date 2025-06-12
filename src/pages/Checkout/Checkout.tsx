import { PUBLIC_ROUTES } from '@/constants/routes';
import useCreateOrder from '@/hooks/order/mutations/useCreateOrder';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import '@/styles/customAntd.css';
import { PaymentMethod } from '@/types/checkout';
import { IOrderPayload } from '@/types/order';
import { calculateTotalDiscountedPrice, calculateTotalDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Modal, Radio, RadioChangeEvent, Row, Space, Tooltip, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CouponContainer from './components/Coupons/CouponContainer';
import CouponInput from './components/Coupons/CouponInput';
import CustomerCheckoutInfo from './components/CustomerCheckoutInfo/CustomerCheckoutInfo';
import OrderItem from './components/OrderItem';

const { Title, Text } = Typography;

const Checkout: React.FC = () => {
    const cartItems = useCartStore((state) => state.items);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);
    const submitRef = useRef<() => void>(null);
    const navigate = useNavigate();

    const { mutate: createOrder, isPending } = useCreateOrder();

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

    const cartSelectedItems = useMemo(() => cartItems.filter((item) => item.isSelected), []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCheckout = () => {
        submitRef.current?.();
    };

    const handleChangePaymentMethod = (e: RadioChangeEvent) => {
        const method = e.target.value as PaymentMethod;
        setPaymentMethod(method);
    };

    const handleCreateOrder = useCallback(
        (orderPayload: IOrderPayload) => {
            createOrder(orderPayload);
        },
        [createOrder],
    );

    useEffect(() => {
        if (cartSelectedItems.length === 0) {
            void navigate(`/${PUBLIC_ROUTES.CART_DETAIL}`);
        }
    }, [navigate, cartSelectedItems.length]);

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <Title level={2}>Thanh toán</Title>
            <Row
                gutter={[
                    { xs: 16, sm: 32 },
                    { xs: 16, sm: 32 },
                ]}
            >
                <Col md={12} span={24}>
                    <CustomerCheckoutInfo
                        handleTriggerSubmit={(submitFn) => {
                            submitRef.current = submitFn;
                        }}
                        createOrder={handleCreateOrder}
                    />
                </Col>
                <Col md={12} span={24}>
                    <Row
                        gutter={[
                            { xs: 16, sm: 32 },
                            { xs: 16, sm: 32 },
                        ]}
                    >
                        <Col span={24}>
                            <Card>
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
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card>
                                <Title level={4}>PHƯƠNG THỨC THANH TOÁN</Title>
                                <Radio.Group
                                    className='w-full'
                                    onChange={handleChangePaymentMethod}
                                    defaultValue={PaymentMethod.COD}
                                >
                                    <Space direction='vertical' className='w-full'>
                                        <Radio value={PaymentMethod.COD} className='w-full rounded border px-4 py-3'>
                                            Thanh toán khi nhận hàng
                                        </Radio>
                                        <Radio value={PaymentMethod.CARD} className='w-full rounded border px-4 py-3'>
                                            Thanh toán online
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card>
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
                                            <Text className='text-xl font-bold text-red-500'>
                                                {formatCurrency(totalPrice)}
                                            </Text>
                                        </div>
                                    </div>

                                    <Button
                                        type='primary'
                                        onClick={handleCheckout}
                                        disabled={cartItems.length === 0 || isPending}
                                        loading={isPending}
                                        size='large'
                                        block
                                    >
                                        Đặt hàng
                                    </Button>
                                    <Text type='secondary' className='mt-4 block text-center'>
                                        Bằng việc nhấn nút Đặt hàng, bạn đồng ý với Điều khoản giao dịch của ApoBook
                                    </Text>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Coupon modal */}
            <Modal
                centered
                className='coupon-modal'
                width={'44vw'}
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
                <div className='px-1 pt-2'>
                    <CouponInput />
                    <CouponContainer />
                </div>
            </Modal>
        </div>
    );
};

export default Checkout;
