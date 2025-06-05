import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { submitPitch, updatePitchSubmissionStatus } from "../../services/api";

interface PitchState {
  abstract: string;
  industry: string;
  userId: string | null;
  results: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PitchState = {
  abstract: "",
  industry: "",
  userId: null,
  results: [],
  status: "idle",
  error: null,
};

export const fetchPitchResults = createAsyncThunk(
  "pitch/fetchPitchResults",
  async ({
    abstract,
    industry,
    userId,
    planType,
  }: {
    abstract: string;
    industry: string;
    userId: string;
    planType?: string;
  }) => {
    const response = await submitPitch(abstract, industry, userId, planType);
    return response;
  }
);

export const updatePitchStatus = createAsyncThunk(
  "pitch/updateStatus",
  async ({
    pitchId,
    outletName,
    userId,
  }: {
    pitchId: string;
    outletName: string;
    userId: string;
  }) => {
    return await updatePitchSubmissionStatus(pitchId, outletName, userId);
  }
);

const pitchSlice = createSlice({
  name: "pitch",
  initialState,
  reducers: {
    setPitchData: (
      state,
      action: PayloadAction<{
        abstract: string;
        industry: string;
        userId: string;
      }>
    ) => {
      state.abstract = action.payload.abstract;
      state.industry = action.payload.industry;
      state.userId = action.payload.userId;
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
