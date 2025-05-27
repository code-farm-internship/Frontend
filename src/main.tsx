import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Providers from './contexts/index.tsx';
import '@/styles/antdInput.css';

createRoot(document.getElementById('root')!).render(
    <Providers>
        <App />
    </Providers>,
);
