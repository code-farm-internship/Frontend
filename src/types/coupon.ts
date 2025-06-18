import { ICategory } from './category';

export enum CouponTarget {
    PUBLIC = 'public',
    COLLECTABLE = 'collectable',
    NEW_USER = 'new_user',
}

export enum CouponDiscountType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed',
}
export enum CouponStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum CouponType {
    DISCOUNT = 'discount',
    FREESHIP = 'free_ship',
}

export interface ICoupon {
    _id: string;
    name: string;
    code: string;
    description?: string;
    couponType: CouponType;
    target: CouponTarget;
    discountType: CouponDiscountType;
    discountValue: number;
    minOrderValue: number;
    maxDiscountValue: number;
    stock: number;
    usagePerUser: number;
    categories: ICategory[];
    status: CouponStatus;
    isCategoryExcluded: boolean;
    startDate?: Date;
    endDate?: Date;
    expiredAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
