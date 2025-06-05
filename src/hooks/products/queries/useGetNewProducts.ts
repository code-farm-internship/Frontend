import { QUERY_KEYS } from '@/constants/queryKeys';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

export const useGetNewProducts = () => {
    return useQuery({
        queryKey: QUERY_KEYS.product.new,
        queryFn: () => productService.getNewProducts(),
        enabled: true,
    });
};
