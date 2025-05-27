import { DiscountType } from '@/types/discount';
import { IProductResponse, IVariant } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, InputNumber, Rate } from 'antd';
import Title from 'antd/es/typography/Title';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

type ProductDetailProps = {
    productDetail: IProductResponse;
};

const ProductDetailInfo = ({ productDetail }: ProductDetailProps) => {
    const [chooseVariant, setChooseVariant] = useState<IVariant>();
    const [quantity, setQuantity] = useState(1);
    const isOutOfStock = productDetail.variants.every((variant) => variant.stock < 0);

    const discountPrice =
        chooseVariant?.discountId?.discountType === DiscountType.PERCENT
            ? chooseVariant.price - (chooseVariant.price * chooseVariant.discountId.discountValue) / 100
            : (chooseVariant?.price as number) - (chooseVariant?.discountId?.discountValue as number);

    const handleChooseVariant = (variant: IVariant) => {
        setChooseVariant(variant);
    };

    const handleIncreaseQuantity = (quantity: number, stock: number = 1) => {
        if (quantity < stock) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const handleDecreaseQuantity = (quantity: number) => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    useEffect(() => {
        const foundedVariant = productDetail.variants.find((variant) => variant.stock > 0);
        if (foundedVariant) {
            setChooseVariant(foundedVariant);
        }
    }, [productDetail.variants]);

    return (
        <div className='w-full space-y-6'>
            <div className='border-b border-b-gray-200 pb-8'>
                <Title className='capitalize' level={2}>
                    {productDetail.name}
                </Title>
                <div className='flex items-center gap-4'>
                    <Rate allowHalf value={productDetail.rating} style={{ fontSize: 16 }} disabled />
                    <div className='flex gap-2 text-gray-500'>
                        <span className=''>({productDetail.reviewCount})</span>
                    </div>
                    <div className='relative before:absolute before:-left-2.5 before:top-1/2 before:ml-0.5 before:h-5 before:w-[1px] before:-translate-y-1/2 before:bg-black/60 before:content-[""]'>
                        Đã bán: <span>{productDetail.sold}</span>
                    </div>
                </div>
            </div>
            <div className='space-y-4 border-b border-b-gray-200 pb-8'>
                <div>
                    <span className='text-base font-medium capitalize'>{chooseVariant?.formatId.name}</span>
                    <div className='flex items-baseline gap-4'>
                        {chooseVariant && !chooseVariant.discountId && (
                            <span className='text-2xl font-bold'>{formatCurrency(chooseVariant.price)}</span>
                        )}
                        {chooseVariant?.discountId && (
                            <>
                                <span className='text-2xl font-bold'>{formatCurrency(discountPrice)}</span>
                                <span className='text-black/80 line-through'>
                                    {formatCurrency(chooseVariant.price || 0)}
                                </span>
                                <span className='relative text-sm text-red-500 before:absolute before:-left-2.5 before:top-1/2 before:ml-0.5 before:h-4 before:w-[1px] before:-translate-y-1/2 before:bg-black/60 before:content-[""]'>
                                    Giảm {chooseVariant.discountId.discountValue}%
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5'>
                    {productDetail.variants.map((variant) => (
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
                    ))}
                </div>
            </div>
            <div className='space-y-4'>
                <div className='flex gap-1'>
                    Số lượng còn lại:
                    <span className='font-medium'>{chooseVariant?.stock}</span>
                </div>
                <div className='flex items-baseline gap-3'>
                    <span>Số lượng:</span>
                    <div className='flex gap-1'>
                        <MinusOutlined
                            onClick={() => {
                                handleDecreaseQuantity(quantity);
                            }}
                            className='-mr-2 cursor-pointer select-none rounded-sm border border-black px-2'
                        />
                        <InputNumber
                            min={1}
                            value={quantity}
                            onChange={(value) => {
                                if (value && value < (chooseVariant?.stock as number)) {
                                    setQuantity(value || 1);
                                }
                            }}
                            max={chooseVariant?.stock || 1}
                            className='center-quantity-input ml-2 w-32 font-medium'
                        />
                        <PlusOutlined
                            onClick={() => {
                                handleIncreaseQuantity(quantity, chooseVariant?.stock as number);
                            }}
                            className='cursor-pointer select-none rounded-sm border border-black px-2'
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button
                    type='primary'
                    disabled={isOutOfStock}
                    className='mt-4'
                    size='large'
                    icon={<ShoppingCartOutlined />}
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
            {/* <div className='space-y-4'>
                            <div>
                                <span>Mã sách:</span>
                                <span className='ml-2'>2891855</span>
                            </div>
                            <div>
                                <span>Tác giả:</span>
                                <span className='ml-2'>Gege Akutami</span>
                            </div>
                            <div>
                                <span>Kích thước:</span>
                                <span className='ml-2'>11.3 x 17.6 cm</span>
                            </div>
                            <div>
                                <span>Trọng lượng:</span>
                                <span className='ml-2'>140 gram</span>
                            </div>
                        </div> */}
        </div>
    );
};

export default ProductDetailInfo;
