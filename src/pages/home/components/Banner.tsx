import { memo, useRef } from 'react';
import { Carousel, Button } from 'antd';
import type { CarouselRef } from 'antd/es/carousel'; // ✅ Kiểu chính xác
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { useNavigate } from 'react-router-dom';
import { banners } from '../../../data/mock-data';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Banner: React.FC = () => {
    const navigate = useNavigate();
    const carouselRef = useRef<CarouselRef | null>(null); // ✅ Đúng kiểu

    return (
        <div className='relative mb-12 h-[400px] overflow-hidden rounded-xl shadow-lg md:h-[500px]'>
            <Carousel ref={carouselRef} autoplay dots={false} effect='scrollx'>
                {banners.map((banner) => (
                    <div key={banner.id} className='relative h-[400px] md:h-[500px]'>
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className='absolute inset-0 h-full w-full object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent' />
                        <div className='relative z-10 flex h-full flex-col justify-center px-6 md:px-16'>
                            <Title level={1} className='mb-4 !bg-transparent !text-white drop-shadow-lg'>
                                {banner.title}
                            </Title>
                            <Paragraph className='mb-6 max-w-xl !bg-transparent text-lg !text-white drop-shadow'>
                                {banner.description}
                            </Paragraph>
                            <Button
                                type='primary'
                                ghost
                                className='!h-10 !w-20 !bg-transparent !px-6 !text-sm'
                                onClick={() => {
                                    void navigate(banner.link);
                                }}
                            >
                                Xem ngay
                            </Button>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Nút chuyển trái/phải */}
            <Button
                shape='circle'
                icon={<LeftOutlined />}
                className='absolute left-4 top-1/2 z-20 -translate-y-1/2 border-none bg-black/40 text-white hover:bg-black/60'
                onClick={() => carouselRef.current?.prev()}
            />
            <Button
                shape='circle'
                icon={<RightOutlined />}
                className='absolute right-4 top-1/2 z-20 -translate-y-1/2 border-none bg-black/40 text-white hover:bg-black/60'
                onClick={() => carouselRef.current?.next()}
            />
        </div>
    );
};

export default memo(Banner);
