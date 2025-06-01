import { z } from 'zod';

export const registerSchema = z
    .object({
        email: z.string().email('Email không hợp lệ'),
        username: z
            .string()
            .nonempty('Tài khoản là bắt buộc')
            .min(6, 'Tài khoản phải có ít nhất 6 ký tự')
            .max(50, 'Tài khoản phải ít  hơn 50 kí tự'),
        password: z.string().nonempty('Mật khẩu là bắt buộc').min(6, 'Mật khẩu ít nhất 6 ký tự'),
        retypePassword: z.string(),
    })
    .refine((data) => data.password === data.retypePassword, {
        message: 'Mật khẩu nhập lại không khớp',
        path: ['retypePassword'],
    });
