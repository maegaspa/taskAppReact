import React from 'react';
import App from './App';
import { AppProvider } from './context';

import { createRoot } from 'react-dom/client';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
        <AppProvider>
            <App />
        </AppProvider>
);
