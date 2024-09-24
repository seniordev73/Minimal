// @mui
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { BoxProps } from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  index?: number;
};

export function KanbanColumnSkeleton({ index, sx, ...other }: Props) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      sx={{
        p: 2,
        width: 310,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Skeleton sx={{ paddingTop: '75%' }} />
        {[0].includes(Number(index)) && <Skeleton sx={{ paddingTop: '50%' }} />}
        {[0, 1].includes(Number(index)) && <Skeleton sx={{ paddingTop: '25%' }} />}
        {[0, 1, 2].includes(Number(index)) && <Skeleton sx={{ paddingTop: '25%' }} />}
      </Stack>
    </Stack>
  );
}
