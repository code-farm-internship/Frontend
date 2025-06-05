import React from 'react';
import { Spin } from 'antd';
import { useGetFeaturedProducts } from '@/hooks/products/queries/useGetFeaturedProducts';
import ProductGrid from './ProductGrid';

const FeaturedProducts: React.FC = () => {
    const { data, isLoading } = useGetFeaturedProducts();

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
                <h1 className='text-3xl font-bold text-gray-800'>Sản phẩm nổi bật</h1>
                <p className='mt-2 text-gray-600'>Những cuốn sách được đánh giá cao và được yêu thích nhất</p>
            </div>

            <ProductGrid products={data?.data || []} />
        </div>
    );
};

export default FeaturedProducts;
