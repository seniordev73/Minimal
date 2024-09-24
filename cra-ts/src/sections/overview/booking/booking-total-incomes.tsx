import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CardProps } from '@mui/material/Card';
// utils
import { fCurrency, fPercent } from 'src/utils/format-number';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
// theme
import { ColorSchema } from 'src/theme/palette';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  total: number;
  title: string;
  percent: number;
  color?: ColorSchema;
  chart: {
    colors?: string[];
    series: {
      x: number;
      y: number;
    }[];
    options?: ApexOptions;
  };
}

export default function BookingTotalIncomes({
  title,
  total,
  percent,
  color = 'primary',
  chart,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const {
    colors = [theme.palette[color].main, theme.palette[color].dark],
    series,
    options,
  } = chart;

  const chartOptions = useChart({
    colors: [colors[1]],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0] },
          { offset: 100, color: colors[1] },
        ],
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    stroke: {
      width: 4,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      marker: {
        show: false,
      },
      y: {
        formatter: (value: number) => fCurrency(value),
        title: {
          formatter: () => '',
        },
      },
    },
    ...options,
  });

  return (
    <Stack
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.2),
          endColor: alpha(theme.palette[color].main, 0.2),
        }),
        p: 3,
        borderRadius: 2,
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <div>
          <Box sx={{ mb: 1, typography: 'subtitle2' }}>{title}</Box>
          <Box sx={{ typography: 'h3' }}>{fCurrency(total)}</Box>
        </div>

        <div>
          <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="flex-end">
            <Iconify icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />

            <Box sx={{ typography: 'subtitle2' }}>
              {percent > 0 && '+'}
              {fPercent(percent)}
            </Box>
          </Stack>

          <Box sx={{ mt: 0.5, opacity: 0.8, typography: 'body2' }}>than last month </Box>
        </div>
      </Stack>

      <Chart type="line" series={[{ data: series }]} options={chartOptions} height={118} />
    </Stack>
  );
}
