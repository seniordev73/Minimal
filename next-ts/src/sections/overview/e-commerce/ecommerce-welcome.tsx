// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CardProps } from '@mui/material/Card';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  description?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EcommerceWelcome({ title, description, action, img, ...other }: Props) {
  const theme = useTheme();

  return (
    <Stack
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette.primary.light, 0.2),
          endColor: alpha(theme.palette.primary.main, 0.2),
        }),
        height: { md: 1 },
        borderRadius: 2,
        position: 'relative',
        color: 'primary.darker',
        backgroundColor: 'common.white',
      }}
      {...other}
    >
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          p: {
            xs: theme.spacing(5, 3, 0, 3),
            md: theme.spacing(5),
          },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography paragraph variant="h4" sx={{ whiteSpace: 'pre-line' }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            maxWidth: 360,
            mb: { xs: 3, xl: 5 },
          }}
        >
          {description}
        </Typography>

        {action && action}
      </Stack>

      {img && (
        <Stack
          component="span"
          justifyContent="center"
          sx={{
            p: { xs: 5, md: 3 },
            maxWidth: 360,
            mx: 'auto',
          }}
        >
          {img}
        </Stack>
      )}
    </Stack>
  );
}
