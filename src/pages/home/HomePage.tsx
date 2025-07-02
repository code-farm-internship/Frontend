import React from 'react';
import { useNavigate } from 'react-router-dom';
import { banners } from '@/data/mock-data';
import { useGetFeaturedProducts } from '@/hooks/products/queries/useGetFeaturedProducts';
import { useGetNewProducts } from '@/hooks/products/queries/useGetNewProducts';
import { useGetBestSellers } from '@/hooks/products/queries/useGetBestSellers';
import ProductGrid from '../AllProducts/component/Products';
import { IProduct } from '@/types/product';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const { data: featuredProducts, isLoading: featuredLoading } = useGetFeaturedProducts();
    const { data: newProducts, isLoading: newLoading } = useGetNewProducts();
    const { data: bestSellers, isLoading: bestSellersLoading } = useGetBestSellers();

    const Banner: React.FC = () => {
        const banner = banners[0];
        return (
            <div className='group relative mb-16 h-[500px] overflow-hidden rounded-2xl'>
                <div
                    className='absolute inset-0 transform bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
                    style={{ backgroundImage: `url(${banner.image})` }}
                />
                <div className='absolute inset-0 bg-gradient-to-r from-red-500/80 to-transparent' />
                <div className='absolute inset-0 flex max-w-2xl flex-col justify-center px-16'>
                    <h1 className='mb-6 text-5xl font-bold leading-tight text-white'>{banner.title}</h1>
                    <p className='mb-8 text-xl leading-relaxed text-white/90'>{banner.description}</p>
                    <button
                        className='w-fit transform rounded-full bg-white px-8 py-3 font-semibold text-red-500 transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:text-white'
                        onClick={() => {
                            void navigate('/featured');
                        }}
                    >
                        Xem ngay
                    </button>
                </div>
            </div>
        );
    };

    const ProductSection: React.FC<{
        title: string;
        products: IProduct[];
        isLoading: boolean;
        viewAllLink: string;
    }> = ({ title, products, isLoading, viewAllLink }) => {
        if (isLoading) {
            return (
                <div className='mb-16'>
                    <div className='mb-8 flex items-center justify-between'>
                        <h2 className='text-2xl font-bold text-gray-800'>{title}</h2>
                    </div>
                    <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
                        {[...Array(4).keys()].map((_, index) => (
                            <div key={index} className='animate-pulse rounded-xl bg-white shadow-md'>
                                <div className='aspect-[3/4] rounded-t-xl bg-gray-200'></div>
                                <div className='p-4'>
                                    <div className='mb-2 h-4 rounded bg-gray-200'></div>
                                    <div className='h-4 w-2/3 rounded bg-gray-200'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className='mb-16'>
                <div className='mb-8 flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-gray-800'>{title}</h2>
                    <button
                        className='font-semibold text-red-500 transition-colors duration-300 hover:text-red-600'
                        onClick={() => {
                            void navigate(viewAllLink);
                        }}
                    >
                        Xem tất cả
                    </button>
                </div>
                <ProductGrid products={products.slice(0, 5)} />
            </div>
        );
    };

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <Banner />

            <ProductSection
                title='SÁCH MỚI NHẤT'
                products={newProducts ?? []}
                isLoading={newLoading}
                viewAllLink='/new'
            />

            <div className='mb-16 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 p-12 text-center'>
                <h2 className='mb-4 text-3xl font-bold text-red-500'>Ưu đãi đặc biệt</h2>
                <p className='mb-8 text-lg text-gray-700'>Giảm giá lên đến 30% cho tất cả sách mới trong tháng</p>
                <button className='transform rounded-full bg-red-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600'>
                    Xem ngay
                </button>
            </div>

            <ProductSection
                title='BÁN CHẠY NHẤT'
                products={bestSellers ?? []}
                isLoading={bestSellersLoading}
                viewAllLink='/bestsellers'
            />

            <div className='mb-16 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 p-12'>
                <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
                    <div>
                        <h2 className='mb-4 text-3xl font-bold text-blue-600'>Giao Hàng Miễn Phí</h2>
                        <p className='text-lg text-gray-700'>
                            Cho tất cả đơn hàng trên 150.000đ khi mua sách tại ApoBook
                        </p>
                    </div>
                    <button className='transform whitespace-nowrap rounded-full bg-blue-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600'>
                        Tìm hiểu thêm
                    </button>
                </div>
            </div>

            <ProductSection
                title='SÁCH NỔI BẬT'
                products={featuredProducts ?? []}
                isLoading={featuredLoading}
                viewAllLink='/featured'
            />
        </div>
    );
};

export default HomePage;
