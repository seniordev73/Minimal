import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
import SimpleLayout from 'src/layouts/simple';
import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
const Page500 = lazy(() => import('src/pages/500'));
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const FaqsPage = lazy(() => import('src/pages/faqs'));
const AboutPage = lazy(() => import('src/pages/about-us'));
const ContactPage = lazy(() => import('src/pages/contact-us'));
const PricingPage = lazy(() => import('src/pages/pricing'));
const PaymentPage = lazy(() => import('src/pages/payment'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));
// PRODUCT
const ProductListPage = lazy(() => import('src/pages/product/list'));
const ProductDetailsPage = lazy(() => import('src/pages/product/details'));
const ProductCheckoutPage = lazy(() => import('src/pages/product/checkout'));
// BLOG
const PostListPage = lazy(() => import('src/pages/post/list'));
const PostDetailsPage = lazy(() => import('src/pages/post/details'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: 'about-us', element: <AboutPage /> },
      { path: 'contact-us', element: <ContactPage /> },
      { path: 'faqs', element: <FaqsPage /> },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'checkout', element: <ProductCheckoutPage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <PostListPage />, index: true },
          { path: 'list', element: <PostListPage /> },
          { path: ':title', element: <PostDetailsPage /> },
        ],
      },
    ],
  },
  {
    element: (
      <SimpleLayout>
        <Outlet />
      </SimpleLayout>
    ),
    children: [
      { path: 'pricing', element: <PricingPage /> },
      { path: 'payment', element: <PaymentPage /> },
    ],
  },
  {
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [
      { path: 'coming-soon', element: <ComingSoonPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
