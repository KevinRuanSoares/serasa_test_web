import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { routes } from './routes';
import { IRootState } from '../redux/store';
import { JSX } from 'react';

const ProtectedRoute = ({ element, protectedRoute }: { element: JSX.Element, protectedRoute: boolean }) => {
    const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

    if (!isAuthenticated && protectedRoute) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated && !protectedRoute) {
        return <Navigate to="/dashboard" replace />;
    }

    return element;
};

const finalRoutes = routes.map((route) => {
    const RouteElement = route.element;

    return {
        ...route,
        element: (
            <ProtectedRoute
                element={route.layout === 'blank' ? <div>{RouteElement}</div> : <div>{RouteElement}</div>}
                protectedRoute={route.protected}
            />
        ),
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
