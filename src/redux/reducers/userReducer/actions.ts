import { createAction } from "@reduxjs/toolkit";

export const setFavouriteSongs = createAction<any>("SET_USER_FAVOURITE_SONGS");

export const setUserId = createAction<string>("SET_USER_ID");
