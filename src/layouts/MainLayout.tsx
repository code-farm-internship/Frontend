import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '@/components/common/Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className='min-h-60 overflow-hidden'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
