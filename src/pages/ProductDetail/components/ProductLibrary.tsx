import useWindowSize from '@/hooks/common/useWindowSize';
import { IProductResponse } from '@/types/product';
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useCallback, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';
import { A11y, Navigation } from 'swiper/modules';
import clsx from 'clsx';

type LibraryProps = {
    productDetail: IProductResponse;
};

const ProductLibrary = ({ productDetail }: LibraryProps) => {
    const { windowWidth } = useWindowSize();
    const [indexImage, setIndexImage] = useState(0);
    const [isSwiperHorizontalReady, setIsSwiperHorizontalReady] = useState(false);
    const [isSwiperVerticalReady, setIsSwiperVerticalReady] = useState(false);

    const swiperRef = useRef<SwiperClass | null>(null);

    const nextSlide = useCallback(() => {
        if (!swiperRef.current || (!isSwiperHorizontalReady && !isSwiperVerticalReady)) return;
        swiperRef.current.slideNext();
    }, [swiperRef, isSwiperHorizontalReady, isSwiperVerticalReady]);

    const prevSlide = useCallback(() => {
        if (!swiperRef.current || (!isSwiperHorizontalReady && !isSwiperVerticalReady)) return;
        swiperRef.current.slidePrev();
    }, [swiperRef, isSwiperHorizontalReady, isSwiperVerticalReady]);

    const handleSlideChange = useCallback((swiper: SwiperClass) => {
        setIndexImage(swiper.realIndex);
    }, []);

    return (
        <>
            <div className='flex w-full flex-wrap gap-8 overflow-hidden md:flex-nowrap'>
                <div className={`relative ${windowWidth < 768 ? 'h-60 w-full' : 'max-h-library h-full w-32'}`}>
                    {windowWidth < 768 && (
                        <Swiper
                            modules={[Navigation, A11y]}
                            direction={'horizontal'}
                            spaceBetween={8}
                            slidesPerView={1}
                            navigation={false}
                            onDestroy={() => {
                                setIsSwiperHorizontalReady(false);
                            }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                                setIsSwiperHorizontalReady(true);
                            }}
                            onSlideChange={handleSlideChange}
                            loop={productDetail.library.length > 3}
                            className='h-full'
                        >
                            {productDetail.library.map((image, index) => (
                                <SwiperSlide
                                    key={index}
                                    className={`${clsx({ 'border border-black/70': index === indexImage })} w-full cursor-pointer px-8 sm:max-h-80 sm:px-20`}
                                    onClick={() => {
                                        setIndexImage(index);
                                    }}
                                >
                                    <Image
                                        src={image.imageUrl}
                                        className='h-full w-full object-contain'
                                        alt='product'
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                    {windowWidth > 768 && (
                        <Swiper
                            modules={[Navigation, A11y]}
                            direction={'vertical'}
                            spaceBetween={8}
                            slidesPerView={4}
                            navigation={false}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                                setIsSwiperVerticalReady(true);
                            }}
                            onDestroy={() => {
                                setIsSwiperVerticalReady(false);
                            }}
                            onSlideChange={handleSlideChange}
                            loop={productDetail.library.length > 3}
                            className='h-full'
                        >
                            {productDetail.library.map((image, index) => (
                                <SwiperSlide
                                    key={index}
                                    className={`${clsx({ 'border border-black/70 p-0.5': index === indexImage })} w-full cursor-pointer`}
                                    onClick={() => {
                                        setIndexImage(index);
                                    }}
                                >
                                    <img src={image.imageUrl} className='h-full w-full object-cover' alt='product' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                    {productDetail.library.length > 3 && windowWidth > 768 ? (
                        <>
                            <div
                                onClick={prevSlide}
                                className='absolute left-[calc(50%)] top-1 z-10 -translate-x-1/2 cursor-pointer select-none rounded-[2px] bg-black/50 px-2 py-1 duration-300 hover:bg-black/40'
                            >
                                <UpOutlined style={{ color: '#fff', fontSize: 14 }} />
                            </div>
                            <div
                                onClick={nextSlide}
                                className='absolute bottom-1 left-[calc(50%)] z-10 -translate-x-1/2 cursor-pointer select-none rounded-[2px] bg-black/50 px-2 py-1 duration-300 hover:bg-black/40'
                            >
                                <DownOutlined style={{ color: '#fff', fontSize: 14 }} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                onClick={prevSlide}
                                className='absolute left-0 top-[calc(50%)] z-10 -translate-y-1/2 cursor-pointer select-none rounded-[2px] bg-black/50 px-2 py-1 duration-300 hover:bg-black/40'
                            >
                                <LeftOutlined style={{ color: '#fff', fontSize: 14 }} />
                            </div>
                            <div
                                onClick={nextSlide}
                                className='absolute right-0 top-[calc(50%)] z-10 -translate-y-1/2 cursor-pointer select-none rounded-[2px] bg-black/50 px-2 py-1 duration-300 hover:bg-black/40'
                            >
                                <RightOutlined style={{ color: '#fff', fontSize: 14 }} />
                            </div>
                        </>
                    )}
                </div>
                {windowWidth > 768 && (
                    <div className='max-h-library max-w-library m-auto flex w-full items-center justify-center overflow-hidden md:m-0'>
                        <Image
                            className='max-h-full max-w-full object-contain'
                            src={productDetail.library[indexImage]?.imageUrl}
                        ></Image>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductLibrary;
