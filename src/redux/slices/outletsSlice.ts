import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllOutletsAPI } from "../../services/api";

export interface Outlet {
  name: string;
  ai_partnered: string;
  audience: string;
  contact_email: string;
  guidelines: string;
  keywords: string;
  last_updated: string;
  pitch_tips: string;
  prestige: string;
  section_name: string;
  url: string;
  //   created_at: string;
}

interface OutletsState {
  outlets: Outlet[];

  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OutletsState = {
  outlets: [],

  status: "idle",
  error: null,
};

export const fetchAllOutlets = createAsyncThunk(
  "outlets/fetchAllOutlets",
  async () => {
    return await fetchAllOutletsAPI();
  }
);

const outletsSlice = createSlice({
  name: "outlets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOutlets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOutlets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.outlets = action.payload;
      })
      .addCase(fetchAllOutlets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default outletsSlice.reducer;
