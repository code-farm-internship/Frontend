import { twMerge } from 'tailwind-merge';

type Props = {
    title: string;
    customClass?: string;
};

const CouponButton = ({ title, customClass = '' }: Props) => {
    return (
        <div
            className={twMerge(
                'min-w-16 cursor-pointer rounded-md bg-primary bg-cover bg-no-repeat px-2 py-1 text-xs font-medium text-white duration-300 hover:opacity-95 sm:px-3 sm:text-sm md:rounded-lg md:px-5',
                customClass,
            )}
        >
            {title}
        </div>
    );
};

export default CouponButton;
