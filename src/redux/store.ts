import { configureStore } from "@reduxjs/toolkit";
import pitchReducer from "./slices/pitchSlice";
import dashboardReducer from "./slices/dashboardSlice";
export const store = configureStore({
  reducer: {
    pitch: pitchReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
