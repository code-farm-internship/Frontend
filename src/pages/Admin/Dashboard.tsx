export default function Dashboard() {
    return (
        <div className='min-h-screen space-y-8 bg-gray-50 p-6'>
            <h1 className='text-4xl font-bold text-gray-800'>📊 Bảng điều khiển</h1>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5'>
                {[
                    { label: 'Doanh thu hôm nay', value: '₫3.200.000', icon: '💰', color: 'bg-blue-100 text-blue-600' },
                    {
                        label: 'Tổng doanh thu',
                        value: '₫62.450.000',
                        icon: '📈',
                        color: 'bg-indigo-100 text-indigo-600',
                    },
                    { label: 'Đơn hàng mới', value: '42', icon: '🛒', color: 'bg-green-100 text-green-600' },
                    { label: 'Sản phẩm', value: '134', icon: '📦', color: 'bg-yellow-100 text-yellow-600' },
                    { label: 'Người dùng', value: '832', icon: '👥', color: 'bg-purple-100 text-purple-600' },
                ].map((item, i) => (
                    <div
                        key={i}
                        className='flex items-center justify-between rounded-2xl bg-white p-5 shadow transition-all hover:shadow-md'
                    >
                        <div>
                            <p className='text-sm text-gray-500'>{item.label}</p>
                            <p className='text-xl font-bold text-gray-800'>{item.value}</p>
                        </div>
                        <div className={`rounded-full p-2 text-2xl ${item.color}`}>{item.icon}</div>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                <div className='rounded-2xl bg-white p-6 shadow transition-all hover:shadow-md'>
                    <h2 className='mb-4 text-lg font-semibold text-gray-800'>📅 Doanh thu theo ngày</h2>
                    <div className='flex h-56 flex-col items-center justify-center rounded-lg bg-gray-100 text-gray-500'>
                        <div className='text-5xl'>📊</div>
                        <p className='mt-2'>Biểu đồ sẽ hiển thị tại đây</p>
                    </div>
                </div>

                <div className='rounded-2xl bg-white p-6 shadow transition-all hover:shadow-md'>
                    <h2 className='mb-4 text-lg font-semibold text-gray-800'>🚚 Tình trạng đơn hàng</h2>
                    <ul className='space-y-4'>
                        <li className='flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3'>
                            <span className='font-medium text-yellow-700'>🔄 Đang xử lý</span>
                            <span className='font-semibold text-yellow-700'>20</span>
                        </li>
                        <li className='flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3'>
                            <span className='font-medium text-green-700'>✅ Đã giao</span>
                            <span className='font-semibold text-green-700'>15</span>
                        </li>
                        <li className='flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3'>
                            <span className='font-medium text-red-700'>❌ Đã huỷ</span>
                            <span className='font-semibold text-red-700'>7</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
