import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedPitch {
  description: string;
  outlets: string[];
}
interface PitchState {
  results: any[];
  savedPitches: SavedPitch[]; // Added saved outlets
  status: "idle" | "loading" | "failed";
}

const initialState: PitchState = {
  results: [],
  savedPitches: [],
  status: "idle",
};

const savePitchSlice = createSlice({
  name: "pitch",
  initialState,
  reducers: {
    saveOutlets: (
      state,
      action: PayloadAction<{ description: string; outlets: string[] }>
    ) => {
      const existingPitchIndex = state.savedPitches.findIndex(
        (pitch) => pitch.description === action.payload.description
      );

      if (existingPitchIndex >= 0) {
        // Update existing pitch outlets
        const existingOutlets = new Set(
          state.savedPitches[existingPitchIndex].outlets
        );
        const newOutlets = action.payload.outlets.filter(
          (outlet) => !existingOutlets.has(outlet)
        );

        if (newOutlets.length > 0) {
          state.savedPitches[existingPitchIndex].outlets = [
            ...state.savedPitches[existingPitchIndex].outlets,
            ...newOutlets,
          ];
        }
      } else {
        // Add new pitch
        state.savedPitches.push({
          description: action.payload.description,
          outlets: action.payload.outlets,
        });
      }
    },
  },
});

export const { saveOutlets } = savePitchSlice.actions;
export default savePitchSlice.reducer;
