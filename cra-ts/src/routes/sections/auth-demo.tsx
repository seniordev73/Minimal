import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import CompactLayout from 'src/layouts/compact';
import AuthModernLayout from 'src/layouts/auth/modern';
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

// CLASSIC
const LoginClassicPage = lazy(() => import('src/pages/auth-demo/classic/login'));
const RegisterClassicPage = lazy(() => import('src/pages/auth-demo/classic/register'));
const ForgotPasswordClassicPage = lazy(() => import('src/pages/auth-demo/classic/forgot-password'));
const VerifyClassicPage = lazy(() => import('src/pages/auth-demo/classic/verify'));
const NewPasswordClassicPage = lazy(() => import('src/pages/auth-demo/classic/new-password'));

// MODERN
const LoginModernPage = lazy(() => import('src/pages/auth-demo/modern/login'));
const RegisterModernPage = lazy(() => import('src/pages/auth-demo/modern/register'));
const ForgotPasswordModernPage = lazy(() => import('src/pages/auth-demo/modern/forgot-password'));
const VerifyModernPage = lazy(() => import('src/pages/auth-demo/modern/verify'));
const NewPasswordModernPage = lazy(() => import('src/pages/auth-demo/modern/new-password'));

// ----------------------------------------------------------------------

const authClassic = {
  path: 'classic',
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <LoginClassicPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <RegisterClassicPage />
        </AuthClassicLayout>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'forgot-password', element: <ForgotPasswordClassicPage /> },
        { path: 'new-password', element: <NewPasswordClassicPage /> },
        { path: 'verify', element: <VerifyClassicPage /> },
      ],
    },
  ],
};

const authModern = {
  path: 'modern',
  children: [
    {
      path: 'login',
      element: (
        <AuthModernLayout>
          <LoginModernPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthModernLayout>
          <RegisterModernPage />
        </AuthModernLayout>
      ),
    },
    {
      element: (
        <AuthModernCompactLayout>
          <Outlet />
        </AuthModernCompactLayout>
      ),
      children: [
        { path: 'forgot-password', element: <ForgotPasswordModernPage /> },
        { path: 'new-password', element: <NewPasswordModernPage /> },
        { path: 'verify', element: <VerifyModernPage /> },
      ],
    },
  ],
};

export const authDemoRoutes = [
  {
    path: 'auth-demo',
    children: [authClassic, authModern],
  },
];
