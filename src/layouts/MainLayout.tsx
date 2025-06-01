import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

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
