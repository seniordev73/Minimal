import { Helmet } from 'react-helmet-async';
// sections
import { InvoiceDetailsView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Invoice Details</title>
      </Helmet>

      <InvoiceDetailsView />
    </>
  );
}
