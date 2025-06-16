export const TANSTACK_QUERY_KEYS = {
    product: {
        DETAIL: 'productDetail',
        featured: 'featured',
        new: 'new',
        bestsellers: 'best seller',
    },
    CART: {
        ALL: 'cartAll',
        ADD: 'addToCart',
        UPDATE: 'updateCartItemQuantity',
        REMOVE: 'removeCartItem',
    },
    AUTH: {
        REGISTER: 'register',
        LOGIN: 'login',
        VERIFY_EMAIL: 'verify-email',
        RESEND_VERIFY_EMAIL: 'resend-verify-email',
    },
    SHIPPING: {
        PROVINCE: 'province',
        DISTRICT: 'district',
        WARD: 'ward',
    },
    ORDER: {
        CREATE: 'createOrder',
    },
};
