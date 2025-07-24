import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveSelectedOutletsAPI } from "../../services/api";
import { fetchSavedOutletsAPI } from "../../services/api";
import { deleteSavedPitch } from "../../services/api";

interface SavedPitch {
  description: string;
  outlets: string[];
  selected_date: string;
}
interface PitchState {
  description: string;
  outlets: string[];
  selected_date: string;
  results: SavedPitch[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PitchState = {
  description: "",
  outlets: [],
  selected_date: "",
  results: [],
  status: "idle",
  error: null,
};

export const saveSelectedOutlets = createAsyncThunk(
  "pitch/saveSelectedOutlets",
  async ({
    description,
    outlets,
    userId,
  }: {
    description: string;
    outlets: string[];
    userId: string;
  }) => {
    const response = await saveSelectedOutletsAPI(description, outlets, userId);
    return response.data;
  }
);

export const fetchSavedOutlets = createAsyncThunk(
  "savedOutlets/fetchSavedOutlets",
  async (userId: string) => {
    return await fetchSavedOutletsAPI(userId);
  }
);

export const deleteSavedPitchAction = createAsyncThunk(
  "savedOutlets/deleteSavedPitch",
  async ({
    description,
    selected_date,
    userId,
  }: {
    description: string;
    selected_date: string;
    userId: string;
  }) => {
    const response = await deleteSavedPitch(description, selected_date, userId);
    return response;
  }
);

const savePitchSlice = createSlice({
  name: "saveOutlets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveSelectedOutlets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveSelectedOutlets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(saveSelectedOutlets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(fetchSavedOutlets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSavedOutlets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchSavedOutlets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(deleteSavedPitchAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSavedPitchAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(deleteSavedPitchAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default savePitchSlice.reducer;
