export const QUERY_KEYS = {
    product: {
        all: ['products'],
        list: ['products', 'list'],
        detail: ['products', 'detail'],
        featured: ['products', 'featured'],
        new: ['products', 'new'],
        bestsellers: ['products', 'best seller'],
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
};
