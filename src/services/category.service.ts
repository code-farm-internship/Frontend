import { ICategory } from '../types/category';
import axiosInstance from './axiosInstance';

interface CategoryResponse {
    data: {
        categories: ICategory[];
    };
}

const categoryService = {
    getAllCategories: async (): Promise<ICategory[]> => {
        const response = await axiosInstance.get<CategoryResponse>('/categories/all');
        return response.data.data.categories;
    },

    deleteCategory: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/categories/delete/${id}`);
    },
};

export default categoryService;
export const { getAllCategories, deleteCategory } = categoryService;
