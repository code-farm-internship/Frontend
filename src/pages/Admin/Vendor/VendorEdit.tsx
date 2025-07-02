import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axiosInstance from '../../../services/axiosInstance';
import { IVendor } from '../../../types/vendor';

const { Title } = Typography;

interface VendorResponse {
    data: IVendor;
}

const VendorEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const res = await axiosInstance.get<VendorResponse>(`/vendors/${id ?? ''}`);
                const data = res.data.data;

                form.setFieldsValue({
                    name: data.name,
                });
            } catch (_err) {
                message.error('Không tìm thấy nhà cung cấp');
                void navigate('/admin/vendor');
            }
        };

        if (id) void fetchVendor();
    }, [id, form, navigate]);

    const handleSubmit = async (values: { name: string }) => {
        try {
            setIsSubmitting(true);

            const res = await axiosInstance.put(`/vendors/update/${id ?? ''}`, { name: values.name });

            if (res.status === 204) {
                message.info('⚠️ Không có thay đổi nào được thực hiện');
            } else {
                message.success('✅ Cập nhật thành công');
            }

            void navigate('/admin/vendor');
        } catch (error: unknown) {
            const errMsg =
                typeof error === 'object' && error && 'response' in error
                    ? String(
                          (error as { response?: { data?: { message?: string } }; message?: string }).response?.data
                              ?.message ?? (error as { message?: string }).message,
                      )
                    : '❌ Lỗi không xác định';
            message.error(errMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <Title level={3}>Chỉnh sửa nhà cung cấp</Title>
            <Form form={form} layout='vertical' onFinish={(values: { name: string }) => void handleSubmit(values)}>
                <Form.Item
                    label='Tên nhà cung cấp'
                    name='name'
                    rules={[{ required: true, message: 'Tên nhà cung cấp là bắt buộc' }]}
                >
                    <Input placeholder='Nhập tên nhà cung cấp' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isSubmitting} disabled={isSubmitting}>
                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default VendorEdit;
