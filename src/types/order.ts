import { ICheckoutInfo, IReceiverInfo } from './checkout';

export interface IOrderItem {
    productVariantId: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
}
interface CustomerInfo {
    email: string;
    phoneNumber: string;
    username: string;
}

interface IShippingAddress {
    detailAddress: string;
    province: string;
    district: string;
    ward: string;
}

export interface IOrderPayload {
    items: IOrderItem[];
    customerInfo: CustomerInfo;
    receiverInfo?: IReceiverInfo;
    shippingAddress: IShippingAddress;
    couponCode?: string;
    userNote?: string;
    shippingFee: number;
}
