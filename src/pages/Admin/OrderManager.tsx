import { Table, Tag, Button } from 'antd';
import { useGetOrders } from '@/hooks/order/queries/useGetOrders';
import { useMemo } from 'react';

interface Order {
    _id: string;
    customerInfo?: {
        username?: string;
    };
    createdAt: string;
    status: string;
    totalAmount: number;
}

interface OrdersResponse {
    data: {
        orders: Order[];
    };
}

const OrderManager = () => {
    const { data, isLoading } = useGetOrders();
    const orders: Order[] = Array.isArray((data?.data as OrdersResponse['data']).orders)
        ? (data?.data as OrdersResponse['data']).orders
        : [];

    const columns = useMemo(
        () => [
            {
                title: 'Mã đơn',
                dataIndex: '_id',
                key: '_id',
            },
            {
                title: 'Khách hàng',
                dataIndex: ['customerInfo', 'username'],
                key: 'customer',
                render: (_: unknown, record: Order) => record.customerInfo?.username || '-',
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (value: string) => new Date(value).toLocaleString(),
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
                render: (status: string) => <Tag color='blue'>{status}</Tag>,
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'totalAmount',
                key: 'totalAmount',
                render: (value: number) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            },
            {
                title: 'Thao tác',
                key: 'action',
                render: (_: unknown, _record: Order) => <Button type='link'>Xem chi tiết</Button>,
            },
        ],
        [],
    );

    return (
        <div>
            <h2>Quản lý đơn hàng</h2>
            <Table
                columns={columns}
                dataSource={orders}
                rowKey='_id'
                loading={isLoading}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default OrderManager;
