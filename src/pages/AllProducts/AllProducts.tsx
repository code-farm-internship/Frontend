import React from 'react';
import { Select, Checkbox, Slider, Button, Pagination } from 'antd';
import { FilterOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Option } = Select;

const AllProductsUI: React.FC = () => {
    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Breadcrumb */}
            <div className='border-b bg-white'>
                <div className='mx-auto max-w-7xl px-4 py-3 text-sm text-gray-600'>
                    <span className='cursor-pointer hover:text-red-500'>TRANG CHỦ</span>
                    <span className='mx-2'>›</span>
                    <span className='cursor-pointer hover:text-red-500'>SÁCH TIẾNG VIỆT</span>
                    <span className='mx-2'>›</span>
                    <span className='cursor-pointer hover:text-red-500'>VĂN HỌC</span>
                    <span className='mx-2'>›</span>
                    <span className='font-medium text-red-500'>TẤT CẢ SẢN PHẨM</span>
                </div>
            </div>

            <div className='mx-auto flex max-w-7xl gap-6 px-4 py-6'>
                {/* Sidebar Filters */}
                <div className='w-80 flex-shrink-0'>
                    <div className='sticky top-6 rounded-lg bg-white p-6 shadow-sm'>
                        <h3 className='mb-6 flex items-center text-lg font-bold text-gray-800'>
                            <FilterOutlined className='mr-2' />
                            NHÓM SẢN PHẨM
                        </h3>

                        {/* Categories */}
                        <div className='mb-8'>
                            <h4 className='mb-4 font-semibold text-gray-700'>Danh mục</h4>
                            <div className='max-h-60 space-y-3 overflow-y-auto'>
                                {['Văn học', 'Tiểu thuyết', 'Truyện ngắn'].map((cat) => (
                                    <Checkbox key={cat} className='block'>
                                        {cat}
                                    </Checkbox>
                                ))}
                            </div>
                            <Button type='link' className='mt-2 p-0 text-red-500'>
                                Xem thêm ▼
                            </Button>
                        </div>

                        {/* Price */}
                        <div className='mb-8'>
                            <h4 className='mb-4 font-semibold text-gray-700'>GIÁ</h4>
                            {['0đ - 150,000đ', '150,000đ - 300,000đ', '300,000đ - 500,000đ'].map((label) => (
                                <Checkbox key={label} className='block'>
                                    {label}
                                </Checkbox>
                            ))}
                            <p className='mb-2 mt-4 text-sm text-gray-600'>Khoảng giá tùy chỉnh:</p>
                            <Slider range min={0} max={1000000} defaultValue={[0, 300000]} />
                            <div className='mt-1 flex justify-between text-xs text-gray-500'>
                                <span>0đ</span>
                                <span>1,000,000đ</span>
                            </div>
                        </div>

                        <Button type='default' className='w-full'>
                            Xóa bộ lọc
                        </Button>
                    </div>
                </div>

                {/* Product content */}
                <div className='flex-1'>
                    {/* Toolbar */}
                    <div className='mb-6 rounded-lg bg-white p-4 shadow-sm'>
                        <div className='flex flex-wrap items-center justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                                <Button icon={<FilterOutlined />}>Bộ lọc</Button>

                                <span className='text-sm text-gray-600'>Sắp xếp theo:</span>
                                <Select defaultValue='' className='w-48'>
                                    <Option value=''>Mặc định</Option>
                                    <Option value='price-asc'>Giá tăng dần</Option>
                                </Select>

                                <span className='text-sm text-gray-600'>Hiển thị:</span>
                                <Select defaultValue='24' className='w-32'>
                                    <Option value='12'>12 sản phẩm</Option>
                                    <Option value='24'>24 sản phẩm</Option>
                                </Select>
                            </div>

                            <div className='flex items-center gap-4'>
                                <span className='text-sm text-gray-600'>Hiển thị 24 / 100 sản phẩm</span>
                                <Button icon={<AppstoreOutlined />} />
                                <Button icon={<UnorderedListOutlined />} />
                            </div>
                        </div>
                    </div>

                    {/* Products grid placeholder */}
                    <div className='grid grid-cols-2 gap-4 rounded-lg bg-white p-6 shadow-sm md:grid-cols-3 lg:grid-cols-4'>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className='h-48 rounded-lg border bg-gray-100 p-4'>
                                Sản phẩm {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className='mt-8 flex justify-center'>
                        <Pagination current={1} pageSize={24} total={100} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProductsUI;
