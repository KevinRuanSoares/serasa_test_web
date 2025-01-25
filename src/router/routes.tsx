import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Login = lazy(() => import('../pages/public/Login'));
const Dashboard = lazy(() => import('../pages/auth/Dashboard'));
const RuralProducerCreate = lazy(() => import('../pages/auth/RuralProducer/Create'));
const RuralProducerList = lazy(() => import('../pages/auth/RuralProducer/List'));
const RuralProducerUpdate = lazy(() => import('../pages/auth/RuralProducer/Update'));

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
    {
        path: '/rural-producer-list',
        element: <RuralProducerList />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/rural-producer-create',
        element: <RuralProducerCreate />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/rural-producer-update',
        element: <RuralProducerUpdate />,
        layout: 'default',
        protected: true,
    },

];

export { routes };
