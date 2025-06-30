import CouponItem from './CouponItem';
import { useCheckoutStore } from '@/store/checkoutStore';

const CouponContainer = () => {
    const coupons = useCheckoutStore((state) => state.coupons);

    return (
        <div className='mt-2 max-h-[66dvh] overflow-y-auto overflow-x-hidden px-2 py-4'>
            <div>
                <div className='mb-2 flex items-center justify-between'>
                    <span className='font-semibold'>Mã giảm giá</span>
                    <span className='text-gray-500'>Áp dụng tối đa: 1</span>
                </div>
                <div className='space-y-2'>
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                </div>
            </div>
        </div>
    );
};

export default CouponContainer;
