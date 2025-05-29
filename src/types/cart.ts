import { IDiscount } from './discount';
import { IFormat } from './format';

export interface IVariantItem {
    formatId: IFormat;
    discountId?: IDiscount;
    image: string;
    price: number;
    stock: number;
    _id: string;
}
export interface ICartItems {
    variantId: IVariantItem;
    productId: {
        _id: string;
        name: string;
    };
    quantity: number;
}

export interface ICartPayload {
    variantId: string;
    productId?: string;
    quantity: number;
}

export interface ICartResponse {
    userId: string;
    items: ICartItems[];
}
