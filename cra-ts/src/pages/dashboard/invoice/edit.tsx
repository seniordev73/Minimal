import { Helmet } from 'react-helmet-async';
// sections
import { InvoiceEditView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Invoice Edit</title>
      </Helmet>

      <InvoiceEditView />
    </>
  );
}
