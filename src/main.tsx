/* eslint-disable react-refresh/only-export-components */
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Dashboard from './pages/Dashboard.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import SignIn from './pages/SignIn.tsx';
import Users from './pages/Users.tsx';
import SignUp from './pages/SignUp.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

interface UnauthenticatedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to='/sign-in' replace />;
};

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  return !currentUser ? <>{children}</> : <Navigate to='/dashboard' replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/dashboard' replace />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/sign-in',
    element: (
      <UnauthenticatedRoute>
        <SignIn />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <UnauthenticatedRoute>
        <SignUp />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <UnauthenticatedRoute>
        <ForgotPassword />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AuthenticatedRoute>
        <Dashboard />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: 'users',
        element: (
          <AuthenticatedRoute>
            <Users />
          </AuthenticatedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CssBaseline />
    <RouterProvider router={router} />
  </AuthProvider>
);
