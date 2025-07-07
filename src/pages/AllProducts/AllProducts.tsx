import React, { useState, useEffect } from 'react';
import { Select, Slider, Button, Input, Pagination, Spin, message } from 'antd';
import { FilterOutlined, AppstoreOutlined, UnorderedListOutlined, SearchOutlined } from '@ant-design/icons';
import { ProductsParams } from '@/types/product';
import { useGetProducts } from '@/hooks/products/queries/useGetProducts';
import productService from '@/services/product.service';
import ProductGrid from './component/Products';
import { useLocation } from 'react-router-dom';

const { Option } = Select;

const AllProducts: React.FC = () => {
    // Trạng thái
    const [filters, setFilters] = useState<ProductsParams>({
        page: 1,
        limit: 24,
        category: '',
        minPrice: 0,
        maxPrice: 1000000,
        sortBy: '',
        search: '',
    });
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(true);
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search') ?? '';
        if (search.length >= 2) {
            setFilters((prev) => ({
                ...prev,
                search,
                page: 1,
            }));
            setSearchValue(search);
        }
    }, [location.search]);

    // Lấy dữ liệu sản phẩm
    const { data, isLoading } = useGetProducts(filters);
    console.log('Fetched products:', data);

    // Lấy danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await productService.getCategories();
                const fetchedCategories = Array.isArray(res.data.categories) ? res.data.categories : [];
                setCategories(fetchedCategories);
                if (fetchedCategories.length === 0) {
                    message.warning('Không có danh mục nào được tải.');
                }
            } catch (err) {
                console.error('Lỗi khi lấy danh mục:', err);
                message.error('Không thể tải danh mục. Vui lòng thử lại sau.');
            }
        };
        void fetchCategories();
    }, []);

    // Xử lý thay đổi bộ lọc
    const handleFilterChange = <K extends keyof ProductsParams>(key: K, value: ProductsParams[K]) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1,
        }));
    };

    // Xử lý tìm kiếm
    const handleSearch = () => {
        const trimmedValue = searchValue.trim();
        if (trimmedValue.length < 2 && trimmedValue.length > 0) {
            message.warning('Vui lòng nhập ít nhất 2 ký tự để tìm kiếm.');
            return;
        }
        handleFilterChange('search', trimmedValue);
    };

    // Xử lý phân trang
    const handlePageChange = (page: number, pageSize?: number) => {
        setFilters((prev) => ({
            ...prev,
            page,
            limit: pageSize || prev.limit,
        }));
    };

    // Reset bộ lọc
    const resetFilters = () => {
        setFilters({
            page: 1,
            limit: 24,
            category: '',
            minPrice: 0,
            maxPrice: 1000000,
            sortBy: '',
            search: '',
        });
        setSearchValue('');
        message.success('Đã xóa bộ lọc.');
    };

    // Xử lý khi đang tải
    if (isLoading) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center'>
                <Spin size='large' tip='Đang tải sản phẩm...' />
            </div>
        );
    }

    // Xử lý dữ liệu sản phẩm
    const products = data?.data?.products ?? [];
    const totalDocs = data?.data?.totalDocs ?? 0;

    if (!data) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center'>
                <p className='text-gray-500'>Không có dữ liệu sản phẩm.</p>
            </div>
        );
    }

    console.log('Fetched products:', data); // Chỉ log khi data tồn tại

    const total = totalDocs;

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            {/* Tiêu đề */}
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>Tất cả sản phẩm</h1>
                <p className='mt-2 text-gray-600'>Khám phá bộ sưu tập sách của chúng tôi</p>
            </div>

            {/* Bộ lọc và chế độ xem */}
            <div className='mb-6 flex items-center justify-between'>
                <Button
                    icon={<FilterOutlined />}
                    onClick={() => {
                        setShowFilters(!showFilters);
                    }}
                >
                    {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                </Button>
                <div className='flex gap-2'>
                    <Button
                        icon={<AppstoreOutlined />}
                        onClick={() => {
                            setViewMode('grid');
                        }}
                        type={viewMode === 'grid' ? 'primary' : 'default'}
                    />
                    <Button
                        icon={<UnorderedListOutlined />}
                        onClick={() => {
                            setViewMode('list');
                        }}
                        type={viewMode === 'list' ? 'primary' : 'default'}
                    />
                </div>
            </div>

            {/* Bộ lọc */}
            {showFilters && (
                <div className='mb-6 rounded-lg bg-white p-4 shadow'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        {/* Danh mục */}
                        <div>
                            <h4 className='mb-2 font-semibold'>Danh mục</h4>
                            <Select
                                className='w-full'
                                value={filters.category}
                                onChange={(value) => {
                                    handleFilterChange('category', value);
                                }}
                                allowClear
                                placeholder='Chọn danh mục'
                                disabled={categories.length === 0}
                            >
                                {categories.map((category) => (
                                    <Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        {/* Khoảng giá */}
                        <div>
                            <h4 className='mb-2 font-semibold'>Khoảng giá</h4>
                            <Slider
                                range
                                min={0}
                                max={1000000}
                                step={10000}
                                value={[filters.minPrice ?? 0, filters.maxPrice ?? 1000000]}
                                onChangeComplete={(value) => {
                                    handleFilterChange('minPrice', value[0]);
                                    handleFilterChange('maxPrice', value[1]);
                                }}
                                tooltip={{
                                    formatter: (value) => `${(value ?? 0).toLocaleString('vi-VN')}đ`,
                                }}
                            />
                            <div className='flex justify-between text-sm text-gray-600'>
                                <span>{(filters.minPrice ?? 0).toLocaleString('vi-VN')}đ</span>
                                <span>{(filters.maxPrice ?? 1000000).toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>

                        {/* Sắp xếp */}
                        <div>
                            <h4 className='mb-2 font-semibold'>Sắp xếp</h4>
                            <Select
                                className='w-full'
                                value={filters.sortBy}
                                onChange={(value) => {
                                    handleFilterChange('sortBy', value);
                                }}
                                allowClear
                                placeholder='Sắp xếp theo'
                            >
                                <Option value='price-asc'>Giá: Thấp đến cao</Option>
                                <Option value='price-desc'>Giá: Cao đến thấp</Option>
                                <Option value='name-asc'>Tên: A-Z</Option>
                                <Option value='name-desc'>Tên: Z-A</Option>
                            </Select>
                        </div>
                    </div>

                    {/* Tìm kiếm và reset */}
                    <div className='mt-4 flex gap-4'>
                        <Input
                            placeholder='Tìm kiếm sản phẩm (ít nhất 2 ký tự)...'
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            onPressEnter={handleSearch}
                            suffix={<SearchOutlined />}
                            className='flex-1'
                        />
                        <Button type='primary' onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                        <Button onClick={resetFilters}>Xóa bộ lọc</Button>
                    </div>
                </div>
            )}
            {/* Danh sách sản phẩm */}
            {products.length === 0 ? (
                <div className='flex min-h-[60vh] items-center justify-center'>
                    <p className='text-gray-500'>Không tìm thấy sản phẩm nào.</p>
                </div>
            ) : (
                <>
                    <ProductGrid products={products} viewMode={viewMode} />
                    <div className='mt-6 flex justify-center'>
                        <Pagination
                            current={filters.page}
                            pageSize={filters.limit}
                            total={total}
                            onChange={handlePageChange}
                            showSizeChanger
                            showQuickJumper
                            showTotal={(total: number, range: [number, number]) =>
                                `${range[0].toString()}-${range[1].toString()} của ${total.toString()} sản phẩm`
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default AllProducts;
