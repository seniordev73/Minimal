import sum from 'lodash/sum';
// @mui
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// types
import { IProductCheckoutState } from 'src/types/product';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import EmptyContent from 'src/components/empty-content';
//
import CheckoutSummary from './checkout-summary';
import CheckoutCartProductList from './checkout-cart-product-list';

// ----------------------------------------------------------------------

type Props = {
  checkout: IProductCheckoutState;
  onNextStep: VoidFunction;
  onApplyDiscount: (value: number) => void;
  onDeleteCart: (productId: string) => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
};

export default function CheckoutCart({
  checkout,
  onNextStep,
  onDeleteCart,
  onApplyDiscount,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  const { cart, total, discount, subTotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const empty = !cart.length;

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!empty ? (
            <CheckoutCartProductList
              products={cart}
              onDelete={onDeleteCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ) : (
            <EmptyContent
              title="Cart is Empty!"
              description="Look like you have no items in your shopping cart."
              imgUrl="/assets/icons/empty/ic_cart.svg"
              sx={{ pt: 5, pb: 10 }}
            />
          )}
        </Card>

        <Button
          component={RouterLink}
          href={paths.product.root}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid xs={12} md={4}>
        <CheckoutSummary
          enableDiscount
          total={total}
          discount={discount}
          subTotal={subTotal}
          onApplyDiscount={onApplyDiscount}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!cart.length}
          onClick={onNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
