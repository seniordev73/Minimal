import { useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// redux
import { useDispatch } from 'src/redux/store';
import { getBoard } from 'src/redux/slices/kanban';
// theme
import { hideScroll } from 'src/theme/css';
//
import { useKanban } from '../hooks';
import KanbanColumn from '../kanban-column';
import KanbanColumnAdd from '../kanban-column-add';
import { KanbanColumnSkeleton } from '../kanban-skeleton';

// ----------------------------------------------------------------------

function useInitial() {
  const dispatch = useDispatch();

  const getBoardCallback = useCallback(() => {
    dispatch(getBoard());
  }, [dispatch]);

  useEffect(() => {
    getBoardCallback();
  }, [getBoardCallback]);

  return null;
}

export default function KanbanView() {
  useInitial();

  const { tasks, columns, ordered, updateOrdered, updateColumns, boardStatus } = useKanban();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;

      if (!destination) return;

      if (destination.droppableId === source.droppableId && destination.index === source.index)
        return;

      if (type === 'COLUMN') {
        const newOrdered = [...ordered];

        newOrdered.splice(source.index, 1);

        newOrdered.splice(destination.index, 0, draggableId);

        updateOrdered(newOrdered);
        return;
      }

      const initialColumn = columns[source.droppableId];

      const finishColumn = columns[destination.droppableId];

      // Update Inside
      if (initialColumn.id === finishColumn.id) {
        console.info('Update Inside!');

        const updatedTaskIds = [...initialColumn.taskIds];

        updatedTaskIds.splice(source.index, 1);

        updatedTaskIds.splice(destination.index, 0, draggableId);

        const updatedColumn = {
          ...initialColumn,
          taskIds: updatedTaskIds,
        };

        updateColumns({
          ...columns,
          [updatedColumn.id]: updatedColumn,
        });
        return;
      }

      console.info('Update Outside!');

      // Initial
      const initialTaskIds = [...initialColumn.taskIds];

      initialTaskIds.splice(source.index, 1);

      const updatedStart = {
        ...initialColumn,
        taskIds: initialTaskIds,
      };

      // Finish
      const finishTaskIds = [...finishColumn.taskIds];

      finishTaskIds.splice(destination.index, 0, draggableId);

      const updatedFinish = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      // End
      updateColumns({
        ...columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      });
    },

    [columns, ordered, updateColumns, updateOrdered]
  );

  const renderSkeleton = (
    <Stack direction="row" alignItems="flex-start" spacing={3}>
      {[...Array(4)].map((_, index) => (
        <KanbanColumnSkeleton key={index} index={index} />
      ))}
    </Stack>
  );

  return (
    <Container maxWidth={false} sx={{ height: 1 }}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Kanban
      </Typography>

      {boardStatus.loading ? (
        renderSkeleton
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" type="COLUMN" direction="horizontal">
            {(provided) => (
              <Stack
                ref={provided.innerRef}
                {...provided.droppableProps}
                spacing={3}
                direction="row"
                alignItems="flex-start"
                sx={{
                  p: 0.25,
                  height: 1,
                  overflowY: 'hidden',
                  ...hideScroll.x,
                }}
              >
                {ordered.map((columnId, index) => (
                  <KanbanColumn
                    index={index}
                    key={columnId}
                    column={columns[columnId]}
                    tasks={tasks}
                  />
                ))}

                {provided.placeholder}
                <KanbanColumnAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Container>
  );
}
