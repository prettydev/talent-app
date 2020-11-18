import store from "../redux/store";
import {
  setCurrentSong as setCurrentSongRedux,
  play as playRedux,
  pause as pauseRedux,
  setSongsQueue as setSongsQueueRedux,
} from "../redux/reducers/musicPlayerReducer/actions";
import TrackPlayer, { Track } from "react-native-track-player";
import { Song } from "../generated/types-and-hooks";
import FavouritesService from "./FavouritesService";

const songToTrack = (song: any): Track => ({
  id: song.id,
  title: song.title,
  artist: song.author?.id || "",
  url: song.url,
  artwork: song.img,
});

const dispatch = store.dispatch;

const setCurrentSong = (song: any) => {
  dispatch(setCurrentSongRedux(song));
};

const getInitialTracksQueue = () => {
  return store
    .getState()
    .musicPlayer.songsQueue.map((song) => songToTrack(song));
};

const setup = async () => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
  });
  await TrackPlayer.reset();
  await TrackPlayer.addEventListener(
    TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    playbackTrackChangedListener
  );
  await TrackPlayer.addEventListener(
    TrackPlayer.TrackPlayerEvents.PLAYBACK_STATE,
    playbackStateChangedListener
  );
  await TrackPlayer.add(getInitialTracksQueue());
};

const playSong = async (song: Song) => {
  const track = songToTrack(song);

  const songsQueue = store.getState().musicPlayer.songsQueue;
  const updatedSongsQueue = songsQueue.concat(song);
  store.dispatch(setSongsQueueRedux(updatedSongsQueue));

  await TrackPlayer.add(track);
  await TrackPlayer.skip(track.id);
  await TrackPlayer.play();
};

const play = async () => {
  await TrackPlayer.play();
};

const pause = async () => {
  await TrackPlayer.pause();
};

const switchToNextTrack = async () => {
  await TrackPlayer.skipToNext();
};

const switchToPreviousTrack = async () => {
  await TrackPlayer.skipToPrevious();
};

const addCurrentSongToFavourites = async () => {
  const currentSong = store.getState().musicPlayer.currentSong;

  await FavouritesService.addSongToFavourites(currentSong);
};

const removeCurrentSongFromFavourites = async () => {
  const currentSong = store.getState().musicPlayer.currentSong;

  await FavouritesService.removeSongFromFavourites(currentSong);
};

const playbackTrackChangedListener = async ({ nextTrack: currentTrackId }) => {
  if (currentTrackId === null) return;

  const songsQueue = store.getState().musicPlayer.songsQueue;
  const currentSong = songsQueue.find((song) => song.id === currentTrackId);
  setCurrentSong(currentSong);
};

const playbackStateChangedListener = async ({ state }) => {
  if (state === TrackPlayer.STATE_PLAYING) store.dispatch(playRedux());
  else store.dispatch(pauseRedux());
};

export default {
  setCurrentSong,
  play,
  pause,
  switchToNextTrack,
  switchToPreviousTrack,
  setup,
  playSong,
  addCurrentSongToFavourites,
  removeCurrentSongFromFavourites,
};
