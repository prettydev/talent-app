import { createAction } from "@reduxjs/toolkit";
import { Song } from "../../../generated/types-and-hooks";

export const setSongsQueue = createAction<Song[]>("SET_SONGS_QUEUE");

export const setCurrentSong = createAction<string>("SET_CURRENT_SONG");

export const play = createAction("PLAY");

export const pause = createAction("PAUSE");
