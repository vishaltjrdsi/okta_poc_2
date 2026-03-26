import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchConfigs } from "../api/configApi";

// Thunk
export const getConfigs = createAsyncThunk(
  "configs/getConfigs",
  async () => {
    const response = await fetchConfigs();
    return response.data;
  }
);

const configSlice = createSlice({
  name: "configs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConfigs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default configSlice.reducer;