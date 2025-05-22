import React from 'react';
import { Typography, Button, Space, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { banners, newReleases, bestSellers, recommendedBooks } from '../data/mock-data';
import { Book } from '../types';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const Banner: React.FC = () => {
        const banner = banners[0];

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

    // BookCard Component
    const BookCard: React.FC<{ book: Book }> = ({ book }) => {
        const { title, price, coverImage, discountPrice } = book;

        return (
            <Card
                hoverable
                onClick={() => {
                    void navigate(`/product/${book.id}`);
                }}
                className='book-card'
                cover={
                    <div className='h-[300px] overflow-hidden'>
                        <img alt={title} src={coverImage} className='h-full w-full object-cover' />
                    </div>
                }
                styles={{ body: { padding: 20 } }}
            >
                <Card.Meta
                    title={title}
                    description={
                        <div>
                            {discountPrice ? (
                                <>
                                    <span className='price-tag'>{discountPrice.toLocaleString('vi-VN')}đ</span>
                                    <span className='ml-2 text-gray-400 line-through'>
                                        {price.toLocaleString('vi-VN')}đ
                                    </span>
                                </>
                            ) : (
                                <span className='price-tag'>{price.toLocaleString('vi-VN')}đ</span>
                            )}
                        </div>
                    }
                />
            </Card>
        );
    };

    // BookGrid Component
    const BookGrid: React.FC<{ title: string; books: Book[] }> = ({ title, books }) => {
        return (
            <div className='mb-12'>
                <div className='mb-6 flex items-center justify-between'>
                    <Title level={3} className='m-0'>
                        {title}
                    </Title>
                    <Button
                        type='link'
                        className='text-primary'
                        onClick={() => {
                            void navigate('/products'); // sửa đường dẫn nếu cần
                        }}
                    >
                        Xem tất cả
                    </Button>
                </div>
                <Row gutter={[16, 16]}>
                    {books.map((book) => (
                        <Col key={book.id} xs={12} sm={8} md={6}>
                            <BookCard book={book} />
                        </Col>
                    ))}
                </Row>
            </div>
        );
    };

    return (
        <div className='animate-fadeIn mx-auto max-w-7xl px-4 py-6'>
            <Banner />

            <BookGrid title='SÁCH MỚI NHẤT' books={newReleases} />

            <div className='mb-12 rounded-xl bg-red-50 p-8 text-center'>
                <Title level={2} className='text-primary mb-4'>
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
