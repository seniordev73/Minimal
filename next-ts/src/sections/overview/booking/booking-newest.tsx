// @mui
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box, { BoxProps } from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fDateTime } from 'src/utils/format-time';
// components
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  avatarUrl: string;
  bookedAt: Date | string | number;
  duration: string;
  guests: string;
  coverUrl: string;
  price: number;
  isHot: boolean;
};

interface Props extends BoxProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function BookingNewest({ title, subheader, list, sx, ...other }: Props) {
  const theme = useTheme();

  const carousel = useCarousel({
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  return (
    <Box sx={{ py: 2, ...sx }} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={<CarouselArrows onNext={carousel.onNext} onPrev={carousel.onPrev} />}
        sx={{
          p: 0,
          mb: 3,
        }}
      />

      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((item) => (
          <BookingItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

// ----------------------------------------------------------------------

type BookingItemProps = {
  item: ItemProps;
};

function BookingItem({ item }: BookingItemProps) {
  const { avatarUrl, name, duration, bookedAt, guests, coverUrl, price, isHot } = item;

  return (
    <Paper
      sx={{
        mr: 3,
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'background.neutral',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          px: 2,
          pb: 1,
          pt: 2.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <ListItemText
            primary={name}
            secondary={fDateTime(bookedAt)}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>

        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          sx={{ color: 'text.secondary', typography: 'caption' }}
        >
          <Stack direction="row" alignItems="center">
            <Iconify icon="solar:calendar-date-bold" width={16} sx={{ mr: 0.5 }} />
            {duration}
          </Stack>

          <Stack direction="row" alignItems="center">
            <Iconify icon="solar:users-group-rounded-bold" width={16} sx={{ mr: 0.5 }} />
            {guests} Guests
          </Stack>
        </Stack>
      </Stack>

      <Label
        variant="filled"
        sx={{
          right: 16,
          zIndex: 9,
          bottom: 16,
          position: 'absolute',
        }}
      >
        {isHot && '🔥'} ${price}
      </Label>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Image alt={coverUrl} src={coverUrl} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>
    </Paper>
  );
}
