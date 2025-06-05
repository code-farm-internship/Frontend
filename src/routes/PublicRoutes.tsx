import ProtectedRoute from '@/components/common/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import NotFound from '@/pages/NotFound/NotFound';
import { Navigate } from 'react-router-dom';
import {
    CartDetailPage,
    CheckoutPage,
    HomePage,
    LoginPage,
    ProductDetail,
    RegisterPage,
    Suspense,
    VerifyEmailPage,
} from './LazyRoutes';
import OrderSuccessPage from '@/pages/Checkout/OrderSuccessPage/OrderSuccessPage';
import { PUBLIC_ROUTES } from '@/constants/routes';

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
