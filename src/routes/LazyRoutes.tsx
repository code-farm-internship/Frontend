import React, { lazy } from 'react';

export const ProductDetail = lazy(() => import('@/pages/ProductDetail/ProductDetail'));
export const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
export const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
export const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmail'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>...loading</div>}> {children} </React.Suspense>;
};
