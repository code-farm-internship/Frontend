import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { shippingService } from '@/services/shipping.service';
import { useQuery } from '@tanstack/react-query';

const useGetDistrict = (id: string) => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.SHIPPING.DISTRICT, id],
        queryFn: () => shippingService.getAllDistrict(id),
        enabled: !!id,
    });
};

export default useGetDistrict;
