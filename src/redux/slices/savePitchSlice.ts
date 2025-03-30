import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PitchState {
  results: any[];
  savedOutlets: string[]; // Added saved outlets
  status: "idle" | "loading" | "failed";
}

const initialState: PitchState = {
  results: [],
  savedOutlets: [],
  status: "idle",
};

const savePitchSlice = createSlice({
  name: "pitch",
  initialState,
  reducers: {
    saveOutlets: (state, action: PayloadAction<string[]>) => {
      state.savedOutlets = action.payload;
    },
  },
});

export const { saveOutlets } = savePitchSlice.actions;
export default savePitchSlice.reducer;
