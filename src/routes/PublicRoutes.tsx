import ProtectedRoute from '@/components/common/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import NotFound from '@/pages/NotFound/NotFound';
import { Suspense } from 'react';
import FeaturedProducts from '@/pages/AllProducts/component/FeaturedProducts';
import { CartDetailPage, CheckoutPage, HomePage, ProductDetail, VerifyEmailPage } from './LazyRoutes';
import NewProducts from '@/pages/AllProducts/component/NewProducts';
import BestSellers from '@/pages/AllProducts/component/BestSellers';
import LoginPage from '@/components/auth/registerForm';
import RegisterPage from '@/pages/Auth/RegisterPage';
import { PUBLIC_ROUTES } from '@/constants/routes';
import OrderSuccessPage from '@/pages/Checkout/OrderSuccessPage/OrderSuccessPage';
import { Navigate } from 'react-router-dom';

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
                path: 'featured',
                element: (
                    <Suspense>
                        <FeaturedProducts />
                    </Suspense>
                ),
            },
            {
                path: 'new',
                element: (
                    <Suspense>
                        <NewProducts />
                    </Suspense>
                ),
            },
            {
                path: 'best seller',
                element: (
                    <Suspense>
                        <BestSellers />
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
                        <CartDetailPage />
                    </Suspense>
                ),
            },
            {
                path: 'checkout',
                element: (
                    <Suspense>
                        <CheckoutPage />
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
                element: (
                    <Suspense>
                        <VerifyEmailPage />
                    </Suspense>
                ),
            },
            {
                path: PUBLIC_ROUTES.ORDER_SUCCESS,
                element: (
                    <Suspense>
                        <OrderSuccessPage />
                    </Suspense>
                ),
            },
        ],
    },

    {
        path: '404',
        element: <NotFound />,
    },
    {
        path: '*',
        element: <Navigate to={'/404'} replace={false} />,
    },
];
