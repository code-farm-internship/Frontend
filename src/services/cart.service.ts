import { ICartPayload, ICartResponse } from '@/types/cart';
import { instance } from '@/utils/api/axiosInstance';

export const cartServie = {
    async getUserCart() {
        const res = await instance.get<ICartResponse>('/carts/my-cart');
        return res.data;
    },
    async addToCart(payload: ICartPayload) {
        const res = await instance.patch<null>('/carts/add', payload);
        return res.data;
    },
    async updateCartItemQuantity(payload: ICartPayload) {
        const res = await instance.patch<null>('/carts/update-quantity', payload);
        return res.data;
    },
    async removeCartItem(id: string) {
        const res = await instance.delete<null>(`/carts/remove/${id}`);
        return res.data;
    },
};
