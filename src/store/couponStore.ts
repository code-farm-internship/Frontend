import { ICoupon } from '@/types/coupon';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface ICouponState {
    coupons: ICoupon[];
    setCoupons: (coupons: ICoupon[]) => void;
}

export const useCouponStore = create<ICouponState>()(
    devtools(
        persist(
            immer((set) => ({
                coupons: [],
                setCoupons: (coupons) => {
                    set((state) => {
                        state.coupons = coupons;
                    });
                },
            })),
            { name: 'couponStore' },
        ),
        { name: 'couponDevtool' },
    ),
);
