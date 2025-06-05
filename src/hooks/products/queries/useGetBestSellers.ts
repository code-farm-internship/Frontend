import { QUERY_KEYS } from '@/constants/queryKeys';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

export const useGetBestSellers = () => {
    return useQuery({
        queryKey: QUERY_KEYS.product.bestsellers,
        queryFn: () => productService.getBestSellers(),
        enabled: true,
    });
};
