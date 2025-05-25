import { ConfigProvider } from 'antd';
import { useRoutes } from 'react-router-dom';
import RootRoutes from './routes/Routes';

function App() {
    const router = useRoutes(RootRoutes);

    return <ConfigProvider>{router}</ConfigProvider>;
}

export default App;
