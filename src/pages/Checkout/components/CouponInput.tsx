const CouponInput = () => {
    return (
        <div className='flex items-center justify-between rounded-xl border-2 pl-1 pr-1 duration-300 focus-within:border-primary/45'>
            <input
                type='text'
                className='inline-block h-full select-none border-0 border-none px-3 py-2 text-sm outline-none md:py-2.5'
                placeholder='Nhập mã khuyến mãi'
            />
            <div className='min-w-16 cursor-pointer rounded-md bg-primary bg-cover bg-no-repeat px-2 py-1.5 text-xs font-medium text-white duration-300 hover:opacity-95 sm:px-3 sm:text-sm md:rounded-lg md:px-5'>
                Áp dụng
            </div>
        </div>
    );
};

export default CouponInput;
