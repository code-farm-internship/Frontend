import { IProductResponse, ProductListResponse } from '@/types/product';
import { instance } from '@/utils/api/axiosInstance';

const productService = {
    //     async getProducts(params?: any): Promise<ProductListResponse> {
    //     const res = await instance.get<ProductListResponse>('/products/all', { params });
    //     return res.data;
    //   },
    getDetailProduct(id: string): Promise<IProductResponse> {
        return instance.get(`/products/${id}/`);
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
