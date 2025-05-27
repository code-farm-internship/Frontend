import { Button, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import BookCard from './BookCard';
import { Book } from '../../../types';

interface BookGridProps {
    title: string;
    books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ title, books }) => {
    const navigate = useNavigate();

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
                        void navigate('/products');
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

export default BookGrid;
