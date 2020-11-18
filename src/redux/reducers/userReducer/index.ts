import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

const initialState = {
  favourites: {
    users: [],
    songs: [],
  },
  userId: "",
};

const userReducer = createReducer(initialState, {
  [actions.setFavouriteSongs.type]: (state, action) => ({
    ...state,
    favourites: {
      ...state.favourites,
      songs: action.payload,
    },
  }),
  [actions.setUserId.type]: (state, action) => ({
    ...state,
    userId: action.payload,
  }),
});

export default userReducer;
