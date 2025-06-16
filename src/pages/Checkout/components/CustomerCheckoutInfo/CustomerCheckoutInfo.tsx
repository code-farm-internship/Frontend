import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { IAdministrativeUnit, IReceiverInfo } from '@/types/checkout';
import { IOrderPayload } from '@/types/order';
import { buildOrderPayload } from '@/utils/order';
import { customerInfoSchema, ReceiverData } from '@/validations/checkout/customerInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'antd';
import { debounce } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CustomerAddress from './CustomerAddress';
import CustomerInfo from './CustomerInfo';
import { SHIPPING_FEE } from '@/constants/constants';

type CustomerInfoProps = {
    handleTriggerSubmit: (callback: () => void) => void;
    createOrder: (orderData: IOrderPayload) => void;
};

export type CheckoutForm = {
    fullName: string;
    email: string;
    phoneNumber: string;
    userNote: string;
    detailAddress: string;
    province: IAdministrativeUnit;
    district: IAdministrativeUnit;
    ward: IAdministrativeUnit;
    receiverInfo?: IReceiverInfo;
    isAnotherReceiver: boolean;
};

export type PartialCheckoutForm = Partial<CheckoutForm>;

const CustomerCheckoutInfo = ({ handleTriggerSubmit, createOrder }: CustomerInfoProps) => {
    const setCheckoutInfo = useCheckoutStore((state) => state.setCheckoutInfo);
    const checkoutInfo = useCheckoutStore((state) => state.checkoutInfo);
    const cartItems = useCartStore((state) => state.items);
    const orderItems = useMemo(
        () =>
            cartItems.map((item) => ({
                productVariantId: item.variantId._id,
                quantity: item.quantity,
                price: item.variantId.price,
                name: item.productId.name,
                productId: item.productId._id,
            })),
        [cartItems],
    );
    const [checkoutFormData, setCheckoutFormData] = useState<CheckoutForm>(checkoutInfo as CheckoutForm);
    const isFirstTimeRender = useRef(true);

    const methods = useForm<ReceiverData>({
        resolver: zodResolver(customerInfoSchema),
        defaultValues: {
            email: checkoutFormData.email || '',
            phoneNumber: checkoutFormData.phoneNumber || '',
            fullName: checkoutFormData.fullName || '',
            detailAddress: checkoutFormData.detailAddress || '',
            district: checkoutFormData.district.id || '',
            province: checkoutFormData.province.id || '',
            ward: checkoutFormData.ward.code || '',
            recevierName: checkoutFormData.receiverInfo?.recevierName || '',
            recevierPhoneNumber: checkoutFormData.receiverInfo?.recevierPhoneNumber || '',
            userNote: checkoutFormData.userNote || '',
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: ReceiverData) => {
        if (orderItems.length > 0) {
            const payload = buildOrderPayload(data, checkoutInfo, orderItems, SHIPPING_FEE);
            createOrder(payload);
        }
    };

    const handleDebouceCheckoutData = useMemo(
        () =>
            debounce((checkoutInfo: CheckoutForm) => {
                setCheckoutInfo(checkoutInfo);
            }, 600),
        [setCheckoutInfo],
    );

    const handleSetCheckoutFormData = useCallback((data: PartialCheckoutForm) => {
        setCheckoutFormData((prev) => ({ ...prev, ...data }));
    }, []);

    useEffect(() => {
        handleTriggerSubmit(() => {
            void handleSubmit(onSubmit)();
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleTriggerSubmit, handleSubmit]);

    useEffect(() => {
        if (!isFirstTimeRender.current) {
            handleDebouceCheckoutData(checkoutFormData);
        }

        isFirstTimeRender.current = false;
    }, [checkoutFormData, handleDebouceCheckoutData]);

    return (
        <FormProvider {...methods}>
            <Form layout='vertical' className='space-y-8'>
                <CustomerInfo checkoutData={checkoutFormData} setCheckoutFormData={handleSetCheckoutFormData} />
                <CustomerAddress setCheckoutFormData={handleSetCheckoutFormData} />
            </Form>
        </FormProvider>
    );
};

export default memo(CustomerCheckoutInfo);
