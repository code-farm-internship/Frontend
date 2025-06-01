import { ILoginPayload, ILoginResponse, IRegisterPayload } from '@/types/auth';
import { instance } from '@/utils/api/axiosInstance';

export const authService = {
    async register(body: IRegisterPayload) {
        const res = await instance.post<null>('auth/register', body);
        return res.data;
    },
    async login(body: ILoginPayload) {
        const res = await instance.post<ILoginResponse>('auth/login', body);
        return res.data;
    },
    async verifyEmail(token: string) {
        const res = await instance.post<null>(`auth/verify-email?token=${token}`);
        return res.data;
    },
    async resendVerifyEmail(body: { email: string }) {
        const res = await instance.post<null>(`auth/resend-verification`, body);
        return res.data;
    },
};
