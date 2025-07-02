import axiosInstance from './axiosInstance';
import { IVendor } from '../types/vendor';

interface VendorResponse {
    data: {
        vendors: IVendor[];
    };
}

const vendorService = {
    getAllVendors: async (): Promise<IVendor[]> => {
        const res = await axiosInstance.get<VendorResponse>('/vendors/all');
        return res.data.data.vendors;
    },

    deleteVendor: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/vendors/delete/${id}`);
    },
};

export default vendorService;
export const { getAllVendors, deleteVendor } = vendorService;
