// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fCurrency } from 'src/utils/format-number';
//
import Scrollbar from 'src/components/scrollbar';
import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  coverUrl: string;
  price: number;
  priceSale: number;
  colors: string[];
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function EcommerceLatestProducts({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, minWidth: 360 }}>
          {list.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ProductItemProps = {
  product: ItemProps;
};

function ProductItem({ product }: ProductItemProps) {
  const { name, coverUrl, price, priceSale } = product;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        variant="rounded"
        alt={name}
        src={coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={<Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{name}</Link>}
        secondary={
          <>
            {!!priceSale && (
              <Box component="span" sx={{ textDecoration: 'line-through', mr: 0.5 }}>
                {fCurrency(priceSale)}
              </Box>
            )}

            <Box component="span" sx={{ color: priceSale ? 'error.main' : 'text.secondary' }}>
              {fCurrency(price)}
            </Box>
          </>
        }
        primaryTypographyProps={{
          noWrap: true,
        }}
        secondaryTypographyProps={{
          mt: 0.5,
        }}
      />

      <ColorPreview limit={3} colors={product.colors} />
    </Stack>
  );
}
