import { useCallback } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
// @mui
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// types
import { IKanbanColumn, IKanbanTask } from 'src/types/kanban';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
//
import { useKanban } from './hooks';
import KanbanTaskAdd from './kanban-task-add';
import KanbanTaskItem from './kanban-task-item';
import KanbanColumnToolBar from './kanban-column-tool-bar';

// ----------------------------------------------------------------------

type Props = {
  column: IKanbanColumn;
  tasks: Record<string, IKanbanTask>;
  index: number;
};

export default function KanbanColumn({ column, index, tasks }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { onUpdateColumn, onDeleteColumn, onAddTask, onDeleteTask } = useKanban();

  const addTask = useBoolean();

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      onDeleteTask({
        taskId,
        columnId: column.id,
      });
      enqueueSnackbar('Delete success!');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.id, onDeleteTask]
  );

  const handleUpdateColumn = useCallback(
    (newName: string) => {
      try {
        if (newName !== column.name) {
          onUpdateColumn(column.id, {
            ...column,
            name: newName,
          });
          enqueueSnackbar('Update success!');
        }
      } catch (error) {
        console.error(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column, onUpdateColumn]
  );

  const handleDeleteColumn = useCallback(async () => {
    try {
      onDeleteColumn(column.id);
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.id, onDeleteColumn]);

  const handleAddTask = useCallback((task: IKanbanTask) => {
    addTask.onFalse();
    onAddTask({
      task,
      columnId: column.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAddTask = (
    <Stack spacing={2} sx={{ pb: 3 }}>
      {addTask.value && (
        <KanbanTaskAdd
          status={column.name}
          onAddTask={handleAddTask}
          onCloseAddTask={addTask.onFalse}
        />
      )}

      <Button
        fullWidth
        size="large"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" width={18} sx={{ mr: -0.5 }} />}
        onClick={addTask.onToggle}
        sx={{ fontSize: 14 }}
      >
        Add Task
      </Button>
    </Stack>
  );

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            px: 2,
            borderRadius: 2,
            bgcolor: 'background.neutral',
          }}
        >
          <Stack {...provided.dragHandleProps}>
            <KanbanColumnToolBar
              columnName={column.name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            <Droppable droppableId={column.id} type="TASK">
              {(dropProvided) => (
                <Stack
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                  spacing={2}
                  sx={{ width: 280, py: 3 }}
                >
                  {column.taskIds.map((taskId, taskIndex) => (
                    <KanbanTaskItem
                      key={taskId}
                      index={taskIndex}
                      task={tasks[taskId]}
                      onDeleteTask={handleDeleteTask}
                    />
                  ))}
                  {dropProvided.placeholder}
                </Stack>
              )}
            </Droppable>

            {renderAddTask}
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
