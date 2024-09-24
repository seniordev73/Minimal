import { Helmet } from 'react-helmet-async';
// sections
import { ProductShopDetailsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductShopDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Product: Details</title>
      </Helmet>

      <ProductShopDetailsView />
    </>
  );
}
