import React from 'react';
import ProductGrid from './ProductGrid';
import { Spin } from 'antd';
import { useGetNewProducts } from '@/hooks/products/queries/useGetNewProducts';

const NewProducts: React.FC = () => {
    const { data, isLoading } = useGetNewProducts();

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
                <h1 className='text-3xl font-bold text-gray-800'>Sản phẩm mới</h1>
                <p className='mt-2 text-gray-600'>Khám phá những cuốn sách mới nhất của chúng tôi</p>
            </div>

            <ProductGrid products={data?.data || []} />
        </div>
    );
};

export default NewProducts;
