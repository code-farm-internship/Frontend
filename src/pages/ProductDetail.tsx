import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Rate, InputNumber, Card, Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { bestSellers, newReleases, recommendedBooks } from '../data/mock-data';

const { Title, Text } = Typography;

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const allBooks = [...bestSellers, ...newReleases, ...recommendedBooks];
    const product = allBooks.find((book) => book.id === id);
    const [quantity, setQuantity] = React.useState(1);

    if (!product) {
        return <div>Không tìm thấy sản phẩm</div>;
    }

    return (
        <div className='mx-auto max-w-7xl px-4 py-8'>
            <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                    <div className='aspect-[3/4] overflow-hidden rounded-lg'>
                        <img src={product.coverImage} alt={product.title} className='h-full w-full object-cover' />
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className='space-y-6'>
                        <div>
                            <Title level={2}>{product.title}</Title>
                            <Rate defaultValue={5} disabled />
                            <Text className='ml-2 text-gray-500'>(15 đánh giá)</Text>
                        </div>

                        <div className='space-y-2'>
                            <Title level={4} className='text-red-500'>
                                {product.price.toLocaleString('vi-VN')}đ
                            </Title>
                            {product.discountPrice && (
                                <Text delete className='text-gray-500'>
                                    {product.discountPrice.toLocaleString('vi-VN')}đ
                                </Text>
                            )}
                        </div>

                        <div className='space-y-4'>
                            <div>
                                <Text strong>Mã sách:</Text>
                                <Text className='ml-2'>2891855</Text>
                            </div>
                            <div>
                                <Text strong>Tác giả:</Text>
                                <Text className='ml-2'>Gege Akutami</Text>
                            </div>
                            <div>
                                <Text strong>Kích thước:</Text>
                                <Text className='ml-2'>11.3 x 17.6 cm</Text>
                            </div>
                            <div>
                                <Text strong>Định dạng:</Text>
                                <Text className='ml-2'>Bìa mềm</Text>
                            </div>
                            <div>
                                <Text strong>Trọng lượng:</Text>
                                <Text className='ml-2'>140 gram</Text>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div>
                                <Text strong>Số lượng:</Text>
                                <InputNumber
                                    min={1}
                                    value={quantity}
                                    onChange={(value) => {
                                        setQuantity(value || 1);
                                    }}
                                    className='ml-2'
                                />
                            </div>
                            <Button
                                type='primary'
                                size='large'
                                icon={<ShoppingCartOutlined />}
                                className='w-full'
                                onClick={() => {
                                    void navigate('/cart');
                                }}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className='mt-12'>
                <Title level={3}>Sách cùng thể loại</Title>
                <Row gutter={[16, 16]} className='mt-4'>
                    {bestSellers.slice(0, 4).map((book) => (
                        <Col key={book.id} xs={12} sm={6}>
                            <Card
                                hoverable
                                onClick={() => {
                                    void navigate(`/product/${book.id}`);
                                }}
                                cover={
                                    <div className='aspect-[3/4] overflow-hidden'>
                                        <img
                                            alt={book.title}
                                            src={book.coverImage}
                                            className='h-full w-full object-cover'
                                        />
                                    </div>
                                }
                            >
                                <Card.Meta
                                    title={book.title}
                                    description={
                                        <Text className='text-red-500'>{book.price.toLocaleString('vi-VN')}đ</Text>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProductDetail;
