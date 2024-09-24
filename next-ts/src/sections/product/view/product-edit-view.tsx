'use client';

import { useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getProducts } from 'src/redux/slices/product';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductEditView() {
  const settings = useSettingsContext();

  const dispatch = useDispatch();

  const params = useParams();

  const { id } = params;

  const currentProduct = useSelector((state) =>
    state.product.products.find((product) => product.id === id)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Product',
            href: paths.dashboard.product.root,
          },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm currentProduct={currentProduct} />
    </Container>
  );
}
