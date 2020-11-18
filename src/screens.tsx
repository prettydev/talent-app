import { Navigation } from "react-native-navigation";
import WithProvider from "./components/WithProvider";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import Home from "./screens/home/Home";
import Studios from "./screens/studios/Studios";
import Favorites from "./screens/favorites/Favorites";
import Profile from "./screens/profile/Profile";
import ArtistProfile from "./screens/artistProfile/ArtistProfile";
import Blog from "./screens/blog/Blog";
import BlogArticle from "./screens/blogArticle/BlogArticle";
import Settings from "./screens/settings/Settings";
import ProfileInformation from "./screens/settings/ProfileInformation";
import Privacy from "./screens/settings/Privacy";
import Security from "./screens/settings/Security";
import Notifications from "./screens/settings/Notifications";
import Chat from "./screens/chat/Chat";
import MusicPlayer from "./screens/musicPlayer/MusicPlayer";
import NewMessage from "./screens/newMessage/NewMessage";
import Songs from "./screens/songs/Songs";
import store from "./redux/store";

export const registerScreens = () => {
  Navigation.registerComponent("SignIn", () => WithProvider(SignIn, store));

  Navigation.registerComponent("SignUp", () => WithProvider(SignUp, store));

  Navigation.registerComponent("Screen2", () => require("./Screen2").default);

  Navigation.registerComponent("Home", () => WithProvider(Home, store));

  Navigation.registerComponent("Studios", () => WithProvider(Studios, store));

  Navigation.registerComponent("Favorites", () =>
    WithProvider(Favorites, store)
  );

  Navigation.registerComponent("Profile", () => WithProvider(Profile, store));

  Navigation.registerComponent("Settings", () => WithProvider(Settings, store));
  Navigation.registerComponent("ProfileInformation", () =>
    WithProvider(ProfileInformation, store)
  );
  Navigation.registerComponent("PrivacySettings", () =>
    WithProvider(Privacy, store)
  );
  Navigation.registerComponent("SecuritySettings", () =>
    WithProvider(Security, store)
  );
  Navigation.registerComponent("NotificationSettings", () =>
    WithProvider(Notifications, store)
  );

  Navigation.registerComponent("ArtistProfile", () =>
    WithProvider(ArtistProfile, store)
  );

  Navigation.registerComponent("Blog", () => WithProvider(Blog, store));

  Navigation.registerComponent("BlogArticle", () =>
    WithProvider(BlogArticle, store)
  );

  Navigation.registerComponent("Songs", () => WithProvider(Songs, store));

  Navigation.registerComponent("Chat", () => WithProvider(Chat, store));

  Navigation.registerComponent("NewMessage", () =>
    WithProvider(NewMessage, store)
  );

  Navigation.registerComponent("MusicPlayer", () =>
    WithProvider(MusicPlayer, store)
  );
};
