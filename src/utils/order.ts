// utils/order.ts

import { PartialCheckoutInfo } from '@/types/checkout';
import { ReceiverData } from '@/validations/checkout/customerInfo';

type OrderItems = {
    productVariantId: string;
    quantity: number;
    price: number;
    name: string;
    productId: string;
};

export const buildOrderPayload = (
    data: ReceiverData,
    checkoutInfo: PartialCheckoutInfo,
    orderItems: OrderItems[],
    shippingFee: number = 0,
) => {
    const customerInfo = {
        email: data.email || '',
        username: data.fullName || '',
        phoneNumber: data.phoneNumber || '',
    };

    const receiverInfo = {
        recevierName: data.recevierName || '',
        recevierPhoneNumber: data.recevierPhoneNumber || '',
    };

    const payload = {
        items: orderItems,
        customerInfo,
        ...(checkoutInfo.isAnotherReceiver && { receiverInfo }),
        shippingFee,
        userNote: data.userNote || 'updating...',
        shippingAddress: {
            detailAddress: checkoutInfo.detailAddress || '',
            province: checkoutInfo.province?.name || '',
            district: checkoutInfo.district?.name || '',
            ward: checkoutInfo.ward?.name || '',
        },
    };

    return payload;
};
