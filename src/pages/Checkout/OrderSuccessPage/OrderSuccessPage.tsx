import { Card, Result, Watermark } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage: React.FC = () => {
    return (
        <Watermark content={'AyaBook'}>
            <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6'>
                <Card className='w-full max-w-2xl rounded-xl text-center shadow-lg'>
                    <Result
                        status='success'
                        title='Đơn đặt hàng của bạn đã gửi thành công!'
                        subTitle='Bạn sẽ nhận được thông báo xác nhận qua email của chúng tôi.'
                    />
                    <div className='flex items-center gap-2'>
                        <Link to='/' className='w-2/3'>
                            <button className='mt-4 w-full cursor-pointer rounded-md border border-red-700 px-4 py-2 text-black duration-300 hover:bg-primary hover:text-white'>
                                Về trang chủ
                            </button>
                        </Link>
                        <Link to={`/`} className='w-2/3'>
                            <button className='mt-4 w-full cursor-pointer rounded-md border border-red-700 px-4 py-2 text-black duration-300 hover:bg-primary hover:text-white'>
                                Xem đơn hàng
                            </button>
                        </Link>
                    </div>
                </Card>
            </div>
        </Watermark>
    );
};

export default OrderSuccessPage;
