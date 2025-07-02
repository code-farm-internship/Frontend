import { useEffect, useState } from 'react';
import { Table, Button, Image, Tag, Typography, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, Link } from 'react-router-dom';
import { IProduct } from '../../../types/product';
import productService from '../../../services/product.service';
import { ICategory } from '../../../types/category';
import { IVendor } from '../../../types/vendor';

const { Title } = Typography;

const ProductManager = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data.products);
        } catch (error) {
            message.error('Lỗi khi tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    const handleToggle = async (id: string) => {
        try {
            await productService.toggleProductVisibility(id);
            message.success('Cập nhật trạng thái thành công');
            void fetchData();
        } catch (error) {
            const errorObj = error as { response?: { data?: { message?: string } }; message?: string };
            const errorMessage = errorObj.response?.data?.message || errorObj.message || 'Lỗi không xác định';
            message.error('❌ Lỗi khi cập nhật: ' + errorMessage);
        }
    };

    const columns: ColumnsType<IProduct> = [
        {
            title: '#',
            dataIndex: '_id',
            key: 'index',
            render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (url, record) =>
                url ? (
                    <Image width={48} height={48} src={url} alt={record.name} style={{ objectFit: 'cover' }} />
                ) : (
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            background: '#f0f0f0',
                            textAlign: 'center',
                            lineHeight: '48px',
                            color: '#999',
                        }}
                    >
                        No image
                    </div>
                ),
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Giá',
            dataIndex: 'priceRange',
            key: 'priceRange',
            render: (range: { min: number; max: number } | undefined) => {
                if (!range || typeof range.min !== 'number' || typeof range.max !== 'number') {
                    return '-';
                }
                return `${range.min.toLocaleString()}₫ - ${range.max.toLocaleString()}₫`;
            },
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (category: ICategory | undefined) => category?.name || '-',
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'vendorId',
            key: 'vendorId',
            render: (vendor: IVendor | undefined) => vendor?.name || '-',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isAvailable',
            key: 'isAvailable',
            render: (isAvailable: boolean) =>
                isAvailable ? <Tag color='green'>Hiển thị</Tag> : <Tag color='red'>Đã ẩn</Tag>,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type='primary' onClick={() => navigate(`/admin/products/edit/${record._id}`)}>
                        Sửa
                    </Button>
                    <Button danger={!record.isAvailable} onClick={() => void handleToggle(record._id)}>
                        {record.isAvailable ? 'Ẩn' : 'Hiện'}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='p-4'>
            <Title level={3}>Quản lý sản phẩm</Title>
            <div style={{ marginBottom: 16 }}>
                <Link to='/admin/products/create'>
                    {' '}
                    {/* ✅ đã sửa path */}
                    <Button type='primary'>➕ Thêm mới sản phẩm</Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={products}
                rowKey='_id'
                loading={loading}
                bordered
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page, size) => {
                        setCurrentPage(page);
                        setPageSize(size || 10);
                    },
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                }}
            />
        </div>
    );
};

export default ProductManager;
