import { IOrderPayload } from '@/types/order';
import { instance } from '@/utils/api/axiosInstance';

export const orderService = {
    async createOrder(body: IOrderPayload) {
        const res = await instance.post<null>('orders/create/cod', body);
        return res.data;
    },
    async getOrders(params?: Record<string, string | number | undefined>) {
        const res = await instance.get('orders/all', { params });
        return res;
    },
};
