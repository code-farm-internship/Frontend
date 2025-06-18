import useGetProvince from '@/hooks/shipping/queries/useGetProvince';
import { useCheckoutStore } from '@/store/checkoutStore';
import { selectSearch } from '@/utils/antd/selectSearch';
import { ReceiverData } from '@/validations/checkout/customerInfo';
import { Form, Select } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import useGetDistrict from '@/hooks/shipping/queries/useGetDistrict';
import { PartialCheckoutForm } from './CustomerCheckoutInfo';

type Props = {
    setDistrictId: (provineId: string) => void;
    setCheckoutFormData: (data: PartialCheckoutForm) => void;
    provinceId: string;
};

const DistrictField = ({ setCheckoutFormData, setDistrictId, provinceId }: Props) => {
    const checkoutInfo = useCheckoutStore((state) => state.checkoutInfo);
    const provindeIdParam = provinceId || String(checkoutInfo.province?.id || '');
    const { data: districtRes, isLoading: isDistrictLoading } = useGetDistrict(provindeIdParam);
    const {
        control,
        reset,
        getValues,
        formState: { errors },
    } = useFormContext<ReceiverData>();

    return (
        <Form.Item label='Quận/huyện' validateStatus={errors.district ? 'error' : ''} help={errors.district?.message}>
            <Controller
                name='district'
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        showSearch
                        value={field.value || checkoutInfo.district?.id || null}
                        placeholder='Chọn quận huyện'
                        loading={isDistrictLoading}
                        filterOption={(input, option) => selectSearch(option, input)}
                        options={districtRes?.map((district) => ({
                            label: district.DistrictName,
                            value: district.DistrictID,
                        }))}
                        onChange={(districtId) => {
                            const districtdString = String(districtId);
                            field.onChange(districtId);
                            setDistrictId(districtdString);

                            const findDistrict = districtRes?.find((province) => province.DistrictID === districtId);
                            if (findDistrict) {
                                setCheckoutFormData({
                                    district: {
                                        id: findDistrict.DistrictID,
                                        name: findDistrict.DistrictName,
                                    },
                                });
                            }
                            reset({ ...getValues(), ward: undefined });
                        }}
                    />
                )}
            />
        </Form.Item>
    );
};

export default memo(DistrictField);
