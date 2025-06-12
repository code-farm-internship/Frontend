import CouponButton from '@/components/common/CouponButton';

const CouponInput = () => {
    return (
        <div className='flex items-center justify-between rounded-xl border-2 px-6 pl-1 pr-1 duration-300 focus-within:border-primary/45'>
            <input
                type='text'
                className='inline-block h-full flex-1 select-none border-0 border-none px-3 py-2 text-sm outline-none md:py-2.5'
                placeholder='Nhập mã khuyến mãi'
            />

            <CouponButton title='Áp dụng' />
        </div>
    );
};

export default CouponInput;
