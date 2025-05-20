import { Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage';

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
