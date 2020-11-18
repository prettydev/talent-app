import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Song, useGetProfileQuery } from "../../generated/types-and-hooks";
import styled from "styled-components/native";
import FooterBackground from "../../components/footerBackground/FooterBackground";
import Header, { Left, Right } from "../../components/header/Header";
import { BoldTitle, MediumTitle } from "../../components/title/Titles";
import TrackStatus from "./TrackStatus";
import { ThemeProvider } from "styled-components/native";
import theme from "../../theme/Theme";
import MusicPlayer from "../../services/MusicPlayer";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  isCurrentSongInFavourites: boolean;
}

const MusicPlayerScreen = (props: MusicPlayerProps) => {
  const { isPlaying, currentSong, isCurrentSongInFavourites } = props;

  return (
    <ThemeProvider theme={theme}>
      <FooterBackground />
      <Header>
        <Left>
          <FontAwesome5Icon
            name="chevron-down"
            size={40}
            color="#3AA8A5"
            onPress={() => Navigation.dismissAllModals()}
            light={true}
          />
        </Left>
        <Right>
          <FeatherIcon
            name="share-2"
            size={40}
            color="#3AA8A5"
            style={{ marginRight: 20 }}
          />
        </Right>
      </Header>
      <ImgContainer>
        <TitleImage
          source={
            currentSong.img
              ? { uri: currentSong.img }
              : require("../../assets/img/img(56).png")
          }
        />
      </ImgContainer>
      {/** Media Player */}
      <PlayerContainer>
        <Title title={currentSong?.title || ""} />
        <SubTitle title={currentSong?.author?.name || ""} />
        <View
          style={{
            top: 20,
            width: "80%",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <TrackStatus />

          {/* media controls  */}
          <View style={styles.containerControls}>
            <TouchableOpacity
              hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
            >
              <FeatherIcon color="#3AA8A5" name="shuffle" size={18} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                onPress={() => MusicPlayer.switchToPreviousTrack()}
              >
                <MaterialCommunityIcons
                  color="#3AA8A5"
                  name="skip-previous-circle"
                  size={42}
                />
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                onPress={isPlaying ? MusicPlayer.pause : MusicPlayer.play}
              >
                <MaterialCommunityIcons
                  color="#3AA8A5"
                  name={isPlaying ? "pause-circle" : "play-circle"}
                  size={68}
                />
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                onPress={() => MusicPlayer.switchToNextTrack()}
              >
                <MaterialCommunityIcons
                  color="#3AA8A5"
                  name="skip-next-circle"
                  size={42}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
            >
              <FeatherIcon color="#3AA8A5" name="repeat" size={18} />
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: "center", alignItems: "center", top: 20 }}>
            <TouchableOpacity>
              <FontAwesome
                name="star-o"
                size={26}
                color={isCurrentSongInFavourites ? "#ffe000" : "#3AA8A5"}
                onPress={
                  isCurrentSongInFavourites
                    ? MusicPlayer.removeCurrentSongFromFavourites
                    : MusicPlayer.addCurrentSongToFavourites
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </PlayerContainer>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: any) => ({
  currentSong: state.musicPlayer.currentSong,
  isPlaying: state.musicPlayer.isPlaying,
  userFavouriteSongs: state.user,
  isCurrentSongInFavourites:
    state.user.favourites?.songs?.find(
      (song: Song) => song.id === state.musicPlayer.currentSong.id
    ) !== undefined,
});

export default connect(mapStateToProps)(MusicPlayerScreen);

const styles = StyleSheet.create({
  containerTime: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 10,
    color: "#b3b3b3",
  },
  containerControls: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    alignSelf: "center",
    backgroundColor: "#282828",
    borderBottomColor: "#121212",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    width: "100%",
  },
  flexRowCenter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  mTHalf: {
    marginTop: 4,
  },

  favIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
  containerSong: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
    width: Dimensions.get("window").width - 100,
  },
  title: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  artist: {
    fontSize: 12,
    color: "#bebebe",
  },
});

const ImgContainer = styled(View)`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  top: 84px;
  left: 35px;
  height: ${Dimensions.get("window").width - 100}px;
  width: ${Dimensions.get("window").width - 70}px;
`;
const TitleImage = styled.Image`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const PlayerContainer = styled(View)`
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 100px;
  flex: 1;
`;

const Title = styled(BoldTitle)`
  align-self: center;
`;

const SubTitle = styled(MediumTitle)`
  text-align: center;
  align-self: center;
  max-width: 250px;
`;
