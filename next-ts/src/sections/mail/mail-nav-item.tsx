// @mui
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// types
import { IMailLabel } from 'src/types/mail';
// components
import Iconify, { IconifyProps } from 'src/components/iconify';

// ----------------------------------------------------------------------

const LABEL_ICONS = {
  all: 'fluent:mail-24-filled',
  inbox: 'solar:inbox-bold',
  trash: 'solar:trash-bin-trash-bold',
  drafts: 'solar:file-text-bold',
  spam: 'solar:danger-bold',
  sent: 'iconamoon:send-fill',
  starred: 'eva:star-fill',
  important: 'material-symbols:label-important-rounded',
  social: 'solar:tag-horizontal-bold-duotone',
  promotions: 'solar:tag-horizontal-bold-duotone',
  forums: 'solar:tag-horizontal-bold-duotone',
};

// ----------------------------------------------------------------------

type Props = {
  active: boolean;
  label: IMailLabel;
  onClickNavItem: VoidFunction;
};

export default function MailNavItem({ active, label, onClickNavItem, ...other }: Props) {
  const { unreadCount, color, name } = label;

  const labelIcon = (LABEL_ICONS as Record<string, IconifyProps>)[label.id];

  return (
    <ListItemButton
      disableRipple
      onClick={onClickNavItem}
      sx={{
        px: 0,
        height: 40,
        color: 'text.secondary',
        ...(active && {
          color: 'text.primary',
        }),
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      {...other}
    >
      <Iconify
        icon={labelIcon}
        width={22}
        sx={{
          mr: 2,
          color,
        }}
      />

      <ListItemText
        primary={name}
        primaryTypographyProps={{
          textTransform: 'capitalize',
          typography: active ? 'subtitle2' : 'body2',
        }}
      />

      {!!unreadCount && <Typography variant="caption">{unreadCount}</Typography>}
    </ListItemButton>
  );
}
