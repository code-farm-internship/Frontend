import { PartialCheckoutInfo, PaymentMethod } from '@/types/checkout';
import { ICoupon } from '@/types/coupon';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface ICouponState {
    coupons: ICoupon[];
    paymentMethod: PaymentMethod;
    checkoutInfo: PartialCheckoutInfo;
    setCoupons: (coupons: ICoupon[]) => void;
    setCheckoutInfo: (checkoutInfo: PartialCheckoutInfo) => void;
    setPaymentMethod: (method: PaymentMethod) => void;
    reset: () => void;
}

const initialCheckoutInfo = {
    fullName: '',
    email: '',
    phoneNumber: '',
    userNote: '',
    detailAddress: '',
    province: {
        id: null,
        name: '',
    },
    district: {
        id: null,
        name: '',
    },
    ward: {
        code: null,
        name: '',
    },
    recevierName: '',
    recevierPhoneNumber: '',
    isAnotherReceiver: false,
};

export const useCheckoutStore = create<ICouponState>()(
    devtools(
        persist(
            immer((set) => ({
                coupons: [],
                checkoutInfo: initialCheckoutInfo,
                paymentMethod: PaymentMethod.COD,
                setCoupons: (coupons) => {
                    set(
                        (state) => {
                            state.coupons = coupons;
                        },
                        false,
                        'checkout/setCoupon',
                    );
                },
                setCheckoutInfo: (checkoutInfo) => {
                    set(
                        (state) => {
                            state.checkoutInfo = { ...state.checkoutInfo, ...checkoutInfo };
                        },
                        false,
                        'checkout/checkoutInfo',
                    );
                },
                setPaymentMethod: (method) => {
                    set((state) => {
                        state.paymentMethod = method;
                    });
                },
                reset: () => {
                    set(
                        (state) => {
                            state.checkoutInfo = initialCheckoutInfo;
                            state.paymentMethod = PaymentMethod.COD;
                        },
                        false,
                        'checkout/reset',
                    );
                },
            })),
            { name: 'checkoutStore' },
        ),
        { name: 'checkoutDevtool' },
    ),
);
