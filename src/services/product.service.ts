import { IProductResponse } from '@/types/product';
import { instance } from '@/utils/api/axiosInstance';

const productService = {
    async getDetailProduct(id: string) {
        const res = await instance.get<IProductResponse>(`products/${id}`);
        return res.data;
    },
};

export default productService;
