import { useCheckoutStore } from '@/store/checkoutStore';
import { ReceiverData } from '@/validations/checkout/customerInfo';
import { Form, Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { PartialCheckoutForm } from './CustomerCheckoutInfo';

type Props = {
    setCheckoutFormData: (data: PartialCheckoutForm) => void;
};

const DetailAddressField = ({ setCheckoutFormData }: Props) => {
    const checkoutInfo = useCheckoutStore((state) => state.checkoutInfo);
    const {
        control,
        formState: { errors },
    } = useFormContext<ReceiverData>();
    return (
        <Form.Item
            label='Địa chỉ'
            validateStatus={errors.detailAddress ? 'error' : ''}
            help={errors.detailAddress?.message}
        >
            <Controller
                name='detailAddress'
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        value={checkoutInfo.detailAddress || field.value || ''}
                        onChange={(e) => {
                            const detailAddress = e.target.value;
                            field.onChange(detailAddress);
                            setCheckoutFormData({
                                detailAddress: detailAddress,
                            });
                        }}
                        placeholder='Nhập địa chỉ'
                    />
                )}
            />
        </Form.Item>
    );
};

export default memo(DetailAddressField);
