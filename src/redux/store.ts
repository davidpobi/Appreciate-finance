import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import notificationsSlice from "./notificationsSlice";
import activitySlice from "./activitySlice";
import querySlice from "./querySlice";
import themeSlice from "./themeSlice";
import alpacaSlice from "./alpacaSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    alpaca: alpacaSlice,
    query: querySlice,
    activity: activitySlice,
    notifications: notificationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
