import { Navigate } from 'react-router-dom';
import HomePage from '@/pages/home/HomePage';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import MainLayout from '@/layouts/MainLayout';
import LoginForm from '@/components/auth/loginForm';
import RegisterForm from '@/components/auth/registerForm';
import { ProductDetail } from './LazyRoutes';

export const publicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
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
                path: '/login',
                element: <LoginForm />,
            },
            {
                path: '/register',
                element: <RegisterForm />,
            },
        ],
    },

    {
        path: '404',
        element: <div>Not found</div>,
    },
    {
        path: '*',
        element: <Navigate to={'/404'} />,
    },
];
