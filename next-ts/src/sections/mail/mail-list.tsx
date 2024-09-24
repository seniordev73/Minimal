// @mui
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// types
import { IMailListState } from 'src/types/mail';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
//
import MailItem from './mail-item';
import { MailItemSkeleton } from './mail-skeleton';

// ----------------------------------------------------------------------

type Props = {
  loading: boolean;
  mails: IMailListState;
  //
  openMail: boolean;
  onCloseMail: VoidFunction;
  onClickMail: (id: string) => void;
  //
  currentLabel: string;
  selectedMail: (id: string) => boolean;
};

export default function MailList({
  loading,
  mails,
  //
  openMail,
  onCloseMail,
  onClickMail,
  //
  currentLabel,
  selectedMail,
}: Props) {
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <>
      <Stack sx={{ p: 2 }}>
        {mdUp ? (
          <TextField
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {currentLabel}
          </Typography>
        )}
      </Stack>

      <Scrollbar sx={{ px: 2 }}>
        {(loading ? [...Array(8)] : mails.allIds).map((mailId, index) =>
          mailId ? (
            <MailItem
              key={mailId}
              mail={mails.byId[mailId]}
              selected={selectedMail(mailId)}
              onClickMail={() => {
                onCloseMail();
                onClickMail(mailId);
              }}
            />
          ) : (
            <MailItemSkeleton key={index} />
          )
        )}
      </Scrollbar>
    </>
  );

  return mdUp ? (
    <Stack
      sx={{
        width: 320,
        flexShrink: 0,
        borderRadius: 1.5,
        bgcolor: 'background.default',
      }}
    >
      {renderContent}
    </Stack>
  ) : (
    <Drawer
      open={openMail}
      onClose={onCloseMail}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: 320,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}
