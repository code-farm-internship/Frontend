import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../types';

const { Title } = Typography;

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const navigate = useNavigate();
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

const BookGrid: React.FC<{ title: string; books: Book[] }> = ({ title, books }) => {
    return (
        <div className='mb-12'>
            <Title level={3}>{title}</Title>
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

export default BookGrid;
