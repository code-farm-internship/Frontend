import { useCartStore } from '@/store/cartStore';
import '@/styles/antdCheckbox.css';
import { Checkbox } from 'antd';
import { memo } from 'react';

type Props = {
    type: 'all' | 'item';
    variantId?: string;
    isSeleted?: boolean;
};

const CheckboxCartDetail = ({ type, variantId, isSeleted }: Props) => {
    const setSelected = useCartStore((state) => state.setSelected);
    const setSelectedAll = useCartStore((state) => state.setSelectedAll);
    const isSelectedAll = useCartStore((state) => state.isSelectedAll);
    const cartQuantity = useCartStore((state) => state.items).length;

    if (type == 'all') {
        return cartQuantity === 0 ? (
            <></>
        ) : (
            <Checkbox
                className='checkbox-black'
                checked={isSelectedAll}
                disabled={cartQuantity === 0}
                onClick={() => {
                    setSelectedAll();
                }}
            />
        );
    }
    return (
        <Checkbox
            className='checkbox-black'
            checked={isSeleted}
            onClick={() => {
                if (variantId) setSelected(variantId);
            }}
        />
    );
};

export default memo(CheckboxCartDetail);
