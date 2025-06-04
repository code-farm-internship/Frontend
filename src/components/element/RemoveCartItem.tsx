import useRemoveCartItem from '@/hooks/cart/mutations/useRemoveCartItem';
import { Popconfirm } from 'antd';
import React, { memo } from 'react';

type Props = {
    variantId: string;
    children?: React.ReactNode;
};

const RemoveCartItem = ({ variantId, children }: Props) => {
    const { mutate: removeCartItem } = useRemoveCartItem();

    return (
        <Popconfirm
            title={<></>}
            placement='leftTop'
            description='Bạn có muốn xóa sản phẩm này không?'
            onConfirm={() => {
                removeCartItem(variantId);
            }}
            okText='Đồng ý'
            cancelText='Hủy'
        >
            {children}
        </Popconfirm>
    );
};

export default memo(RemoveCartItem);
