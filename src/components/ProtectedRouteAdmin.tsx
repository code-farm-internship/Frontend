import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const ProtectedRouteAdmin = ({ children }: Props) => {
    // Đơn giản: ai cũng vào được admin (bỏ kiểm tra đăng nhập)
    // Nếu muốn kiểm tra quyền, bỏ comment các dòng bên dưới

    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // const isLoggedIn = !!user?.token;
    // const isAdmin = user?.role === 'admin' || user?.role === 'manager';
    // if (!isLoggedIn) return <Navigate to="/login" replace />;
    // if (!isAdmin) return <Navigate to="/unauthorized" replace />;

    return <>{children}</>;
};

export default ProtectedRouteAdmin;
