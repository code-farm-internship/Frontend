export enum DiscountType {
    PERCENT = 'percent',
    FIXED = 'fixed',
}

export interface IDiscount {
    _id: string;
    discountType: DiscountType;
    discountValue: number;
    startDate: string;
    endDate: string;
}
