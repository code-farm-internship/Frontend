import useAddToCart from '@/hooks/cart/mutations/useAddToCart';
import { IProductResponse, IVariant } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, InputNumber, Rate } from 'antd';
import Title from 'antd/es/typography/Title';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import VariantItem from './VariantItem';
import { useParams } from 'react-router-dom';
import { calculateDiscountPrice } from '@/utils/calculateTotalDiscountPrice';

type ProductDetailProps = {
    productDetail: IProductResponse;
};

const ProductDetailInfo = ({ productDetail }: ProductDetailProps) => {
    const [chooseVariant, setChooseVariant] = useState<IVariant>();
    const [quantity, setQuantity] = useState(1);
    const { mutate: addToCart, isPending } = useAddToCart();
    const { id } = useParams();

    const foundedVariant = useMemo(() => productDetail.variants.find((variant) => variant.stock > 0), [productDetail]);

    const discountPrice = useMemo(() => {
        return chooseVariant ? calculateDiscountPrice(chooseVariant) : 0;
    }, [chooseVariant]);

    const handleChooseVariant = useCallback((variant: IVariant) => {
        setChooseVariant(variant);
    }, []);

    const handleIncreaseQuantity = useCallback((quantity: number, stock: number = 1) => {
        if (quantity < stock) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    }, []);

    const handleDecreaseQuantity = useCallback((quantity: number) => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    }, []);

    const handleAddToCart = useCallback(
        (chooseVariant: IVariant, quantity: number, productId: string) => {
            addToCart({ variantId: chooseVariant._id, productId, quantity });
        },
        [addToCart],
    );

    useEffect(() => {
        if (foundedVariant) {
            setChooseVariant(foundedVariant);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <VariantItem
                            key={variant._id}
                            handleChooseVariant={handleChooseVariant}
                            variant={variant}
                            chooseVariant={chooseVariant}
                        />
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
                                if (quantity > 1) {
                                    handleDecreaseQuantity(quantity);
                                }
                            }}
                            className='-mr-2 cursor-pointer select-none rounded-md border border-black px-2'
                        />
                        <InputNumber
                            min={1}
                            value={quantity}
                            controls={false}
                            defaultValue={1}
                            onChange={(value) => {
                                if (value) {
                                    setQuantity(value);
                                }
                            }}
                            max={chooseVariant?.stock || 1}
                            className='center-quantity-input ml-2 w-32 font-medium'
                        />
                        <PlusOutlined
                            onClick={() => {
                                if (chooseVariant && quantity < chooseVariant.stock) {
                                    handleIncreaseQuantity(quantity, chooseVariant.stock);
                                }
                            }}
                            className='cursor-pointer select-none rounded-md border border-black px-2'
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button
                    type='primary'
                    disabled={!foundedVariant || isPending}
                    loading={isPending}
                    onClick={() => {
                        if (chooseVariant && id) {
                            handleAddToCart(chooseVariant, quantity, id);
                        }
                    }}
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

export default memo(ProductDetailInfo);
