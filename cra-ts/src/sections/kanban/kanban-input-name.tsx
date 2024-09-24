// @mui
import InputBase, { InputBaseProps, inputBaseClasses } from '@mui/material/InputBase';

// ----------------------------------------------------------------------

export default function KanbanInputName({ sx, ...other }: InputBaseProps) {
  return (
    <InputBase
      sx={{
        [`&.${inputBaseClasses.root}`]: {
          py: 0.75,
          borderRadius: 1,
          typography: 'h6',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'transparent',
          transition: (theme) => theme.transitions.create(['padding-left', 'border-color']),
          [`&.${inputBaseClasses.focused}`]: {
            pl: 1.5,
            borderColor: 'text.primary',
          },
        },
        [`& .${inputBaseClasses.input}`]: {
          typography: 'h6',
        },
        ...sx,
      }}
      {...other}
    />
  );
}
