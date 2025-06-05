import { ICategory } from './category';
import { IDiscount } from './discount';
import { IFormat } from './format';
import { IVendor } from './vendor';

export interface IVariant {
    _id: string;
    image: string;
    imageUrlRef: string;
    price: number;
    stock: number;
    formatId: IFormat;
    discountId?: IDiscount;
    createdAt: string;
    updatedAt: string;
}

interface LibraryItem {
    imageUrl: string;
    imageRef: string;
}

export interface IProductResponse {
    _id: string;
    name: string;
    rating: number;
    reviewCount: number;
    sold: number;
    status: string;
    thumbnail: string;
    thumbnailRef: string;
    library: LibraryItem[];
    isAvailable: boolean;
    categoryId: ICategory;
    vendorId: IVendor;
    variants: IVariant[];
    variantFormats: string[];
    createdAt: string;
    updatedAt: string;
}
export interface ProductListResponse {
    data: IProductResponse[];
    total: number;
    page: number;
    limit: number;
}
