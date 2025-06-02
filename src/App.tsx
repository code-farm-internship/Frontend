import { ConfigProvider } from 'antd';
import { useNavigate, useRoutes } from 'react-router-dom';
import RootRoutes from './routes/Routes';
import { useEffect } from 'react';
import { setNavigate } from './utils/navigate';

function App() {
    const router = useRoutes(RootRoutes);
    const navigate = useNavigate();

    useEffect(() => {
        setNavigate(navigate as (to: string) => void);
    }, [navigate]);

    return <ConfigProvider>{router}</ConfigProvider>;
}

export default App;
