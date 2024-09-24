import { Theme } from '@mui/material/styles';
import { loadingButtonClasses, LoadingButtonProps } from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export default function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LoadingButtonProps }) => ({
          ...(ownerState.variant === 'soft' && {
            [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
              left: 10,
            },
            [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
              right: 14,
            },
            ...(ownerState.size === 'small' && {
              [`& .${loadingButtonClasses.loadingIndicatorStart}`]: {
                left: 10,
              },
              [`& .${loadingButtonClasses.loadingIndicatorEnd}`]: {
                right: 10,
              },
            }),
          }),
        }),
      },
    },
  };
}
