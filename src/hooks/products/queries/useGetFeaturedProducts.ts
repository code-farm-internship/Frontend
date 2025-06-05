import { QUERY_KEYS } from '@/constants/queryKeys';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

export const useGetFeaturedProducts = () => {
    return useQuery({
        queryKey: QUERY_KEYS.product.featured,
        queryFn: () => productService.getFeaturedProducts(),
        enabled: true,
    });
};
