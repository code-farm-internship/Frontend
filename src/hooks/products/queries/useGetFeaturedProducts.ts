import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

export const useGetFeaturedProducts = () => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.product.featured],
        queryFn: () => productService.getFeaturedProducts(),
        enabled: true,
    });
};
