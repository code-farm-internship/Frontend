import MainLayout from '@/layouts/MainLayout';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import HomePage from '@/pages/home/HomePage';
import { Navigate } from 'react-router-dom';
import { LoginPage, ProductDetail, RegisterPage, Suspense, VerifyEmailPage } from './LazyRoutes';
import ProtectedRoute from '@/utils/ProtectedRoute';

export const publicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: 'product/:id',
                element: (
                    <Suspense>
                        <ProductDetail />
                    </Suspense>
                ),
            },
            {
                path: 'cart',
                element: (
                    <Suspense>
                        <Cart />
                    </Suspense>
                ),
            },
            {
                path: 'checkout',
                element: (
                    <Suspense>
                        <Checkout />
                    </Suspense>
                ),
            },
            {
                path: 'auth/login',
                element: (
                    <ProtectedRoute>
                        <Suspense>
                            <LoginPage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'auth/register',
                element: (
                    <ProtectedRoute>
                        <Suspense>
                            <RegisterPage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'auth/verify-email',
                element: <VerifyEmailPage />,
            },
        ],
    },

    {
        path: '404',
        element: <div>Not found</div>,
    },
    {
        path: '*',
        element: <Navigate to={'/404'} replace={false} />,
    },
];
