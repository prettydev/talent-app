import SInfo from "react-native-sensitive-info";
import { startLogin, startMainApp } from "../Nav";
import { iconsLoaded } from "./themes/icons";
import Auth0, { UserInfo } from "react-native-auth0";
import RNRestart from "react-native-restart";
import store from "../redux/store";
import { cache } from "../graphql";
import { persistCache } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-community/async-storage";

import {
  setUserId,
  setFavouriteSongs,
} from "../redux/reducers/userReducer/actions";
import SplashScreen from "react-native-splash-screen";
import FavouritesService from "../services/FavouritesService";

const auth0 = new Auth0({
  domain: "talent-dev.eu.auth0.com",
  clientId: "VJUfAtPT6jbT6Ny5coJZrx1NUfqnCx4z",
});

function initialScreenLoader() {
  try {
    SInfo.getItem("ACCESS_TOKEN", {}).then((accessToken) => {
      if (accessToken) {
        auth0.auth
          .userInfo({ token: accessToken })
          .then((userInfo: UserInfo) => {
            store.dispatch(setUserId(userInfo.sub.split("|")[1]));
            FavouritesService.fetchFavouriteSongs().then((songs) => {
              store.dispatch(setFavouriteSongs(songs));
              startMainApp(userInfo);
            });
          })

          .catch(() => {
            SInfo.getItem("REFRESH_TOKEN", {}).then((refreshToken) => {
              auth0.auth
                .refreshToken({
                  refreshToken,
                })
                .then((newAccessToken) => {
                  SInfo.setItem("ACCESS_TOKEN", newAccessToken.accessToken, {});
                  RNRestart.Restart();
                })
                .catch(() => {
                  startLogin();
                });
            });
          });
      } else {
        startLogin();
      }
    });
  } catch (error) {
    console.warn("Error: ", error);
  }
}

export default async function appInitialized() {
  await persistCache({
    cache,
    storage: AsyncStorage,
  });

  await iconsLoaded();
  SplashScreen.hide();

  initialScreenLoader();
}
