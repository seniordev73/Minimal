// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: {
    value: string;
    label: string;
    total: number;
    icon: string;
  }[];
}

export default function AnalyticsTrafficBySite({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
        {list.map((site) => (
          <Paper key={site.label} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
            <Iconify
              icon={site.icon}
              color={
                (site.value === 'facebook' && '#1877F2') ||
                (site.value === 'google' && '#DF3E30') ||
                (site.value === 'linkedin' && '#006097') ||
                (site.value === 'twitter' && '#1C9CEA') ||
                ''
              }
              width={32}
            />

            <Typography variant="h6" sx={{ mt: 0.5 }}>
              {fShortenNumber(site.total)}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {site.label}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Card>
  );
}
