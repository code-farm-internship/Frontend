import { useCheckoutStore } from '@/store/checkoutStore';
import { selectSearch } from '@/utils/antd/selectSearch';
import { ReceiverData } from '@/validations/checkout/customerInfo';
import { Form, Select } from 'antd';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useGetWard from '@/hooks/shipping/queries/useGetWard';
import { PartialCheckoutForm } from './CustomerCheckoutInfo';

type Props = {
    setCheckoutFormData: (data: PartialCheckoutForm) => void;
    districtId: string;
};

const WardField = ({ setCheckoutFormData, districtId }: Props) => {
    const checkoutInfo = useCheckoutStore((state) => state.checkoutInfo);
    const districtIdParam = districtId || String(checkoutInfo.district?.id || '');
    const { data: wardRes, isLoading: isWardLoading } = useGetWard(districtIdParam);

    const {
        control,
        formState: { errors },
    } = useFormContext<ReceiverData>();

    return (
        <Form.Item label='Phường/Xã' validateStatus={errors.ward ? 'error' : ''} help={errors.ward?.message}>
            <Controller
                name='ward'
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        showSearch
                        value={field.value || checkoutInfo.ward?.code || null}
                        loading={isWardLoading}
                        placeholder='Chọn phường xã'
                        filterOption={(input, option) => selectSearch(option, input)}
                        options={wardRes?.map((ward) => ({
                            label: ward.WardName,
                            value: ward.WardCode,
                        }))}
                        onChange={(wardCode) => {
                            field.onChange(wardCode);
                            const findWard = wardRes?.find((ward) => ward.WardCode === wardCode);

                            if (findWard) {
                                setCheckoutFormData({
                                    ward: {
                                        code: findWard.WardCode,
                                        name: findWard.WardName,
                                    },
                                });
                            }
                        }}
                    />
                )}
            />
        </Form.Item>
    );
};

export default memo(WardField);
