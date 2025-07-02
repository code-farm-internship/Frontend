import React from 'react';
import ProductGrid from './Products';
import { Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import productService from '@/services/product.service';

const AllProducts: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['all-products'],
        queryFn: productService.getAllProducts,
    });
    const products = data?.products ?? [];

    if (isLoading) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center'>
                <Spin size='large' />
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center'>
                <div className='text-center'>
                    <h2 className='mb-2 text-2xl font-semibold text-gray-700'>Không có sản phẩm nào</h2>
                    <p className='text-gray-500'>Hãy quay lại sau để khám phá những sản phẩm mới nhất!</p>
                </div>
            </div>
        );
    }

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>Tất cả sản phẩm</h1>
                <p className='mt-2 text-gray-600'>Khám phá toàn bộ sản phẩm của chúng tôi</p>
            </div>

            <ProductGrid products={products} />
        </div>
    );
};

export default AllProducts;
