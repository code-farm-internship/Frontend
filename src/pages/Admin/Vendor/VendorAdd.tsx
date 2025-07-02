import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message, Popconfirm } from 'antd';
import axiosInstance from '../../../services/axiosInstance';

const { Title } = Typography;

const VendorAdd = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values: { name: string; description?: string }) => {
        try {
            setIsSubmitting(true);
            await axiosInstance.post('/vendors/create', values);
            message.success('✅ Thêm nhà cung cấp thành công');
            form.resetFields();
            void navigate('/admin/vendor');
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const errorObj = error as { response?: { data?: { message?: string } }; message?: string };
                const errorMessage = errorObj.response?.data?.message || errorObj.message || 'Lỗi không xác định';
                message.error('❌ Lỗi: ' + errorMessage);
            } else {
                message.error('❌ Lỗi không xác định');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <Title level={3}>Thêm nhà cung cấp</Title>
            <Form
                form={form}
                layout='vertical'
                onFinish={(values: { name: string; description?: string }) => void handleSubmit(values)}
            >
                <Form.Item
                    label='Tên nhà cung cấp'
                    name='name'
                    rules={[{ required: true, message: 'Tên nhà cung cấp là bắt buộc' }]}
                >
                    <Input placeholder='Nhập tên nhà cung cấp' />
                </Form.Item>

                <Form.Item label='Mô tả' name='description'>
                    <Input.TextArea rows={4} placeholder='Mô tả (không bắt buộc)' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isSubmitting} disabled={isSubmitting}>
                        {isSubmitting ? 'Đang thêm...' : 'Thêm'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default VendorAdd;
