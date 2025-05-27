import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardDataAPI } from "../../services/api";
import { updatePitchStatusAndNotes as updatePitchStatusAndNotesAPI } from "../../services/api";

interface DashboardState {
  pitchesSent: number;
  matchesFound: number;
  myPitches: any[];
  loading: boolean;
  matches_outlets: any[];
  userId: string | null;
}

const initialState: DashboardState = {
  pitchesSent: 0,
  matchesFound: 0,
  myPitches: [],
  loading: false,
  matches_outlets: [],
  userId: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (userId: string) => {
    if (!userId) {
      throw new Error("User ID is required to fetch dashboard data");
    }
    return await fetchDashboardDataAPI(userId);
  }
);

export const updatePitchStatusAndNotes = createAsyncThunk(
  "dashboard/updatePitchStatusAndNotes",
  async ({
    pitchId,
    status,
    notes,
    userId,
  }: {
    pitchId: string;
    status: string;
    notes: string;
    userId: string;
  }) => {
    return await updatePitchStatusAndNotesAPI(pitchId, status, notes, userId);
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setUserId: (state, action: { payload: string }) => {
      state.userId = action.payload;
    },
  },
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

export const { setUserId } = dashboardSlice.actions;
export default dashboardSlice.reducer;
