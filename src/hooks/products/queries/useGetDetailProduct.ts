import { QUERY_KEYS } from '@/constants/queryKeys';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

const useGetDetailProduct = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.product.detail, id],
        queryFn: () => productService.getDetailProduct(id),
        enabled: !!id,
    });
};

export default useGetDetailProduct;
