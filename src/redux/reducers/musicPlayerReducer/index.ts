import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

const initialState = {
  currentSong: null,
  songsQueue: [],
  isPlaying: false,
};

const musicPlayerReducer = createReducer(initialState, {
  [actions.setCurrentSong.type]: (state, action) => ({
    ...state,
    currentSong: action.payload,
    songsQueue: state.songsQueue.concat(action.payload),
  }),
  [actions.play.type]: (state) => ({
    ...state,
    isPlaying: true,
  }),
  [actions.pause.type]: (state) => ({
    ...state,
    isPlaying: false,
  }),
  [actions.setSongsQueue.type]: (state, action) => ({
    ...state,
    songsQueue: action.payload,
  }),
});

export default musicPlayerReducer;
