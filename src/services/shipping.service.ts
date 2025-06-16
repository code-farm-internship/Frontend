import { IDistrict, IProvince, IWard } from '@/types/ghn';
import { instance } from '@/utils/api/axiosInstance';

export const shippingService = {
    async getAllProvince() {
        const res = await instance.get<IProvince[]>('shippings/province');
        return res.data;
    },
    async getAllDistrict(provinceId: string) {
        const res = await instance.get<IDistrict[]>(`shippings/district/${provinceId}`);
        return res.data;
    },
    async getAllWard(districtId: string) {
        const res = await instance.get<IWard[]>(`shippings/ward/${districtId}`);
        return res.data;
    },
};
