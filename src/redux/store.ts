import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './api/userAPI';
import  userReducer  from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


