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
            textColor: {
                primary: '#EF4444',
            },
            color: {
                primary: '#EF4444',
            },
            borderColor: {
                primary: '#EF4444',
            },
        },
    },
    plugins: [],
};
