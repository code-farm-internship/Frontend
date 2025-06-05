import React from 'react';
import { Spin } from 'antd';
import { useGetBestSellers } from '@/hooks/products/queries/useGetBestSellers';
import ProductGrid from './ProductGrid';

const BestSellers: React.FC = () => {
    const { data, isLoading } = useGetBestSellers();

    if (isLoading) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center'>
                <Spin size='large' />
            </div>
        );
    }

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>Sản phẩm bán chạy</h1>
                <p className='mt-2 text-gray-600'>Những cuốn sách được độc giả tin chọn nhiều nhất</p>
            </div>

            <ProductGrid products={data?.data || []} />
        </div>
    );
};

export default BestSellers;
