import { configureStore } from "@reduxjs/toolkit";
import pitchReducer from "./slices/pitchSlice";

export const store = configureStore({
  reducer: {
    pitch: pitchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
