import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import appPropertiesData from "../data/appProperties.json";

const adapter = createEntityAdapter({ selectId: (entity) => entity.key });

const initialState = adapter.setAll(adapter.getInitialState(), appPropertiesData);

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
});

export const { updateStatus, updateProperty } = appPropertiesSlice.actions;

export const {
  selectById: selectPropertyByKey,
  selectAll: selectAllProperties,
} = adapter.getSelectors((state) => state.appProperties);

export default appPropertiesSlice.reducer;