import React from 'react';
import { Typography, Button, Space, Card, Row, Col } from 'antd';
import { banners, newReleases, bestSellers, recommendedBooks } from '../data/mock-data';
import { Book } from '../types';

const { Title, Paragraph } = Typography;

// BookCard Component
const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const { title, price, coverImage, discountPrice } = book;

    return (
        <Card
            hoverable
            cover={
                <div style={{ height: 300, overflow: 'hidden' }}>
                    <img
                        alt={title}
                        src={coverImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                        }}
                    />
                </div>
            }
            styles={{ body: { padding: 12 } }}
        >
            <Card.Meta
                title={title}
                description={
                    <div>
                        {discountPrice ? (
                            <>
                                <span style={{ color: '#ff4d4f', fontWeight: 600 }}>
                                    {discountPrice.toLocaleString('vi-VN')}đ
                                </span>
                                <span style={{ marginLeft: 8, textDecoration: 'line-through', color: '#999' }}>
                                    {price.toLocaleString('vi-VN')}đ
                                </span>
                            </>
                        ) : (
                            <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{price.toLocaleString('vi-VN')}đ</span>
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
        <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0 }}>
                    {title}
                </Title>
                <Button type='link' style={{ color: '#ff4d4f' }}>
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

// HomePage Component with inline Banner
const HomePage: React.FC = () => {
    const banner = banners[0];

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
            {/* Banner Inline */}
            <div
                style={{
                    position: 'relative',
                    height: '400px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: 48,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${banner.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(255,77,79,0.8) 0%, transparent 100%)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        padding: '32px 64px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        maxWidth: '600px',
                    }}
                >
                    <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
                        {banner.title}
                    </Title>
                    <Paragraph style={{ color: '#fff', fontSize: 16, marginBottom: 24 }}>
                        {banner.description}
                    </Paragraph>
                    <Button type='primary' size='large' ghost>
                        Xem ngay
                    </Button>
                </div>
            </div>

            <BookGrid title='SÁCH MỚI NHẤT' books={newReleases} />

            <div
                style={{
                    background: '#fff1f0',
                    borderRadius: 8,
                    padding: 32,
                    textAlign: 'center',
                    marginBottom: 48,
                }}
            >
                <Title level={2} style={{ color: '#ff4d4f', marginBottom: 16 }}>
                    Ưu đãi đặc biệt
                </Title>
                <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
                    Giảm giá lên đến 30% cho tất cả sách mới trong tháng
                </Paragraph>
                <Button type='primary' size='large' danger>
                    Xem ngay
                </Button>
            </div>

            <BookGrid title='BÁN CHẠY NHẤT' books={bestSellers} />

            <div
                style={{
                    background: '#e6f7ff',
                    borderRadius: 8,
                    padding: 32,
                    marginBottom: 48,
                }}
            >
                <Space align='center' style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div>
                        <Title level={2} style={{ color: '#1890ff', marginBottom: 16 }}>
                            Giao Hàng Miễn Phí
                        </Title>
                        <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
                            Cho tất cả đơn hàng trên 150.000đ khi mua sách tại ApoBook
                        </Paragraph>
                    </div>
                    <Button type='primary' size='large'>
                        Tìm hiểu thêm
                    </Button>
                </Space>
            </div>

            <BookGrid title='SÁCH KHUYÊN ĐỌC' books={recommendedBooks} />
        </div>
    );
};

export default HomePage;
