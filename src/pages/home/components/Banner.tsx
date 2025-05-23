import { memo, useMemo } from 'react';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { banners } from '../../../data/mock-data';

const Banner: React.FC = () => {
    const navigate = useNavigate();
    const banner = useMemo(() => banners[0], []);

    return (
        <div className='relative mb-12 h-[400px] overflow-hidden rounded-xl shadow-lg md:h-[500px]'>
            <img src={banner.image} alt={banner.title} className='absolute inset-0 h-full w-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent' />
            <div className='relative z-10 flex h-full flex-col justify-center px-6 text-white md:px-16'>
                <Title level={1} className='mb-4 text-white drop-shadow-lg'>
                    {banner.title}
                </Title>
                <Paragraph className='mb-6 max-w-xl text-lg text-white drop-shadow'>{banner.description}</Paragraph>
                <Button
                    type='primary'
                    size='large'
                    ghost
                    onClick={() => {
                        void navigate('/product'); // hoặc đường dẫn bạn muốn chuyển đến
                    }}
                >
                    Xem ngay
                </Button>
            </div>
        </div>
    );
};

export default memo(Banner);
