import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";

export const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    user: userSlice.reducer,
  },
});
