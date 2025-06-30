import Loader from '@/components/common/Loader';
import React, { lazy } from 'react';

export const ProductDetail = lazy(() => import('@/pages/ProductDetail/ProductDetail'));
export const RegisterPage = lazy(() => import('@/pages/Auth/RegisterPage'));
export const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
export const VerifyEmailPage = lazy(() => import('@/pages/Auth/VerifyEmail'));
export const CartDetailPage = lazy(() => import('@/pages/Cart/Cart'));
export const HomePage = lazy(() => import('@/pages/home/HomePage'));
export const CheckoutPage = lazy(() => import('@/pages/Checkout/Checkout'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loader />}> {children} </React.Suspense>;
};
