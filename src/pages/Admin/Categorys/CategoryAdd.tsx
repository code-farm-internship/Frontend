import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axiosInstance from '../../../services/axiosInstance';

const { Title } = Typography;

interface CategoryFormValues {
    name: string;
    description?: string;
}

const CategoryAdd = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (values: CategoryFormValues) => {
        if (!values.name) {
            message.warning('Tên danh mục là bắt buộc');
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description || '');
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            setIsSubmitting(true);
            await axiosInstance.post('/categories/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            message.success('✅ Thêm danh mục thành công');
            form.resetFields();
            setImageFile(null);
            void navigate('/admin/category');
        } catch (error: unknown) {
            const errMsg =
                typeof error === 'object' && error && 'response' in error
                    ? String(
                          (error as { response?: { data?: { message?: string } } }).response?.data?.message ??
                              (error as { message?: string }).message,
                      )
                    : '❌ Lỗi không xác định';
            message.error(errMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <Title level={3}>Thêm danh mục</Title>
            <Form form={form} layout='vertical' onFinish={(values: CategoryFormValues) => void handleSubmit(values)}>
                <Form.Item
                    label='Tên danh mục'
                    name='name'
                    rules={[{ required: true, message: 'Tên danh mục là bắt buộc' }]}
                >
                    <Input placeholder='Nhập tên danh mục' />
                </Form.Item>

                <Form.Item label='Mô tả' name='description'>
                    <Input.TextArea placeholder='Mô tả (không bắt buộc)' rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isSubmitting} disabled={isSubmitting}>
                        {isSubmitting ? 'Đang thêm...' : 'Thêm danh mục'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CategoryAdd;
