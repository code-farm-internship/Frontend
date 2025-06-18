import { IVariantItem } from '@/types/cart';
import { DiscountType } from '@/types/discount';

type CalculateDiscount = {
    variantId: Omit<IVariantItem, 'stock'>;
    quantity: number;
};

export const calculateTotalDiscountPrice = (item: CalculateDiscount, isDiscount: boolean = true) => {
    const { variantId, quantity } = item;
    const discount = variantId.discountId;

    if (!discount || !isDiscount) {
        return variantId.price * quantity;
    }

    if (discount.discountType === DiscountType.PERCENT) {
        const discountedPrice = variantId.price - (variantId.price * discount.discountValue) / 100;
        return discountedPrice * quantity;
    }

    const discountedPrice = variantId.price - discount.discountValue;
    return discountedPrice * quantity;
};

export const calculateTotalDiscountedPrice = (item: CalculateDiscount) => {
    const { variantId } = item;
    const discount = variantId.discountId;

    if (!discount) {
        return 0;
    }

    if (discount.discountType === DiscountType.PERCENT) {
        return ((variantId.price * discount.discountValue) / 100) * item.quantity;
    }

    return (variantId.price - discount.discountValue) * item.quantity;
};

export const calculateDiscountPrice = (item: IVariantItem) => {
    const discount = item.discountId;

    if (!discount) {
        return item.price;
    }

    if (discount.discountType === DiscountType.PERCENT) {
        return item.price - (item.price * discount.discountValue) / 100;
    }

    return item.price - discount.discountValue;
};
