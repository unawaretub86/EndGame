import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Project from './pages/Project';
import Enrollments from './pages/enrollments';
import User from './pages/User';
import Advance from './pages/Advance';
import ProfileUpdate from './pages/ProfileUpdate';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'project', element: <Project /> },
        { path: 'enrollments', element: <Enrollments /> },
        { path: 'profile', element: <ProfileUpdate /> },
        { path: 'advance', element: <Advance /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        // { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> }
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    }
    // { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
