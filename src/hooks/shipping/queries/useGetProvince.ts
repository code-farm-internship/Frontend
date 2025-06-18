import { TANSTACK_QUERY_KEYS } from '@/constants/tanstackQueryKeys';
import { shippingService } from '@/services/shipping.service';
import { useQuery } from '@tanstack/react-query';

const useGetProvince = () => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.SHIPPING.PROVINCE],
        queryFn: () => shippingService.getAllProvince(),
    });
};

export default useGetProvince;
