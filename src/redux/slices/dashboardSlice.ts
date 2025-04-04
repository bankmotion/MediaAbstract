import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardDataAPI } from "../../services/api";
interface DashboardState {
  pitchesSent: number;
  matchesFound: number;
  myPitches: any[];
  loading: boolean;
}

const initialState: DashboardState = {
  pitchesSent: 0,
  matchesFound: 0,
  myPitches: [],
  loading: false,
};

// Fetch dashboard data from backend
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",

  async () => {
    return await fetchDashboardDataAPI();
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.pitchesSent = action.payload.pitches_sent;
        state.matchesFound = action.payload.matches_found;
        state.myPitches = action.payload.my_pitches;

        state.loading = false;

        console.log("Action:", action);
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
