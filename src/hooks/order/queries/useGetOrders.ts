import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';
import { AxiosResponse } from 'axios';

export const useGetOrders = (params?: Record<string, string | number | undefined>) => {
    return useQuery<AxiosResponse>({
        queryKey: ['orders', params],
        queryFn: () => orderService.getOrders(params),
    });
};
