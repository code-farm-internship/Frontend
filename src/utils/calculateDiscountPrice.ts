import { IVariantItem } from '@/types/cart';
import { DiscountType } from '@/types/discount';

type CalculateDiscount = {
    variantId: Omit<IVariantItem, 'stock'>;
    quantity: number;
};

export const calculateDiscountPrice = (item: CalculateDiscount) => {
    if (item.variantId.discountId) {
        return item.variantId.discountId.discountType === DiscountType.PERCENT
            ? (item.variantId.price - (item.variantId.price * item.variantId.discountId.discountValue) / 100) *
                  item.quantity
            : (item.variantId.price - item.variantId.discountId.discountValue) * item.quantity;
    }
    return item.variantId.price * item.quantity;
};
