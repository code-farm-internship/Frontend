import { useUserStore } from '@/store/userStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticate = useUserStore((state) => state.isAuthenticate);

    if (!isAuthenticate) {
        return <Navigate to={'/'} />;
    }

    return children;
};

export default ProtectedRoute;
