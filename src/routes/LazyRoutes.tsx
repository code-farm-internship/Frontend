import React, { lazy } from 'react';

export const ProductDetail = lazy(() => import('@/pages/ProductDetail/ProductDetail'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>...loading</div>}> {children} </React.Suspense>;
};
