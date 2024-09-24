// @mui
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
// utils
import { fToNow } from 'src/utils/format-time';
// types
import { IChatParticipant } from 'src/types/chat';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  participants: IChatParticipant[];
};

export default function ChatHeaderDetail({ participants }: Props) {
  const group = participants.length > 1;

  const singleParticipant = participants[0];

  return (
    <>
      {group ? (
        <AvatarGroup
          max={3}
          sx={{
            [`& .${avatarGroupClasses.avatar}`]: {
              width: 32,
              height: 32,
            },
          }}
        >
          {participants.map((participant) => (
            <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl} />
          ))}
        </AvatarGroup>
      ) : (
        <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
          <Badge
            variant={singleParticipant.status}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar src={singleParticipant.avatarUrl} alt={singleParticipant.name} />
          </Badge>

          <ListItemText
            primary={singleParticipant.name}
            secondary={
              singleParticipant.status === 'offline'
                ? fToNow(singleParticipant.lastActivity)
                : singleParticipant.status
            }
            secondaryTypographyProps={{
              component: 'span',
              ...(singleParticipant.status !== 'offline' && {
                textTransform: 'capitalize',
              }),
            }}
          />
        </Stack>
      )}

      <Stack flexGrow={1} />

      <IconButton>
        <Iconify icon="solar:phone-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="solar:videocamera-record-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </>
  );
}
