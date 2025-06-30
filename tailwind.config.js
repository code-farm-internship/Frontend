/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            width: {
                standard: '1200px',
            },
            maxWidth: {
                standard: '1200px',
                library: '31.25rem',
            },
            height: {
                library: '31.25rem',
            },
            maxHeight: {
                library: '31.25rem',
            },
            colors: {
                primary: '#EF4444',
                secondary: '#001529',
                promotion: '#ffefd6',
                couponGray: '#f3f4f6',
                freeship: '#e2fada',
            },
            backgroundImage: {
                discountTicket: "url('./assets/images/discount_image_final.webp')",
                freeshipTicket: "url('./assets/images/freeship_image_final.webp')",
            },
            backgroundRepeat: {
                round: 'round',
            },
        },
    },
    plugins: [],
};
