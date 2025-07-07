import { useQuery, keepPreviousData } from '@tanstack/react-query';
import productService from '@/services/product.service';
import { ProductsParams, IProductResponse } from '@/types/product';
import { AxiosResponse } from 'axios';
import { QUERY_KEYS } from '@/constants/queryKeys';

export type ProductListResponse = {
    message: string;
    status: number;
    data: {
        products: IProductResponse[];
        totalDocs: number;
        totalPages: number;
    };
};

export const useGetProducts = (params?: ProductsParams) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.product.list, params],
        queryFn: () => productService.getProducts(params),
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        placeholderData: keepPreviousData,
    });
};
