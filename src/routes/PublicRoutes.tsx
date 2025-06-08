import ProtectedRoute from '@/components/common/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import BestSellers from '@/pages/AllProducts/component/BestSellers';
import Checkout from '@/pages/Checkout';
import NotFound from '@/pages/NotFound/NotFound';
import { Navigate } from 'react-router-dom';
import {
    CartDetailPage,
    HomePage,
    LoginPage,
    ProductDetail,
    RegisterPage,
    Suspense,
    VerifyEmailPage,
} from './LazyRoutes';

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
            // {
            //     path: 'featured',
            //     element: (
            //         <Suspense>
            //             <FeaturedProducts />
            //         </Suspense>
            //     ),
            // },
            // {
            //     path: 'new',
            //     element: (
            //         <Suspense>
            //             <NewProducts />
            //         </Suspense>
            //     ),
            // },
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
                element: (
                    <Suspense>
                        <VerifyEmailPage />
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
