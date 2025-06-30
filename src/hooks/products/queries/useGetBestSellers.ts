import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

export const useGetBestSellers = () => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.product.bestsellers],
        queryFn: () => productService.getBestSellers(),
        enabled: true,
    });
};
