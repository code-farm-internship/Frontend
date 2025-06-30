export enum PaymentMethod {
    COD = 'COD',
    CARD = 'ONLINE',
}

export interface IReceiverInfo {
    recevierName: string;
    recevierPhoneNumber: string;
}
export interface IAdministrativeUnit {
    name: string;
    id?: number | null;
    code?: string | null;
}

export interface ICheckoutInfo {
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
}
export type PartialCheckoutInfo = Partial<ICheckoutInfo>;
