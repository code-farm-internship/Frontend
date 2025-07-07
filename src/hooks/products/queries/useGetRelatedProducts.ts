import { QUERY_KEYS } from '@/constants/queryKeys';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

export const useGetRelatedProducts = (categoryId: string, productId: string) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.product.detail, 'related', categoryId, productId],
        queryFn: () => productService.getRelatedProducts({ categoryId, productId }),
        enabled: !!categoryId && !!productId,
    });
};
