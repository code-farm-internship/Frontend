import { z } from 'zod';

export const customerInfoSchema = z.object({
    email: z
        .string()
        .nonempty('Email không được để trống')
        .email('Email không hợp lệ')
        .refine(
            (val) => {
                const domain = val.split('@')[1];
                if (!domain) return false;
                const allowedTLDs = ['com', 'net', 'org', 'vn', 'edu', 'gov'];
                const tld = domain.split('.').pop();
                return tld && allowedTLDs.includes(tld);
            },
            {
                message: 'Tên miền không được hỗ trợ',
            },
        ),
    fullName: z
        .string()
        .nonempty('Tài khoản là bắt buộc')
        .min(6, 'Tài khoản phải có ít nhất 6 ký tự')
        .max(50, 'Tài khoản phải ít hơn 50 kí tự'),
    phoneNumber: z
        .string()
        .trim()
        .nonempty('Số điện thoại là bắt buộc')
        .transform((val) => val.replace(/\s/g, ''))
        .refine((val) => /^((\+84)(3|5|7|8|9)[0-9]{8}|0(3|5|7|8|9)[0-9]{8})$/.test(val), 'Số điện thoại không hợp lệ.'),
    recevierName: z
        .string()
        .min(6, 'Tên người nhận phải có ít nhất 6 ký tự')
        .max(50, 'Tên người nhận phải ít hơn 50 kí tự')
        .optional()
        .or(z.literal('')),
    recevierPhoneNumber: z
        .string()
        .trim()
        .transform((val) => val.replace(/\s/g, ''))
        .refine(
            (val) => /^((\+84)(3|5|7|8|9)[0-9]{8}|0(3|5|7|8|9)[0-9]{8})$/.test(val),
            'Số điện thoại người nhận không hợp lệ.',
        )
        .optional()
        .or(z.literal('')),
    detailAddress: z
        .string()
        .nonempty('Địa chỉ là bắt buộc')
        .min(6, 'Địa chỉ phải có ít nhất 6 ký tự')
        .max(50, 'Địa chỉ tối đa là 50 kí tự'),
    province: z.union([z.string(), z.number()]).refine((provinceId) => {
        const provinceToNumber = Number(provinceId);

        return typeof provinceToNumber === 'number' ? provinceToNumber > 0 : false;
    }, 'Thành phố là bắt buộc'),
    district: z.union([z.string(), z.number()]).refine((distrcitId) => {
        const districtToNumber = Number(distrcitId);

        return typeof districtToNumber === 'number' ? districtToNumber > 0 : false;
    }, 'Quận huyện là bắt buộc'),
    ward: z.string().nonempty('Phường xã là bắt buộc'),
    userNote: z.string().max(500, 'Ghi chú không thể dài hơn 500 kí tự').optional(),
});

export type ReceiverData = z.infer<typeof customerInfoSchema>;
