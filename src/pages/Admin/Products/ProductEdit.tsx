import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import productService from '../../../services/product.service';
import { getAllCategories } from '../../../services/category.service';
import { getAllVendors } from '../../../services/vendor.service';
import { ICategory } from '../../../types/category';
import { IVendor } from '../../../types/vendor';

interface ProductFormValues {
    name: string;
    description?: string;
    author?: string;
    categoryId?: string;
    vendorId?: string;
    priceMin?: number;
    priceMax?: number;
}

const ProductEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [vendors, setVendors] = useState<IVendor[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailFileList, setThumbnailFileList] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [product, categoriesData, vendorsData] = await Promise.all([
                    productService.getProductById(id ?? ''),
                    getAllCategories(),
                    getAllVendors(),
                ]);

                setCategories(categoriesData);
                setVendors(vendorsData);

                setTimeout(() => {
                    form.setFieldsValue({
                        name: product.name,
                        description: product.description,
                        author: product.author,
                        categoryId: typeof product.categoryId === 'object' ? product.categoryId._id : '',
                        vendorId: typeof product.vendorId === 'object' ? product.vendorId._id : '',
                        priceMin: product.priceRange.min,
                        priceMax: product.priceRange.max,
                    });
                }, 0);

                if (product.thumbnail) {
                    setThumbnailFileList([
                        {
                            uid: '-1',
                            name: 'thumbnail.png',
                            status: 'done',
                            url: product.thumbnail,
                        },
                    ]);
                }
            } catch (error) {
                message.error('❌ Lỗi khi tải dữ liệu sản phẩm');
            } finally {
                setInitialLoading(false);
            }
        };
        void fetchData();
    }, [id, form]);

    const onFinish = async (values: ProductFormValues) => {
        setLoading(true);
        try {
            if (thumbnailFile) {
                const formData = new FormData();
                formData.append('productId', id ?? '');
                formData.append('name', values.name);
                formData.append('description', values.description || '');
                if (values.author) formData.append('author', values.author);
                if (values.categoryId) formData.append('categoryId', values.categoryId);
                if (values.vendorId) formData.append('vendorId', values.vendorId);
                if (typeof values.priceMin === 'number') formData.append('priceRange[min]', values.priceMin.toString());
                if (typeof values.priceMax === 'number') formData.append('priceRange[max]', values.priceMax.toString());
                formData.append('thumbnail', thumbnailFile);
                await productService.updateProduct(id ?? '', formData);
            } else {
                const payload = {
                    ...values,
                    productId: id ?? '',
                    priceRange: {
                        min: values.priceMin ?? 0,
                        max: values.priceMax ?? 0,
                    },
                    categoryId: values.categoryId ? { _id: values.categoryId, name: '' } : undefined,
                    vendorId: values.vendorId ? { _id: values.vendorId, name: '' } : undefined,
                };
                await productService.updateProduct(id ?? '', payload);
            }

            message.success('✅ Cập nhật sản phẩm thành công');
            void navigate('/admin/products');
        } catch (error: unknown) {
            const errMsg =
                typeof error === 'object' && error && 'message' in error
                    ? String((error as { message?: string }).message)
                    : '❌ Lỗi không xác định';
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div>⏳ Đang tải dữ liệu...</div>;

    return (
        <div className='p-4'>
            <h2 className='mb-4 text-2xl font-semibold'>Chỉnh sửa sản phẩm</h2>
            <Form
                form={form}
                layout='vertical'
                onFinish={(values: ProductFormValues) => void onFinish(values)}
                className='max-w-2xl'
            >
                <Form.Item
                    name='name'
                    label='Tên sản phẩm'
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên sản phẩm' },
                        { min: 15, message: 'Tên sản phẩm phải ít nhất 15 ký tự' },
                        { max: 100, message: 'Tên sản phẩm không quá 100 ký tự' },
                    ]}
                >
                    {' '}
                    <Input />{' '}
                </Form.Item>
                <Form.Item
                    name='description'
                    label='Mô tả'
                    rules={[{ max: 1000, message: 'Mô tả không quá 1000 ký tự' }]}
                >
                    {' '}
                    <Input.TextArea rows={4} />{' '}
                </Form.Item>
                <Form.Item
                    name='author'
                    label='Tác giả'
                    rules={[{ required: true, message: 'Vui lòng nhập tên tác giả' }]}
                >
                    {' '}
                    <Input />{' '}
                </Form.Item>
                <Form.Item
                    name='priceMin'
                    label='Giá thấp nhất'
                    rules={[{ required: true, message: 'Vui lòng nhập giá thấp nhất!' }]}
                >
                    {' '}
                    <Input type='number' addonAfter='₫' />{' '}
                </Form.Item>
                <Form.Item
                    name='priceMax'
                    label='Giá cao nhất'
                    rules={[{ required: true, message: 'Vui lòng nhập giá cao nhất!' }]}
                >
                    {' '}
                    <Input type='number' addonAfter='₫' />{' '}
                </Form.Item>
                <Form.Item
                    name='categoryId'
                    label='Danh mục'
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                    {' '}
                    <Select>
                        {' '}
                        {categories.map((cat) => (
                            <Select.Option key={cat._id} value={cat._id}>
                                {cat.name}
                            </Select.Option>
                        ))}{' '}
                    </Select>{' '}
                </Form.Item>
                <Form.Item
                    name='vendorId'
                    label='Nhà cung cấp'
                    rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
                >
                    {' '}
                    <Select>
                        {' '}
                        {vendors.map((vendor) => (
                            <Select.Option key={vendor._id} value={vendor._id}>
                                {vendor.name}
                            </Select.Option>
                        ))}{' '}
                    </Select>{' '}
                </Form.Item>
                <Form.Item label='Thay ảnh thumbnail'>
                    <Upload
                        beforeUpload={(file) => {
                            setThumbnailFile(file);
                            return false;
                        }}
                        maxCount={1}
                        listType='picture'
                        fileList={thumbnailFileList}
                        onChange={({ fileList }) => {
                            setThumbnailFileList(fileList);
                            if (fileList.length && fileList[0].originFileObj) {
                                setThumbnailFile(fileList[0].originFileObj);
                            }
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <div className='flex gap-4'>
                        <Button type='primary' htmlType='submit' loading={loading}>
                            Cập nhật
                        </Button>
                        <Button onClick={() => void navigate('/admin/products')}>Huỷ</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductEdit;
