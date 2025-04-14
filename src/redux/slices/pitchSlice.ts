import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { submitPitch, updatePitchSubmissionStatus } from "../../services/api";

interface PitchState {
  abstract: string;
  industry: string;
  results: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PitchState = {
  abstract: "",
  industry: "",
  results: [],
  status: "idle",
  error: null,
};

export const fetchPitchResults = createAsyncThunk(
  "pitch/fetchPitchResults",
  async ({ abstract, industry }: { abstract: string; industry: string }) => {
    const response = await submitPitch(abstract, industry);
    return response;
  }
);

export const updatePitchStatus = createAsyncThunk(
  "pitch/updatePitchStatus",
  async ({ pitchId, outletName }: { pitchId: string; outletName: string }) => {
    const response = await updatePitchSubmissionStatus(pitchId, outletName);
    return response;
  }
);

const pitchSlice = createSlice({
  name: "pitch",
  initialState,
  reducers: {
    setPitchData: (
      state,
      action: PayloadAction<{ abstract: string; industry: string }>
    ) => {
      state.abstract = action.payload.abstract;
      state.industry = action.payload.industry;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPitchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPitchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchPitchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(updatePitchStatus.fulfilled, (state, action) => {
        if (action.payload.success) {
          // Update the local state to reflect the status change
          const outletIndex = state.results.findIndex(
            (result) => result.outlet.name === action.meta.arg.outletName
          );
          if (outletIndex !== -1) {
            state.results[outletIndex].status = "Submitted";
          }
        }
      });
  },
});

export const { setPitchData } = pitchSlice.actions;
export default pitchSlice.reducer;
