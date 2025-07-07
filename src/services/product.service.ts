import { ApiProductListResponse, IProductResponse, ProductListResponse, ProductsParams } from '@/types/product';
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

    getProducts(params?: ProductsParams): Promise<ApiProductListResponse> {
        return instance.get('/products/all', { params });
    },

    getCategories(): Promise<{
        message: string;
        status: number;
        data: {
            categories: { _id: string; name: string }[];
        };
    }> {
        return instance.get('/categories/all');
    },

    async getRelatedProducts(params: { categoryId: string; productId: string }): Promise<ProductListResponse> {
        const res = await instance.post<ProductListResponse>('/products/related/', params);
        return res.data;
    },
};

export default productService;
