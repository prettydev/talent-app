if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

import { init } from "./src/Nav";
import TrackPlayer from "react-native-track-player";
init();
TrackPlayer.registerPlaybackService(() => require("./service"));
