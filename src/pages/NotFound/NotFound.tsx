import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookX } from 'lucide-react';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        void navigate('/');
    };

    // Hàm đồng bộ bọc handleGoHome
    const handleClick = () => {
        handleGoHome();
    };

    return (
        <div className='flex min-h-[80vh] items-center justify-center'>
            <div className='px-4 text-center'>
                <div className='mb-6 flex justify-center'>
                    <BookX size={120} className='text-red-500' />
                </div>
                <h1 className='mb-4 text-6xl font-bold text-gray-800'>404</h1>
                <h2 className='mb-6 text-2xl font-semibold text-gray-600'>Không tìm thấy trang</h2>
                <p className='mx-auto mb-8 max-w-md text-gray-500'>
                    Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
                </p>
                <button
                    onClick={handleClick}
                    className='transform rounded-full bg-red-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600'
                >
                    Quay về trang chủ
                </button>
            </div>
        </div>
    );
};

export default NotFound;
