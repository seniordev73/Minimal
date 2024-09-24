import omit from 'lodash/omit';
import keyBy from 'lodash/keyBy';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';
// types
import { IKanbanState, IKanbanColumn } from 'src/types/kanban';

// ----------------------------------------------------------------------

const initialState: IKanbanState = {
  board: {
    tasks: {},
    columns: {},
    ordered: [],
  },
  boardStatus: {
    loading: false,
    empty: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    // GET BOARD
    getBoardStart(state) {
      state.boardStatus.loading = true;
      state.boardStatus.empty = false;
      state.boardStatus.error = null;
    },
    getBoardFailure(state, action) {
      state.boardStatus.loading = false;
      state.boardStatus.empty = false;
      state.boardStatus.error = action.payload;
    },
    getBoardSuccess(state, action) {
      const board = action.payload;
      const tasks = keyBy(board.tasks, 'id');
      const columns = keyBy(board.columns, 'id');

      state.boardStatus.loading = false;
      state.boardStatus.empty = !board.ordered.length;
      state.boardStatus.error = null;

      state.board = {
        tasks,
        columns,
        ordered: board.ordered,
      };
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const column = action.payload;

      state.board.columns = {
        ...state.board.columns,
        [column.id]: column,
      };

      state.board.ordered.push(column.id);
    },

    setColumns(state, action) {
      state.board.columns = action.payload;
    },

    setOrdered(state, action) {
      state.board.ordered = action.payload;
    },

    addTask(state, action) {
      const { task, columnId } = action.payload;

      state.board.tasks[task.id] = task;
      state.board.columns[columnId].taskIds.push(task.id);
    },

    deleteTask(state, action) {
      const { taskId, columnId } = action.payload;

      state.board.columns[columnId].taskIds = state.board.columns[columnId].taskIds.filter(
        (id) => id !== taskId
      );

      state.board.tasks = omit(state.board.tasks, [taskId]);
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;

      state.board.columns[column.id] = column;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const columnId = action.payload;
      const deletedColumn = state.board.columns[columnId];

      state.board.columns = omit(state.board.columns, [columnId]);
      state.board.tasks = omit(state.board.tasks, [...deletedColumn.taskIds]);
      state.board.ordered = state.board.ordered.filter((id) => id !== columnId);
    },
  },
});

// Reducer
export default slice.reducer;

export const { setOrdered, setColumns, addTask, deleteTask } = slice.actions;

// ----------------------------------------------------------------------

export function getBoard() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.getBoardStart());
    try {
      const response = await axios.get(API_ENDPOINTS.kanban);
      dispatch(slice.actions.getBoardSuccess(response.data.board));
    } catch (error) {
      dispatch(slice.actions.getBoardFailure(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createColumn(newData: { name: string }) {
  return async (dispatch: Dispatch) => {
    try {
      const data = newData;
      const response = await axios.post(API_ENDPOINTS.kanban, data, {
        params: {
          endpoint: 'create',
        },
      });
      dispatch(slice.actions.createColumnSuccess(response.data.column));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn(columnId: string, newData: IKanbanColumn) {
  return async (dispatch: Dispatch) => {
    try {
      const data = {
        columnId,
        newData,
      };
      const response = await axios.post(API_ENDPOINTS.kanban, data, {
        params: {
          endpoint: 'update',
        },
      });
      dispatch(slice.actions.updateColumnSuccess(response.data.column));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn(columnId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = {
        columnId,
      };
      const response = await axios.post(API_ENDPOINTS.kanban, data, {
        params: {
          endpoint: 'delete',
        },
      });
      dispatch(slice.actions.deleteColumnSuccess(response.data.columnId));
    } catch (error) {
      console.error(error);
    }
  };
}
