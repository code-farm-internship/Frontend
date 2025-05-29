import React from 'react';
import { Typography, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { newReleases, bestSellers, recommendedBooks } from '../../data/mock-data';
import Banner from './components/Banner';
import BookGrid from './components/BookGrid';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='animate-fadeIn mx-auto max-w-7xl px-4 py-6'>
            <Banner />

            <BookGrid title='SÁCH MỚI NHẤT' books={newReleases} />

            <div className='mb-12 rounded-xl bg-red-50 p-8 text-center'>
                <Title level={2} className='mb-4 text-primary'>
                    Ưu đãi đặc biệt
                </Title>
                <Paragraph className='mb-6 text-lg'>Giảm giá lên đến 30% cho tất cả sách mới trong tháng</Paragraph>
                <Button
                    type='primary'
                    size='large'
                    danger
                    onClick={() => {
                        void navigate('/discounts'); // thay bằng đường dẫn phù hợp
                    }}
                >
                    Xem ngay
                </Button>
            </div>

            <BookGrid title='BÁN CHẠY NHẤT' books={bestSellers} />

            <div className='mb-12 rounded-xl bg-blue-50 p-8'>
                <Space align='center' className='w-full justify-between'>
                    <div>
                        <Title level={2} className='mb-4 text-blue-500'>
                            Giao Hàng Miễn Phí
                        </Title>
                        <Paragraph className='mb-0 text-lg'>
                            Cho tất cả đơn hàng trên 150.000đ khi mua sách tại ApoBook
                        </Paragraph>
                    </div>
                    <Button
                        type='primary'
                        size='large'
                        onClick={() => {
                            void navigate('/shipping-info'); // thay bằng link phù hợp
                        }}
                    >
                        Tìm hiểu thêm
                    </Button>
                </Space>
            </div>

            <BookGrid title='SÁCH KHUYÊN ĐỌC' books={recommendedBooks} />
        </div>
    );
};

export default HomePage;
