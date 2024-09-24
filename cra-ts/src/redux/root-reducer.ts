import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import kanbanReducer from './slices/kanban';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['checkout'],
};

export const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  calendar: calendarReducer,
  product: persistReducer(productPersistConfig, productReducer),
});
