import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { Platform, PixelRatio } from "react-native";

const navIconSize =
  __DEV__ === false && Platform.OS === "android"
    ? PixelRatio.getPixelSizeForLayoutSize(25)
    : 25;

const replaceSuffixPattern = /--(active|big|small|very-big)/g;

const icons = {
  home: [navIconSize, AntDesignIcon],
  "location-pin": [navIconSize, SimpleLineIcon],
  staro: [navIconSize, AntDesignIcon],
  "user-o": [navIconSize, FontAwesomeIcon],
};

const iconsMap = {};

const iconsLoaded = () =>
  new Promise((resolve) => {
    new Promise.all(
      Object.keys(icons).map((iconName) => {
        const Provider = icons[iconName][1];
        return Provider.getImageSource(
          iconName.replace(replaceSuffixPattern, ""),
          icons[iconName][0]
        );
      })
    ).then((sources) => {
      Object.keys(icons).forEach(
        (iconName, i) => (iconsMap[iconName] = sources[i])
      );

      resolve(true);
    });
  });

export { iconsMap, iconsLoaded };
