import useUpdateCartQuantity from '@/hooks/cart/mutations/useUpdateCartQuantity';
import { ICartItems, ICartPayload } from '@/types/cart';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import _ from 'lodash';
import { memo, useEffect, useMemo, useState } from 'react';

type CartItemQuantityProps = {
    variant: ICartItems['variantId'];
    quantity: number;
};

const CartItemQuantity = ({ variant, quantity }: CartItemQuantityProps) => {
    const { mutate: updateCartItemQuantity } = useUpdateCartQuantity();
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const [debounceQuantity, setDebounceQuantity] = useState<number | null>(null);
    const maxStock = variant.stock;

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
            setItemQuantity(newQuantity);
            setDebounceQuantity(newQuantity);
        }
    };

    const handleDecreaseQuantity = (quantity: number) => {
        const newQuantity = quantity - 1;

        if (quantity > 1) {
            setItemQuantity(newQuantity);
            setDebounceQuantity(newQuantity);
        }
    };

    useEffect(() => {
        if (debounceQuantity) {
            handleDebounceUpdateQuantity({
                quantity: debounceQuantity,
                variantId: variant._id,
            });
        }
    }, [debounceQuantity, handleDebounceUpdateQuantity]);

    useEffect(() => {
        if (quantity !== itemQuantity) {
            setItemQuantity(quantity);
        }
    }, [quantity]);
    return (
        <div className='flex gap-1'>
            <MinusOutlined
                style={{ fontSize: 12 }}
                disabled={itemQuantity < 2}
                onClick={() => {
                    handleDecreaseQuantity(itemQuantity);
                }}
                className='-mr-2 cursor-pointer select-none rounded-sm border border-black px-2'
            />
            <InputNumber
                min={1}
                value={itemQuantity}
                controls={false}
                onChange={(value) => {
                    if (value) {
                        setItemQuantity(value);
                        setDebounceQuantity(value);
                    }
                }}
                max={maxStock}
                className='center-quantity-input ml-2 w-32 select-none font-medium'
            />
            <PlusOutlined
                style={{ fontSize: 12 }}
                disabled={itemQuantity >= maxStock}
                onClick={() => {
                    handleIncreaseQuantity(itemQuantity, maxStock);
                }}
                className='cursor-pointer select-none rounded-sm border border-black px-2'
            />
        </div>
    );
};

export default memo(CartItemQuantity);
