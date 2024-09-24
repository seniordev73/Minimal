import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// types
import { IChatConversation } from 'src/types/chat';
//
import { useGetNavItem } from './hooks';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  collapse: boolean;
  onClickConversation: VoidFunction;
  conversation: IChatConversation;
};

export default function ChatNavItem({
  selected,
  collapse,
  conversation,
  onClickConversation,
}: Props) {
  const { user } = useMockedUser();

  const {
    group,
    unreadCount,
    displayName,
    displayText,
    participants,
    lastActivity,
    hasOnlineInGroup,
  } = useGetNavItem({ conversation, currentUserId: user.id });

  const singleParticipant = participants[0];

  const { name, avatarUrl, status } = singleParticipant;

  const renderGroup = (
    <Badge
      variant={hasOnlineInGroup ? 'online' : 'invisible'}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
        {participants.slice(0, 2).map((participant) => (
          <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl} />
        ))}
      </AvatarGroup>
    </Badge>
  );

  const renderSingle = (
    <Badge key={status} variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
    </Badge>
  );

  return (
    <ListItemButton
      disableGutters
      onClick={onClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Badge color="error" overlap="circular" badgeContent={collapse ? unreadCount : 0}>
        {group ? renderGroup : renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={displayName}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={displayText}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              variant: unreadCount ? 'subtitle2' : 'body2',
              color: unreadCount ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false,
              })}
            </Typography>

            {!!unreadCount && (
              <Box sx={{ width: 8, height: 8, bgcolor: 'info.main', borderRadius: '50%' }} />
            )}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}
