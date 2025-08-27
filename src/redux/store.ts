import { configureStore } from "@reduxjs/toolkit";
import pitchReducer from "./slices/pitchSlice";
import dashboardReducer from "./slices/dashboardSlice";
import saveOutletsReducer from "./slices/savePitchSlice";
import outletsReducer from "./slices/outletsSlice";

export const store = configureStore({
  reducer: {
    pitch: pitchReducer,
    dashboard: dashboardReducer,
    savedOutlets: saveOutletsReducer,
    allOutlets: outletsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Explicitly type the state structure
declare module '@reduxjs/toolkit' {
  interface RootState {
    pitch: ReturnType<typeof pitchReducer>;
    dashboard: ReturnType<typeof dashboardReducer>;
    savedOutlets: ReturnType<typeof saveOutletsReducer>;
    allOutlets: ReturnType<typeof outletsReducer>;
  }
}
