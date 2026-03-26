import { configureStore } from "@reduxjs/toolkit";
import appPropertiesReducer from "../slices/appPropertiesSlice";

const store = configureStore({
  reducer: {
    appProperties: appPropertiesReducer,
  },
});

export default store;