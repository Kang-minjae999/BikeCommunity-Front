import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import notificationReducer from './slices/notification';
import mapReducer from './slices/map';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['checkout', 'search', 'heart', 'usedHeart'],
};

const NotificationPersistConfig = {
  key: 'notification',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['alert', 'alertNumber', 'readAlert'],
};

const MapPersistConfig = {
  key: 'map',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['alert', 'alertNumber', 'readAlert'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  map: persistReducer(MapPersistConfig, mapReducer),
  product: persistReducer(productPersistConfig, productReducer),
  notification: persistReducer(NotificationPersistConfig, notificationReducer),
});

export { rootPersistConfig, rootReducer };
