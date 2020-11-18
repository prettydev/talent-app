import { combineReducers } from "@reduxjs/toolkit";
import musicPlayerReducer from "./musicPlayerReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
  musicPlayer: musicPlayerReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
