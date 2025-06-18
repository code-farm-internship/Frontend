import { ReceiverData } from '@/validations/checkout/customerInfo';
import { Card, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { memo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PartialCheckoutForm } from './CustomerCheckoutInfo';
import DetailAddressField from './DetailAddressField';
import DistrictField from './DistrictField';
import ProvinceField from './ProvinceField';
import WardField from './WardField';

type CustomerAddressProps = {
    setCheckoutFormData: (data: PartialCheckoutForm) => void;
};

const CustomerAddress = ({ setCheckoutFormData }: CustomerAddressProps) => {
    const [provinceId, setProvinceId] = useState<string>('');
    const [districtId, setDistrictId] = useState<string>('');
    const {
        control,
        formState: { errors },
    } = useFormContext<ReceiverData>();

    return (
        <Card>
            <Title level={4}>ĐỊA CHỈ GIAO HÀNG</Title>
            <DetailAddressField setCheckoutFormData={setCheckoutFormData} />
            <ProvinceField setCheckoutFormData={setCheckoutFormData} setProvinceId={setProvinceId} />
            <DistrictField
                setCheckoutFormData={setCheckoutFormData}
                setDistrictId={setDistrictId}
                provinceId={provinceId}
            />
            <WardField setCheckoutFormData={setCheckoutFormData} districtId={districtId} />
            <Form.Item label='Ghi chú' validateStatus={errors.userNote ? 'error' : ''} help={errors.userNote?.message}>
                <Controller
                    name='userNote'
                    control={control}
                    render={({ field }) => (
                        <TextArea {...field} rows={4} placeholder='Bạn muốn dặn dò điều gì'></TextArea>
                    )}
                />
            </Form.Item>
        </Card>
    );
};

export default memo(CustomerAddress);
