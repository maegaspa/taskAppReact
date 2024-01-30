import React from 'react';
import App from './App';
import { AppProvider } from './context';
import Cookies from 'js-cookie';

import { createRoot } from 'react-dom/client';

const initialToken = Cookies.get('token');

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);
