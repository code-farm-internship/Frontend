import useGetProvince from '@/hooks/shipping/queries/useGetProvince';
import { useCheckoutStore } from '@/store/checkoutStore';
import { selectSearch } from '@/utils/antd/selectSearch';
import { ReceiverData } from '@/validations/checkout/customerInfo';
import { Form, Select } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { PartialCheckoutForm } from './CustomerCheckoutInfo';

type Props = {
    setProvinceId: (provineId: string) => void;
    setCheckoutFormData: (data: PartialCheckoutForm) => void;
};

const ProvinceField = ({ setCheckoutFormData, setProvinceId }: Props) => {
    const { data: provinceRes, isLoading: isProvinceLoading } = useGetProvince();
    const checkoutInfo = useCheckoutStore((state) => state.checkoutInfo);
    const {
        control,
        reset,
        getValues,
        formState: { errors },
    } = useFormContext<ReceiverData>();
    return (
        <Form.Item label='Thành phố' validateStatus={errors.province ? 'error' : ''} help={errors.province?.message}>
            <Controller
                name='province'
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        showSearch
                        value={field.value || checkoutInfo.province?.id || null}
                        loading={isProvinceLoading}
                        placeholder='Chọn thành phố'
                        filterOption={(input, option) => selectSearch(option, input)}
                        options={provinceRes?.map((province) => ({
                            label: province.ProvinceName,
                            value: province.ProvinceID,
                        }))}
                        onChange={(provinceId) => {
                            const provinceIdString = String(provinceId);
                            field.onChange(provinceId);
                            setProvinceId(provinceIdString);

                            const findProvince = provinceRes?.find((province) => province.ProvinceID === provinceId);
                            if (findProvince) {
                                setCheckoutFormData({
                                    province: {
                                        id: findProvince.ProvinceID,
                                        name: findProvince.ProvinceName,
                                    },
                                    district: {
                                        id: null,
                                        name: '',
                                    },
                                    ward: {
                                        code: null,
                                        name: '',
                                    },
                                });
                            }
                            reset({ ...getValues(), district: undefined, ward: undefined });
                        }}
                    />
                )}
            />
        </Form.Item>
    );
};

export default memo(ProvinceField);
