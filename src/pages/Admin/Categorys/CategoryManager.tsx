import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Space, Typography, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ICategory } from '../../../types/category';
import { getAllCategories, deleteCategory } from '../../../services/category.service';

const { Title } = Typography;

const CategoryManager = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (_error) {
            message.error('Lỗi khi tải danh sách danh mục');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory(id);
            message.success('🗑️ Đã xoá danh mục');
            setCategories((prev) => prev.filter((cat) => cat._id !== id));
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const errorObj = error as { response?: { data?: { message?: string } }; message?: string };
                const errorMessage = errorObj.response?.data?.message || errorObj.message || 'Lỗi không xác định';
                message.error('❌ Lỗi khi xoá: ' + errorMessage);
            } else {
                message.error('❌ Lỗi không xác định');
            }
        }
    };

    const columns: ColumnsType<ICategory> = [
        {
            title: '#',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (desc: string | null) => desc || '-',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type='primary' onClick={() => navigate(`/admin/category/update/${record._id}`)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title='Bạn có chắc muốn xoá danh mục này?'
                        onConfirm={() => {
                            void handleDelete(record._id);
                        }}
                        okText='Xoá'
                        cancelText='Huỷ'
                    >
                        <Button danger>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className='p-4'>
            <Title level={3}>Quản lý danh mục</Title>
            <div style={{ marginBottom: 16 }}>
                <Link to='/admin/category/create'>
                    <Button type='primary'>➕ Thêm mới sản phẩm</Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={categories}
                loading={loading}
                rowKey='_id'
                bordered
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default CategoryManager;
