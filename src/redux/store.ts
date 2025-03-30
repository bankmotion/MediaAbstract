import { configureStore } from "@reduxjs/toolkit";
import pitchReducer from "./slices/pitchSlice";
import dashboardReducer from "./slices/dashboardSlice";
import saveOutletsReducer from "./slices/savePitchSlice";
export const store = configureStore({
  reducer: {
    pitch: pitchReducer,
    dashboard: dashboardReducer,
    savedOutlets: saveOutletsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
