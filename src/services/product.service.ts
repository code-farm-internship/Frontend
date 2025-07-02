import axiosInstance from './axiosInstance';
import { IProduct } from '@/types/product';

interface ProductResponse {
    data: IProduct;
}

interface ProductsResponse {
    data: {
        products: IProduct[];
    };
}

interface ProductArrayResponse {
    data: IProduct[];
}

interface ToggleResponse {
    data: {
        isAvailable: boolean;
    };
}

const getAllProducts = async (): Promise<{ products: IProduct[] }> => {
    try {
        const res = await axiosInstance.get<ProductsResponse>('/products/all', { params: { limit: 1000 } });
        return res.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

const createProduct = async (formData: FormData): Promise<IProduct> => {
    try {
        const res = await axiosInstance.post<ProductResponse>('/products/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
};

const hiddenProduct = async (id: string): Promise<void> => {
    try {
        await axiosInstance.patch(`/products/hidden/${id}`);
    } catch (error) {
        console.error(`Error hiding product with ID ${id}:`, error);
        throw new Error('Failed to hide product');
    }
};

const toggleProductVisibility = async (id: string): Promise<boolean> => {
    try {
        const res = await axiosInstance.patch<ToggleResponse>(`/products/toggle/${id}`);
        return res.data.data.isAvailable;
    } catch (error) {
        console.error(`Error toggling visibility for product with ID ${id}:`, error);
        throw new Error('Failed to toggle product visibility');
    }
};

const updateProduct = async (id: string, data: FormData | Partial<IProduct>): Promise<IProduct> => {
    try {
        const isFormData = data instanceof FormData;
        const res = await axiosInstance.put<ProductResponse>(`/products/update/${id}`, data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
        });
        return res.data.data;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw new Error('Failed to update product');
    }
};

const getProductById = async (id: string): Promise<IProduct> => {
    try {
        const res = await axiosInstance.get<ProductResponse>(`/products/${id}`);
        return res.data.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw new Error('Failed to fetch product');
    }
};

const getFeaturedProducts = async (): Promise<IProduct[]> => {
    try {
        const res = await axiosInstance.get<ProductArrayResponse>('/products/featured');
        return res.data.data;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        throw new Error('Failed to fetch featured products');
    }
};

const getNewProducts = async (): Promise<IProduct[]> => {
    try {
        const res = await axiosInstance.get<ProductArrayResponse>('/products/new');
        return res.data.data;
    } catch (error) {
        console.error('Error fetching new products:', error);
        throw new Error('Failed to fetch new products');
    }
};

const getBestSellers = async (): Promise<IProduct[]> => {
    try {
        const res = await axiosInstance.get<ProductArrayResponse>('/products/best-seller');
        return res.data.data;
    } catch (error) {
        console.error('Error fetching best sellers:', error);
        throw new Error('Failed to fetch best sellers');
    }
};

const getDetailProduct = async (id: string): Promise<IProduct> => {
    try {
        const res = await axiosInstance.get<ProductResponse>(`/products/${id}`);
        return res.data.data;
    } catch (error) {
        console.error(`Error fetching product detail with ID ${id}:`, error);
        throw new Error('Failed to fetch product detail');
    }
};

const productService = {
    getAllProducts,
    createProduct,
    hiddenProduct,
    toggleProductVisibility,
    updateProduct,
    getProductById,
    getFeaturedProducts,
    getNewProducts,
    getBestSellers,
    getDetailProduct,
};

export default productService;
