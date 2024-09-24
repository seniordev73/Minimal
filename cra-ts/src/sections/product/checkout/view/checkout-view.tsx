import { useEffect, useCallback } from 'react';
// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// redux
import { useDispatch } from 'src/redux/store';
import { getCart } from 'src/redux/slices/product';
// _mock
import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';
// types
import { ICheckoutCartItem } from 'src/types/product';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { useProduct } from '../../hooks';
import CheckoutCart from '../checkout-cart';
import CheckoutSteps from '../checkout-steps';
import CheckoutPayment from '../checkout-payment';
import CheckoutOrderComplete from '../checkout-order-complete';
import CheckoutBillingAddress from '../checkout-billing-address';

// ----------------------------------------------------------------------

function useInitial(cart: ICheckoutCartItem[]) {
  const dispatch = useDispatch();

  const getCartCallback = useCallback(() => {
    if (cart.length) {
      dispatch(getCart(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    getCartCallback();
  }, [getCartCallback]);

  return null;
}

export default function CheckoutView() {
  const settings = useSettingsContext();

  const {
    checkout,
    completed,
    onResetAll,
    onGotoStep,
    onNextStep,
    onBackStep,
    onDeleteCart,
    onResetBilling,
    onCreateBilling,
    onApplyDiscount,
    onApplyShipping,
    onIncreaseQuantity,
    onDecreaseQuantity,
  } = useProduct();

  const { cart, billing, activeStep } = checkout;

  useInitial(cart);

  useEffect(() => {
    if (activeStep === 1) {
      onResetBilling();
    }
  }, [activeStep, onResetBilling]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Checkout
      </Typography>

      <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
        <Grid xs={12} md={8}>
          <CheckoutSteps activeStep={activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
        </Grid>
      </Grid>

      {completed ? (
        <CheckoutOrderComplete open={completed} onReset={onResetAll} onDownloadPDF={() => {}} />
      ) : (
        <>
          {activeStep === 0 && (
            <CheckoutCart
              checkout={checkout}
              onNextStep={onNextStep}
              onDeleteCart={onDeleteCart}
              onApplyDiscount={onApplyDiscount}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          )}

          {activeStep === 1 && (
            <CheckoutBillingAddress
              checkout={checkout}
              onBackStep={onBackStep}
              onCreateBilling={onCreateBilling}
            />
          )}

          {activeStep === 2 && billing && (
            <CheckoutPayment
              checkout={checkout}
              onNextStep={onNextStep}
              onBackStep={onBackStep}
              onGotoStep={onGotoStep}
              onApplyShipping={onApplyShipping}
              onReset={onResetAll}
            />
          )}
        </>
      )}
    </Container>
  );
}
