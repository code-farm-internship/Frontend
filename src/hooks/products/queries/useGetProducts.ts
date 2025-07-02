import { QUERY_KEYS } from '@/constants/queryKeys';
import productService from '@/services/product.service';
import { ProductsParams } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = (params?: ProductsParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.product.list, params],
    queryFn: () => productService.getProducts(params),
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};