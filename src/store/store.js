import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";

export const store = configureStore({
  reducer: {
    configs: configReducer,
  },
});