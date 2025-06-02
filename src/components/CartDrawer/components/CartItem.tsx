import useRemoveCartItem from '@/hooks/cart/mutations/useRemoveCartItem';
import useUpdateCartQuantity from '@/hooks/cart/mutations/useUpdateCartQuantity';
import { ICartItems, ICartPayload } from '@/types/cart';
import { calculateDiscountPrice } from '@/utils/calculateTotalDiscountPrice';
import { formatCurrency } from '@/utils/formatCurrency';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { InputNumber, List, Popconfirm } from 'antd';
import _ from 'lodash';
import { memo, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type CartItem = {
    item: ICartItems;
};

const CartItem = ({ item }: CartItem) => {
    const { mutate: updateCartItemQuantity } = useUpdateCartQuantity();
    const { mutate: removeCartItem } = useRemoveCartItem();
    const [quantity, setQuantity] = useState(item.quantity);
    const [debounceQuantity, setDebounceQuantity] = useState<number | null>(null);
    const maxStock = item.variantId.stock;
    const discountPrice = useMemo(() => {
        return calculateDiscountPrice(item.variantId);
    }, [item.variantId]);

    const handleDebounceUpdateQuantity = useMemo(
        () =>
            _.debounce((payload: ICartPayload) => {
                updateCartItemQuantity(payload);
            }, 600),
        [],
    );

    const handleIncreaseQuantity = (quantity: number, stock: number = 1) => {
        const newQuantity = quantity + 1;

        if (quantity < stock) {
            setQuantity(newQuantity);
            setDebounceQuantity(newQuantity);
        }
    };

    const handleDecreaseQuantity = (quantity: number) => {
        const newQuantity = quantity - 1;

        if (quantity > 1) {
            setQuantity(newQuantity);
            setDebounceQuantity(newQuantity);
        }
    };

    useEffect(() => {
        if (debounceQuantity) {
            handleDebounceUpdateQuantity({
                quantity: debounceQuantity,
                variantId: item.variantId._id,
            });
        }
    }, [debounceQuantity, handleDebounceUpdateQuantity]);

    useEffect(() => {
        if (item.quantity !== quantity) {
            setQuantity(item.quantity);
        }
    }, [item.quantity]);

    return (
        <>
            <List.Item className='relative'>
                <div className='flex gap-4'>
                    <Link to={`/product/${item.productId._id}`} className='w-14'>
                        <img src={item.variantId.image} className='w-full object-contain' />
                    </Link>
                    <div className='space-y-2'>
                        <div className='flex gap-2'>
                            <Link
                                className='text-base font-medium duration-300 hover:text-primary'
                                to={`/product/${item.productId._id}`}
                            >
                                {item.productId.name}
                            </Link>
                            <span className='flex items-center justify-center rounded-sm border border-black/30 bg-white px-1 text-xs capitalize'>
                                {item.variantId.formatId.name}
                            </span>
                        </div>

                        <div className='flex gap-2'>
                            <span className='text-primary'>{formatCurrency(discountPrice)}</span>
                            <span className='text-gray-400 line-through'>{formatCurrency(item.variantId.price)}</span>
                            <span className='text-primary'>-{item.variantId.discountId?.discountValue}%</span>
                        </div>
                        <div className='flex gap-1'>
                            <MinusOutlined
                                style={{ fontSize: 12 }}
                                disabled={quantity < 2}
                                onClick={() => {
                                    handleDecreaseQuantity(quantity);
                                }}
                                className='-mr-2 cursor-pointer select-none rounded-sm border border-black px-2'
                            />
                            <InputNumber
                                min={1}
                                value={quantity}
                                controls={false}
                                max={maxStock}
                                className='center-quantity-input ml-2 w-32 font-medium'
                            />
                            <PlusOutlined
                                style={{ fontSize: 12 }}
                                disabled={quantity >= maxStock}
                                onClick={() => {
                                    handleIncreaseQuantity(quantity, maxStock);
                                }}
                                className='cursor-pointer select-none rounded-sm border border-black px-2'
                            />
                        </div>
                    </div>
                </div>
                <Popconfirm
                    title={<></>}
                    placement='leftTop'
                    description='Bạn có muốn xóa sản phẩm này không?'
                    onConfirm={() => {
                        removeCartItem(item.variantId._id);
                    }}
                    okText='Đồng ý'
                    cancelText='Hủy'
                >
                    <div className='absolute right-0 top-0 cursor-pointer rounded-full bg-red-500 px-2 py-1 duration-300 hover:bg-red-400'>
                        <DeleteOutlined style={{ color: '#fff' }} />
                    </div>
                </Popconfirm>
            </List.Item>
        </>
    );
};

export default memo(CartItem);
