import { IProductResponse, ProductListResponse } from '@/types/product';
import { instance } from '@/utils/api/axiosInstance';

const productService = {
    async getDetailProduct(id: string) {
        const res = await instance.get<IProductResponse>(`products/${id}`);
        return res.data;
    },
    getFeaturedProducts(): Promise<ProductListResponse> {
        return instance.get('/products/featured/');
    },

    getNewProducts(): Promise<ProductListResponse> {
        return instance.get('/products/new/');
    },

    getBestSellers(): Promise<ProductListResponse> {
        return instance.get('/products/selling/');
    },
};

export default productService;
