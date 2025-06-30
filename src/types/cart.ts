import { ICoupon } from './coupon';
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
    isSelected: boolean;
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
    cart: { userId: string; items: ICartItems[] };
    coupons: ICoupon[];
}
