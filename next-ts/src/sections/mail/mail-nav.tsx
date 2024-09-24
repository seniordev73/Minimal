// @mui
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
// types
import { IMailLabel } from 'src/types/mail';
//
import MailNavItem from './mail-nav-item';
import { MailNavItemSkeleton } from './mail-skeleton';

// ----------------------------------------------------------------------

type Props = {
  loading: boolean;
  openNav: boolean;
  onCloseNav: VoidFunction;
  //
  labels: IMailLabel[];
  labelParam: string;
  //
  onToggleCompose: VoidFunction;
  onClickNavItem: (id: string) => void;
};

export default function MailNav({
  loading,
  openNav,
  onCloseNav,
  //
  labels,
  labelParam,
  //
  onToggleCompose,
  onClickNavItem,
}: Props) {
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <>
      <Stack
        sx={{
          p: (theme) => ({
            xs: theme.spacing(2.5, 2.5, 2, 2.5),
            md: theme.spacing(2, 1.5),
          }),
        }}
      >
        <Button
          fullWidth
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="solar:pen-bold" />}
          onClick={onToggleCompose}
        >
          Compose
        </Button>
      </Stack>

      <Scrollbar>
        <Stack
          sx={{
            px: { xs: 3.5, md: 2.5 },
          }}
        >
          {(loading ? [...Array(8)] : labels).map((label, index) =>
            label ? (
              <MailNavItem
                key={label.id}
                label={label}
                active={labelParam === label.id}
                onClickNavItem={() => {
                  onCloseNav();
                  onClickNavItem(label.id);
                }}
              />
            ) : (
              <MailNavItemSkeleton key={index} />
            )
          )}
        </Stack>
      </Scrollbar>
    </>
  );

  return mdUp ? (
    <Stack
      sx={{
        width: 200,
        flexShrink: 0,
      }}
    >
      {renderContent}
    </Stack>
  ) : (
    <Drawer
      open={openNav}
      onClose={onCloseNav}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: 260,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}
