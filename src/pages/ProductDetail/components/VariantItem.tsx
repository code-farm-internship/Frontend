import { IVariant } from '@/types/product';
import clsx from 'clsx';
import { memo } from 'react';

type VariantItemProps = {
    variant: IVariant;
    chooseVariant?: IVariant;
    handleChooseVariant: (variant: IVariant) => void;
};

const VariantItem = ({ variant, chooseVariant, handleChooseVariant }: VariantItemProps) => {
    return (
        <div
            key={variant._id}
            className={`${clsx({
                'border-black/60': variant._id === chooseVariant?._id,
                'pointer-events-none opacity-50': variant.stock === 0,
            })} relative flex min-w-28 cursor-pointer select-none items-center justify-center gap-2 border-2 border-black/40 px-2 py-2 duration-200 hover:border-black/60`}
            onClick={() => {
                if (variant.stock > 0) {
                    handleChooseVariant(variant);
                }
            }}
        >
            <img src={variant.image} className='w-5' alt='variant product' />
            <span className='capitalize'>{variant.formatId.name}</span>
        </div>
    );
};

export default memo(VariantItem);
