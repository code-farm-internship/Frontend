import { IProductResponse } from '@/types/product';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductGridProps {
    products: IProductResponse[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    const navigate = useNavigate();

    const handleNavigate = (id: string) => {
        void navigate(`/product/${id}`);
    };

    // Trả về hàm đồng bộ cho onClick
    const handleClick = (id: string) => () => {
        handleNavigate(id);
    };

    return (
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {products.map((product) => (
                <div key={product._id} className='group cursor-pointer' onClick={handleClick(product._id)}>
                    <div className='transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
                        <div className='aspect-[3/4] overflow-hidden'>
                            <img
                                src={product.thumbnail}
                                alt={product.name}
                                className='h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-110'
                            />
                        </div>
                        <div className='p-4'>
                            <h3 className='mb-2 line-clamp-2 text-lg font-semibold text-gray-800'>{product.name}</h3>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm text-gray-500'>Đã bán {product.sold}</span>
                                    <span className='text-sm text-gray-500'>⭐ {product.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
