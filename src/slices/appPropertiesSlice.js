import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import appPropertiesData from "../data/appProperties.json";

const adapter = createEntityAdapter({
  selectId: (entity) => entity.key,
});

// Thunk
export const fetchProperties = createAsyncThunk(
  "appProperties/fetchProperties",
  async () => {
    return appPropertiesData;
  }
);

const initialState = adapter.getInitialState({
  loading: false,
  error: null,
});

const appPropertiesSlice = createSlice({
  name: "appProperties",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      const { key, status } = action.payload;
      adapter.updateOne(state, { id: key, changes: { status } });
    },

    updateProperty: (state, action) => {
      adapter.upsertOne(state, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        adapter.setAll(state, action.payload);
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateStatus, updateProperty } = appPropertiesSlice.actions;

export const {
  selectById: selectPropertyByKey,
  selectAll: selectAllProperties,
} = adapter.getSelectors((state) => state.appProperties);

export default appPropertiesSlice.reducer;