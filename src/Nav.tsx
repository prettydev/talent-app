import { registerScreens } from "./screens";
import { Navigation } from "react-native-navigation";
import appInitialized from "./utils/appInitialized";
import { iconsMap } from "./utils/themes/icons";
import { UserInfo } from "react-native-auth0";
import MusicPlayer from "./services/MusicPlayer";

registerScreens();

export function startLogin() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "SignIn",
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: {
                  style: "dark",
                },
              },
            },
          },
        ],
      },
    },
  });
}

// TODO: No need to pass the parameter
export function startMainApp(userInfo: UserInfo) {
  MusicPlayer.setup();
  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: { bottomTabs: { backgroundColor: "#141414" } },
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: "Home",
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                    passProps: { userInfo },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: "FIRST_TAB_BAR_BUTTON",
                  text: "HOME",
                  icon: iconsMap.home,
                  textColor: "#ffffff",
                  selectedTextColor: "#ffffff",
                  iconColor: "#ffffff",
                  selectedIconColor: "#3aa8a5",
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: "Studios",
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: "SECOND_TAB_BAR_BUTTON",
                  text: "STUDIOS",
                  icon: iconsMap["location-pin"],
                  textColor: "#ffffff",
                  selectedTextColor: "#ffffff",
                  iconColor: "#ffffff",
                  selectedIconColor: "#3aa8a5",
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: "Favorites",
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                    passProps: { userInfo },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: "THIRD_TAB_BAR_BUTTON",
                  text: "FAVORITEN",
                  icon: iconsMap.staro,
                  textColor: "#ffffff",
                  selectedTextColor: "#ffffff",
                  iconColor: "#ffffff",
                  selectedIconColor: "#3aa8a5",
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: "Profile",
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                    passProps: { userInfo },
                  },
                },
              ],
              options: {
                bottomTab: {
                  testID: "FOURTH_TAB_BAR_BUTTON",
                  text: "PROFILE",
                  icon: iconsMap["user-o"],
                  textColor: "#ffffff",
                  selectedTextColor: "#ffffff",
                  iconColor: "#ffffff",
                  selectedIconColor: "#3aa8a5",
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function init() {
  appInitialized();
}
