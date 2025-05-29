import useGetDetailProduct from '@/hooks/products/queries/useGetDetailProduct';
import { useNavigate, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { bestSellers } from '../../data/mock-data';
import ProductDetailInfo from './components/ProductDetailInfo';
import ProductLibrary from './components/ProductLibrary';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: productDetail } = useGetDetailProduct(id as string);

    return (
        <>
            {productDetail ? (
                <div className='mx-auto w-full rounded-sm bg-white px-4 py-8 md:max-w-standard xl:max-w-7xl'>
                    <div className='flex flex-wrap justify-between gap-8 lg:flex-nowrap'>
                        <div className='flex w-full basis-full lg:basis-1/2'>
                            <ProductLibrary productDetail={productDetail} />
                        </div>
                        <div className='w-full basis-full lg:basis-1/2'>
                            <ProductDetailInfo productDetail={productDetail} />
                        </div>
                    </div>
                    <div className='mt-12'>
                        <h3 className='mb-4 text-2xl font-bold'>Sách cùng thể loại</h3>
                        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                            {bestSellers.slice(0, 4).map((book) => (
                                <div
                                    key={book.id}
                                    className='cursor-pointer rounded-xl shadow transition hover:shadow-lg'
                                    onClick={() => {
                                        void navigate(`/product/${book.id}`);
                                    }}
                                >
                                    <div className='aspect-[3/4] overflow-hidden rounded-t-xl'>
                                        <img
                                            alt={book.title}
                                            src={book.coverImage}
                                            className='h-full w-full object-cover transition-transform hover:scale-105'
                                        />
                                    </div>
                                    <div className='p-2'>
                                        <h4 className='truncate font-semibold'>{book.title}</h4>
                                        <p className='text-red-500'>{book.price.toLocaleString('vi-VN')}đ</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default ProductDetail;
