import { Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/home/HomePage';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import LoginForm from '../components/auth/loginForm.tsx';
import RegisterForm from '../components/auth/registerForm.tsx';
import BookIntro from '../pages/BookIntro.tsx';

export const publicRoutes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'product/:id',
                element: <ProductDetail />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'checkout',
                element: <Checkout />,
            },
            {
                path: 'bookintro',
                element: <BookIntro />,
            },
            {
                path: '404',
                element: <div>Không tìm thấy trang</div>,
            },
            {
                path: '*',
                element: <Navigate to='/404' />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginForm />,
    },
    {
        path: '/register',
        element: <RegisterForm />,
    },
];
