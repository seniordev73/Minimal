import { Draggable } from '@hello-pangea/dnd';
// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { IKanbanTask } from 'src/types/kanban';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
//
import KanbanDetails from './kanban-details';

// ----------------------------------------------------------------------

type Props = {
  index: number;
  task: IKanbanTask;
  onDeleteTask: (id: string) => void;
};

export default function KanbanTaskItem({ task, onDeleteTask, index }: Props) {
  const details = useBoolean();

  const renderPriority = (
    <Iconify
      icon={
        (task.priority === 'low' && 'solar:double-alt-arrow-down-bold-duotone') ||
        (task.priority === 'medium' && 'solar:double-alt-arrow-right-bold-duotone') ||
        'solar:double-alt-arrow-up-bold-duotone'
      }
      sx={{
        position: 'absolute',
        top: 4,
        right: 4,
        ...(task.priority === 'low' && {
          color: 'info.main',
        }),
        ...(task.priority === 'medium' && {
          color: 'warning.main',
        }),
        ...(task.priority === 'hight' && {
          color: 'error.main',
        }),
      }}
    />
  );

  const renderImg = (
    <Box
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Image
        disabledEffect
        alt={task.attachments[0]}
        src={task.attachments[0]}
        ratio="4/3"
        sx={{
          borderRadius: 1.5,
          ...(details.value && {
            opacity: 0.8,
          }),
        }}
      />
    </Box>
  );

  const renderInfo = (
    <Stack direction="row" alignItems="center">
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Iconify width={16} icon="solar:chat-round-dots-bold" sx={{ mr: 0.25 }} />
        <Box component="span" sx={{ mr: 1 }}>
          {task.comments.length}
        </Box>

        <Iconify width={16} icon="eva:attach-2-fill" sx={{ mr: 0.25 }} />
        <Box component="span">{task.attachments.length}</Box>
      </Stack>

      <AvatarGroup
        sx={{
          [`& .${avatarGroupClasses.avatar}`]: {
            width: 24,
            height: 24,
          },
        }}
      >
        {task.assignee.map((user) => (
          <Avatar key={user.id} alt={user.name} src={user.avatarUrl} />
        ))}
      </AvatarGroup>
    </Stack>
  );

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={details.onTrue}
            sx={{
              width: 1,
              borderRadius: 1.5,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z20,
              },
              ...(details.value && {
                boxShadow: (theme) => theme.customShadows.z20,
              }),
            }}
          >
            {!!task.attachments.length && renderImg}

            <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
              {renderPriority}

              <Typography variant="subtitle2">{task.name}</Typography>

              {renderInfo}
            </Stack>
          </Paper>
        )}
      </Draggable>

      <KanbanDetails
        task={task}
        openDetails={details.value}
        onCloseDetails={details.onFalse}
        onDeleteTask={() => onDeleteTask(task.id)}
      />
    </>
  );
}
