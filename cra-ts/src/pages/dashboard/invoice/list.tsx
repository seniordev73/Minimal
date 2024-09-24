import { Helmet } from 'react-helmet-async';
// sections
import { InvoiceListView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Invoice List</title>
      </Helmet>

      <InvoiceListView />
    </>
  );
}
