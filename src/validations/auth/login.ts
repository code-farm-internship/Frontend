import { z } from 'zod';

export const loginSchema = z.object({
    usernameOrEmail: z
        .string()
        .nonempty('Vui lòng nhập tài khoản hoặc email')
        .refine(
            (value) => {
                if (value.includes('@')) {
                    return z.string().email().safeParse(value).success;
                } else {
                    return /^[a-zA-Z0-9_]{6,}$/.test(value);
                }
            },
            {
                message: 'Tài khoản phải là email hợp lệ hoặc username ít nhất 6 ký tự',
            },
        ),

    password: z.string().nonempty('Mật khẩu không được để trống').min(6, 'Mật khẩu ít nhất 6 ký tự'),
});
