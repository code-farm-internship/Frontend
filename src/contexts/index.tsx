import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './QueryProvider';
import { ToastProvider } from './ToastProvider';
import AutoScrollToTop from './AutoScrollTop';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <AutoScrollToTop>
                <ToastProvider>
                    <QueryProvider>{children}</QueryProvider>
                </ToastProvider>
            </AutoScrollToTop>
        </BrowserRouter>
    );
};

export default Providers;
