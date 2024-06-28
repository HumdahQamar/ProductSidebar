import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './slices';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(middlewares),
});

sagaMiddleware.run(rootSaga);

export type TReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
