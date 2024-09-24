import { Helmet } from 'react-helmet-async';
// sections
import { ProductEditView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit</title>
      </Helmet>

      <ProductEditView />
    </>
  );
}
