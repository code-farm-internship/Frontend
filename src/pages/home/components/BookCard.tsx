import { Card } from 'antd';
import { Book } from '../../../types';
import { useNavigate } from 'react-router-dom';

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
export default BookCard;
