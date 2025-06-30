import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { shippingService } from '@/services/shipping.service';
import { useQuery } from '@tanstack/react-query';

const useGetWard = (id: string) => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.SHIPPING.WARD, id],
        queryFn: () => shippingService.getAllWard(id),
        enabled: !!id,
    });
};

export default useGetWard;
