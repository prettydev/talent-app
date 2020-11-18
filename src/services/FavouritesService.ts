import Toast from "react-native-simple-toast";
import store from "../redux/store";
import { setFavouriteSongs } from "../redux/reducers/userReducer/actions";
import {
  Song,
  UpdateUserFavouritesDocument,
  GetFavouritesDocument,
} from "../generated/types-and-hooks";
import { client } from "../graphql";

const fetchFavouriteSongs = async (): Promise<Song[]> => {
  const userId = store.getState().user.userId;
  const { data } = await client.query({
    query: GetFavouritesDocument,
    variables: { id: userId },
    fetchPolicy: "network-only",
  });

  return data.user.favourites.songs;
};

const updateUserFavouriteSongs = async (newFavoriteSongIds: string[]) => {
  const userId = store.getState().user.userId;
  await client.mutate({
    mutation: UpdateUserFavouritesDocument,
    variables: {
      input: {
        favourites: {
          songs: newFavoriteSongIds,
        },
      },
      id: userId,
    },
  });
};

const addSongToFavourites = async (song: Song) => {
  const userFavouriteSongs = await fetchFavouriteSongs();
  const userFavouriteSongIds = userFavouriteSongs.map(
    (favouriteSong) => favouriteSong.id
  );

  const isSongAlreadyInFavourites =
    userFavouriteSongIds.find((songId) => song.id === songId) !== undefined;
  if (!isSongAlreadyInFavourites) {
    const newFavouriteSongIds = userFavouriteSongIds.concat(song.id);
    await updateUserFavouriteSongs(newFavouriteSongIds);
  }

  const updatedFavouriteSongs = await fetchFavouriteSongs();

  store.dispatch(setFavouriteSongs(updatedFavouriteSongs));

  Toast.show("Song added to favourites");
};

const removeSongFromFavourites = async (song: Song) => {
  const userFavouriteSongs = await fetchFavouriteSongs();
  const userFavouriteSongIds = userFavouriteSongs.map(
    (favouriteSong) => favouriteSong.id
  );

  const newFavouriteSongIds = userFavouriteSongIds.filter(
    (songId) => songId !== song.id
  );
  await updateUserFavouriteSongs(newFavouriteSongIds);

  const updatedFavouriteSongs = await fetchFavouriteSongs();

  store.dispatch(setFavouriteSongs(updatedFavouriteSongs));

  Toast.show("Song removed from favourites");
};

export default {
  addSongToFavourites,
  removeSongFromFavourites,
  fetchFavouriteSongs,
};
