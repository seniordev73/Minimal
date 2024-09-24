import { Helmet } from 'react-helmet-async';
// sections
import { OrderDetailsView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function OrderDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Order Details</title>
      </Helmet>

      <OrderDetailsView />
    </>
  );
}
