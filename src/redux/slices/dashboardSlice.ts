import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardDataAPI } from "../../services/api";
import { updatePitchStatusAndNotes as updatePitchStatusAndNotesAPI } from "../../services/api";

interface DashboardState {
  pitchesSent: number;
  matchesFound: number;
  myPitches: any[];
  loading: boolean;
  matches_outlets: any[];
}

const initialState: DashboardState = {
  pitchesSent: 0,
  matchesFound: 0,
  myPitches: [],
  loading: false,
  matches_outlets: [],
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",

  async () => {
    return await fetchDashboardDataAPI();
  }
);

export const updatePitchStatusAndNotes = createAsyncThunk(
  "dashboard/updatePitchStatusAndNotes",
  async ({
    pitchId,
    status,
    notes,
  }: {
    pitchId: string;
    status: string;
    notes: string;
  }) => {
    return await updatePitchStatusAndNotesAPI(pitchId, status, notes);
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
        state.matches_outlets = action.payload.my_pitches.matches_outlets;

        state.loading = false;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePitchStatusAndNotes.fulfilled, (state, action) => {
        const updated = action.meta.arg;
        const idx = state.myPitches.findIndex(
          (p: any) => p.id === updated.pitchId
        );
        if (idx !== -1) {
          state.myPitches[idx].status = updated.status;
          state.myPitches[idx].notes = updated.notes;
        }
      });
  },
});

export default dashboardSlice.reducer;
