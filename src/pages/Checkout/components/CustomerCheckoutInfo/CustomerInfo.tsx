import { useCheckoutStore } from '@/store/checkoutStore';
import { ReceiverData } from '@/validations/checkout/customerInfo';
import { Card, Form, Input, Switch } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckoutForm, PartialCheckoutForm } from './CustomerCheckoutInfo';
import Title from 'antd/es/typography/Title';
import { memo } from 'react';

type Props = {
    setCheckoutFormData: (data: PartialCheckoutForm) => void;
    checkoutData: CheckoutForm;
};

const CustomerInfo = ({ setCheckoutFormData, checkoutData }: Props) => {
    const checkoutInfo = useCheckoutStore((state) => state.checkoutInfo);

    const {
        control,
        formState: { errors },
    } = useFormContext<ReceiverData>();

    return (
        <Card>
            <Title level={4}>THÔNG TIN NGƯỜI NHẬN</Title>
            <Form.Item
                label='Họ và tên'
                validateStatus={errors.fullName ? 'error' : ''}
                help={errors.fullName?.message}
            >
                <Controller
                    name='fullName'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            value={field.value || checkoutInfo.fullName || ''}
                            onChange={(e) => {
                                const fullName = e.target.value;
                                field.onChange(fullName);
                                setCheckoutFormData({
                                    fullName,
                                });
                            }}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item label='Email' validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            value={field.value || checkoutInfo.email || ''}
                            onChange={(e) => {
                                const email = e.target.value;
                                field.onChange(email);
                                setCheckoutFormData({
                                    email,
                                });
                            }}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label='Số điện thoại'
                validateStatus={errors.phoneNumber ? 'error' : ''}
                help={errors.phoneNumber?.message}
            >
                <Controller
                    name='phoneNumber'
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            value={field.value || checkoutInfo.phoneNumber || ''}
                            onChange={(e) => {
                                const phoneNumber = e.target.value;
                                field.onChange(phoneNumber);
                                setCheckoutFormData({
                                    phoneNumber,
                                });
                            }}
                        />
                    )}
                />
            </Form.Item>
            <div className='space-x-1'>
                <span>Gửi đến người nhận khác:</span>{' '}
                <Switch
                    onClick={(checked) => {
                        setCheckoutFormData({ isAnotherReceiver: checked });
                    }}
                    checked={checkoutData.isAnotherReceiver}
                />
            </div>
            {checkoutData.isAnotherReceiver && (
                <>
                    <Form.Item
                        label='Họ và tên'
                        validateStatus={errors.recevierName ? 'error' : ''}
                        help={errors.recevierName?.message}
                    >
                        <Controller
                            name='recevierName'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={field.value || checkoutInfo.receiverInfo?.recevierName || ''}
                                    onChange={(e) => {
                                        const recevierName = e.target.value;
                                        field.onChange(recevierName);

                                        setCheckoutFormData({
                                            receiverInfo: {
                                                recevierName: recevierName,
                                                recevierPhoneNumber: checkoutData.receiverInfo
                                                    ?.recevierPhoneNumber as string,
                                            },
                                        });
                                    }}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Số điện thoại'
                        validateStatus={errors.recevierPhoneNumber ? 'error' : ''}
                        help={errors.recevierPhoneNumber?.message}
                    >
                        <Controller
                            name='recevierPhoneNumber'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={field.value || checkoutInfo.receiverInfo?.recevierPhoneNumber || ''}
                                    onChange={(e) => {
                                        const recevierPhoneNumber = e.target.value;
                                        field.onChange(recevierPhoneNumber);

                                        setCheckoutFormData({
                                            receiverInfo: {
                                                recevierPhoneNumber,
                                                recevierName: checkoutData.receiverInfo?.recevierName as string,
                                            },
                                        });
                                    }}
                                />
                            )}
                        />
                    </Form.Item>
                </>
            )}
        </Card>
    );
};

export default memo(CustomerInfo);
