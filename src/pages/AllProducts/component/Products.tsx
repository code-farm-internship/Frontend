import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rate, Tag, Button } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { IProductResponse } from '@/types/product';

interface ProductGridProps {
    products: IProductResponse[];
    viewMode?: 'grid' | 'list';
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode = 'grid' }) => {
    const navigate = useNavigate();

    const ProductCard: React.FC<{ product: IProductResponse }> = ({ product }) => {
        const hasDiscount = Math.random() > 0.7;
        const discountPercent = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;
        const originalPrice = Math.floor(Math.random() * 200000) + 50000;
        const discountPrice = hasDiscount ? originalPrice * (1 - discountPercent / 100) : originalPrice;

        const handleNavigate = (id: string) => {
            void navigate(`/product/${id}`);
        };

        if (viewMode === 'list') {
            return (
                <div className='flex gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md'>
                    <div className='group relative h-32 w-24 flex-shrink-0 cursor-pointer'>
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className='h-full w-full rounded-lg object-cover'
                            onClick={() => {
                                handleNavigate(product._id);
                            }}
                        />
                        {hasDiscount && (
                            <div className='absolute left-2 top-2'>
                                <Tag color='red' className='text-xs font-bold'>
                                    -{discountPercent}%
                                </Tag>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-1 flex-col justify-between'>
                        <div>
                            <h3
                                className='mb-2 line-clamp-2 cursor-pointer text-lg font-semibold text-gray-800 transition-colors hover:text-red-500'
                                onClick={() => {
                                    handleNavigate(product._id);
                                }}
                            >
                                {product.name}
                            </h3>

                            <div className='mb-2 flex items-center gap-2'>
                                <Rate disabled defaultValue={product.rating} />
                                <span className='text-sm text-gray-500'>({product.reviewCount})</span>
                                <span className='text-sm text-gray-500'>• Đã bán {product.sold}</span>
                            </div>

                            <div className='mb-3 flex items-center gap-2'>
                                {hasDiscount ? (
                                    <>
                                        <span className='text-xl font-bold text-red-500'>
                                            {discountPrice.toLocaleString('vi-VN')}đ
                                        </span>
                                        <span className='text-sm text-gray-400 line-through'>
                                            {originalPrice.toLocaleString('vi-VN')}đ
                                        </span>
                                    </>
                                ) : (
                                    <span className='text-xl font-bold text-red-500'>
                                        {originalPrice.toLocaleString('vi-VN')}đ
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Button
                                type='primary'
                                icon={<ShoppingCartOutlined />}
                                className='flex-1'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Add to cart logic
                                }}
                            >
                                Thêm vào giỏ
                            </Button>
                            <Button
                                icon={<EyeOutlined />}
                                onClick={() => {
                                    handleNavigate(product._id);
                                }}
                            >
                                Xem
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='group cursor-pointer'>
                <div className='transform overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
                    <div className='relative aspect-[3/4] overflow-hidden'>
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className='h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110'
                            onClick={() => {
                                handleNavigate(product._id);
                            }}
                        />

                        {hasDiscount && (
                            <div className='absolute left-3 top-3'>
                                <div className='rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white'>
                                    -{discountPercent}%
                                </div>
                            </div>
                        )}

                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all duration-300 group-hover:bg-opacity-20 group-hover:opacity-100'>
                            <div className='flex gap-2'>
                                <Button
                                    type='primary'
                                    shape='circle'
                                    icon={<EyeOutlined />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavigate(product._id);
                                    }}
                                />
                                <Button
                                    type='primary'
                                    shape='circle'
                                    icon={<ShoppingCartOutlined />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Add to cart logic
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='p-4'>
                        <h3
                            className='mb-2 line-clamp-2 text-base font-semibold text-gray-800 transition-colors hover:text-red-500'
                            onClick={() => {
                                handleNavigate(product._id);
                            }}
                        >
                            {product.name}
                        </h3>

                        <div className='mb-2 flex items-center gap-1'>
                            <Rate disabled defaultValue={product.rating} />
                            <span className='text-xs text-gray-500'>({product.reviewCount})</span>
                        </div>

                        <div className='space-y-1'>
                            {hasDiscount ? (
                                <div className='flex items-center gap-2'>
                                    <span className='text-lg font-bold text-red-500'>
                                        {discountPrice.toLocaleString('vi-VN')}đ
                                    </span>
                                    <span className='text-sm text-gray-400 line-through'>
                                        {originalPrice.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                            ) : (
                                <span className='text-lg font-bold text-red-500'>
                                    {originalPrice.toLocaleString('vi-VN')}đ
                                </span>
                            )}

                            <div className='text-xs text-gray-500'>Đã bán {product.sold}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (viewMode === 'list') {
        return (
            <div className='space-y-4'>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        );
    }

    return (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5'>
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
