import { Helmet } from 'react-helmet-async';
// sections
import { OverviewEcommerceView } from 'src/sections/overview/e-commerce/view';

// ----------------------------------------------------------------------

export default function OverviewEcommercePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <OverviewEcommerceView />
    </>
  );
}
