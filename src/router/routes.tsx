import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Login = lazy(() => import('../pages/public/Login'));
const Dashboard = lazy(() => import('../pages/auth/Dashboard'));
const RuralProducerCreate = lazy(() => import('../pages/auth/RuralProducer/Create'));
const RuralProducerList = lazy(() => import('../pages/auth/RuralProducer/List'));
const RuralProducerUpdate = lazy(() => import('../pages/auth/RuralProducer/Update'));
const FarmCreate = lazy(() => import('../pages/auth/Farm/Create'));
const FarmList = lazy(() => import('../pages/auth/Farm/List'));
const FarmUpdate = lazy(() => import('../pages/auth/Farm/Update'));
const CropsCreate = lazy(() => import('../pages/auth/Crops/Create'));
const CropsList = lazy(() => import('../pages/auth/Crops/List'));
const CropsUpdate = lazy(() => import('../pages/auth/Crops/Update'));
const HarvestsCreate = lazy(() => import('../pages/auth/Harvests/Create'));
const HarvestsList = lazy(() => import('../pages/auth/Harvests/List'));
const HarvestsUpdate = lazy(() => import('../pages/auth/Harvests/Update'));
const PlantedCropsCreate = lazy(() => import('../pages/auth/PlantedCrops/Create'));
const PlantedCropsList = lazy(() => import('../pages/auth/PlantedCrops/List'));
const PlantedCropsUpdate = lazy(() => import('../pages/auth/PlantedCrops/Update'));

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
    {
        path: '/farm-list',
        element: <FarmList />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/farm-create',
        element: <FarmCreate />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/farm-update',
        element: <FarmUpdate />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/crop-list',
        element: <CropsList />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/crop-create',
        element: <CropsCreate />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/crop-update',
        element: <CropsUpdate />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/harvest-list',
        element: <HarvestsList />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/harvest-create',
        element: <HarvestsCreate />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/harvest-update',
        element: <HarvestsUpdate />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/planted-crop-list',
        element: <PlantedCropsList />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/planted-crop-create',
        element: <PlantedCropsCreate />,
        layout: 'default',
        protected: true,
    },
    {
        path: '/planted-crop-update',
        element: <PlantedCropsUpdate />,
        layout: 'default',
        protected: true,
    }
];

export { routes };
