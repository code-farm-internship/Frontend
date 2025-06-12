import promotionIcon from '@/assets/icons/ico_promotion.svg';
import CouponButton from '@/components/common/CouponButton';
import { CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { memo } from 'react';

const CouponItem = () => {
    return (
        <div className='relative'>
            <svg
                viewBox='0 0 411 103'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='none'
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'fill' }}
            >
                <g filter='url(#filter0_d_0_3)' fill='none'>
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M102.693 9.42857C107.178 9.42857 110.814 6.99812 110.814 4H399C403.418 4 407 7.58172 407 12V91C407 95.4183 403.418 99 399 99H109.814C109.814 96.0019 106.178 93.5714 101.693 93.5714C97.2076 93.5714 93.5718 96.0019 93.5718 99H12C7.58171 99 4 95.4183 4 91V12C4 7.58172 7.58172 4 12 4H94.5718C94.5718 6.99812 98.2076 9.42857 102.693 9.42857ZM101 12.1429V16.0786H103V12.1429H101ZM101 23.95V31.8214H103V23.95H101ZM101 39.6929V47.5643H103V39.6929H101ZM101 55.4357V63.3071H103V55.4357H101ZM101 71.1786L101 79.05H103L103 71.1786H101ZM101 86.9214V90.8571H103V86.9214H101Z'
                        fill='#FFFFFF'
                    />
                </g>
                <defs>
                    <filter
                        id='filter0_d_0_3'
                        x='0'
                        y='0'
                        width='411'
                        height='103'
                        filterUnits='userSpaceOnUse'
                        colorInterpolationFilters='sRGB'
                    >
                        <feFlood floodOpacity='0' result='BackgroundImageFix' />
                        <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation='2' />
                        <feComposite in2='hardAlpha' operator='out' />
                        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
                        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_0_3' />
                        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_0_3' result='shape' />
                    </filter>
                </defs>
            </svg>
            <div className='absolute bottom-0 left-0 top-0 m-3 flex w-[calc(24%-17px)] justify-center rounded bg-promotion py-2'>
                <div className='flex flex-col items-center justify-center md:gap-2'>
                    <img src={promotionIcon} alt='promotion' className='w-[60%] md:w-11' />
                    <span className='text-xs font-semibold'>Mã giảm</span>
                </div>
            </div>
            <div className='absolute right-2 top-3 w-[calc(70%)]'>
                <div className='mt-1 flex justify-between'>
                    <span className='text-[0.938rem] font-medium'>Mã giảm giá 20k - Toàn sàn</span>
                    <InfoCircleOutlined className='mr-3 text-blue-500' style={{ fontSize: 18 }} />
                </div>
                <p className='line-clamp-2 w-[80%] text-sm text-black/70'>
                    Đơn hàng từ 249k - Không bao gồm giá trị của các sản phẩm sau Manga, Ngoại Văn, Phiếu Quà Tặng, Sách
                    Giáo Khoa, Máy Tính và Giấy Photo và Một Số Loại Giấy và Bảng Khác
                </p>
                <div className='item-baseline mt-3 flex justify-between'>
                    <span className='text-sm text-black/60'>HSD: 30/06/2025</span>
                    {/* <div className='-mt-1 mr-3 flex cursor-pointer gap-2 rounded-xl border-[1.5px] border-primary px-3 py-1 font-normal text-primary'>
                        Đã áp dụng
                        <CheckOutlined className='text-green-500' />
                    </div> */}
                    <div className='-mt-1 mr-3 flex cursor-pointer gap-2 rounded-xl border-[1.5px] font-normal'>
                        <CouponButton title='Áp dụng' />
                    </div>
                </div>
                <span className='absolute -right-1 -top-4 rounded-bl-lg rounded-tr-lg bg-[#ffd088] px-2 py-0.5 text-xs text-yellow-900'>
                    Ví coupon
                </span>
            </div>
        </div>
    );
};

export default memo(CouponItem);
