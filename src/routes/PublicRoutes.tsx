import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/loginForm.tsx';
import RegisterForm from '../components/auth/registerForm.tsx';

export const publicRoutes = [
    {
        path: '/',
        element: <div>Trang chủ</div>,
    },
    {
        path: '/login',
        element: <LoginForm />,
    },
    {
        path: '/register',
        element: <RegisterForm />,
    },
    {
        path: '/404',
        element: <div>Không tìm thấy trang</div>,
    },
    {
        path: '*',
        element: <Navigate to='/404' />,
    },
];
