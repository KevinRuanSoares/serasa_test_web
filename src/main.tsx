import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Mantine
import { MantineProvider } from '@mantine/core';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import './styles/Global.css';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider>
            <Suspense>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </Suspense>
        </MantineProvider>
    </React.StrictMode>
);

