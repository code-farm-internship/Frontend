import useGetDetailProduct from '@/hooks/products/queries/useGetDetailProduct';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductDetailInfo from './components/ProductDetailInfo';
import ProductLibrary from './components/ProductLibrary';
import Loader from '@/components/common/Loader';
import ProductGrid from '../AllProducts/component/Products';
import { useGetBestSellers } from '@/hooks/products/queries/useGetBestSellers';

const ProductDetail = () => {
    const { id } = useParams();
    const { data: productDetail } = useGetDetailProduct(id as string);
    const { data } = useGetBestSellers();

    return (
        <>
            {productDetail ? (
                <div className="mx-auto w-full rounded-sm bg-white px-4 py-8 md:max-w-standard xl:max-w-7xl">
                    <div className="flex flex-wrap justify-between gap-8 lg:flex-nowrap">
                        <div className="flex w-full basis-full lg:basis-1/2">
                            <ProductLibrary productDetail={productDetail} />
                        </div>
                        <div className="w-full basis-full lg:basis-1/2">
                            <ProductDetailInfo productDetail={productDetail} />
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl px-4 py-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Sản phẩm bán chạy</h1>
                        </div>

                        <ProductGrid products={data?.data || []} />
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ProductDetail;
