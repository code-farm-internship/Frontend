import { Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/home/HomePage';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

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
                path: '/product/:id',
                element: <ProductDetail />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/checkout',
                element: <Checkout />,
            },
            {
                path: '404',
                element: <div>Not found</div>,
            },
            {
                path: '*',
                element: <Navigate to={'/404'} />,
            },
        ],
    },
];
