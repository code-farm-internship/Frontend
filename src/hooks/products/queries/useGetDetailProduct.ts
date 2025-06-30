import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import productService from '@/services/product.service';
import { useQuery } from '@tanstack/react-query';

const useGetDetailProduct = (id: string) => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.product.DETAIL, id],
        queryFn: () => productService.getDetailProduct(id),
        enabled: !!id,
    });
};

export default useGetDetailProduct;
