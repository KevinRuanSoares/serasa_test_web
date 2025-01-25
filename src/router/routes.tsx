import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Login = lazy(() => import('../pages/public/Login'));
const Dashboard = lazy(() => import('../pages/auth/Dashboard'));

const routes = [
    // Public routes
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
        protected: false,
    },
    // Auth routes
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        layout: 'default',
        protected: true,
    },
];

export { routes };
