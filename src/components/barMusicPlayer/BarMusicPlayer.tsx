import { Footer, Text } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { Song } from "../../generated/types-and-hooks";
import MusicPlayer from "../../services/MusicPlayer";

const BarMusicPlayer = (props: {
  currentSong: Song;
  isPlaying: boolean;
  isCurrentSongInFavourites: boolean;
}) => {
  const { isPlaying, isCurrentSongInFavourites } = props;

  const favoriteIcon = isCurrentSongInFavourites ? "heart" : "heart-o";
  const iconPlay = props.isPlaying ? "pause-circle" : "play-circle";

  return (
    <TouchableOpacity
      onPress={() =>
        Navigation.showModal({
          stack: {
            children: [
              {
                component: {
                  name: "MusicPlayer",
                  passProps: {
                    setFullScreen: () => Navigation.dismissAllModals(),
                  },
                  options: {
                    topBar: {
                      visible: false,
                    },
                  },
                },
              },
            ],
          },
        })
      }
    >
      <Footer style={styles.container}>
        <TouchableOpacity
          hitSlop={{ bottom: 10, left: 20, right: 10, top: 10 }}
          onPress={
            isCurrentSongInFavourites
              ? MusicPlayer.removeCurrentSongFromFavourites
              : MusicPlayer.addCurrentSongToFavourites
          }
          style={styles.favIcon}
        >
          <FontAwesome color="#ffffff" name={favoriteIcon} size={20} />
        </TouchableOpacity>

        <View>
          <View style={styles.containerSong}>
            <Text style={styles.title}>{props.currentSong?.title}</Text>
            {/* <Text style={styles.artist}>song.artist</Text> */}
          </View>
          <View style={[styles.flexRowCenter, styles.mTHalf]}>
            <FontAwesome name="bluetooth-b" size={14} />
            <Text style={styles.device}>{props.currentSong?.author?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
          onPress={isPlaying ? MusicPlayer.pause : MusicPlayer.play}
          style={styles.favIcon}
          activeOpacity={0.7}
        >
          <FontAwesome color="#FFFFFF" name={iconPlay} size={28} />
        </TouchableOpacity>
      </Footer>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: any) => ({
  currentSong: state.musicPlayer.currentSong,
  isPlaying: state.musicPlayer.isPlaying,
  isCurrentSongInFavourites:
    state.user.favourites?.songs?.find(
      (song: Song) => song.id === state.musicPlayer.currentSong.id
    ) !== undefined,
});

export default connect(mapStateToProps)(BarMusicPlayer);

const styles = StyleSheet.create({
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
  device: {
    fontSize: 10,
    color: "#57b660",
    marginLeft: 4,
    textTransform: "uppercase",
  },
});

const data = [
  {
    id: "1111",
    url:
      "https://de-talent-app.s3.eu-central-1.amazonaws.com/music/Aaja+Meri+Bike+Pe+(PagalWorld.cool)",
    title: "Longing",
    artist: "David Chavez",
    artwork:
      "https://s-media-cache-ak0.pinimg.com/originals/2f/5a/d6/2f5ad60b12d94bebe8b82afbc2b2cd0c.jpg",
  },
  {
    id: "2222",
    url: "http://www.noiseaddicts.com/samples_1w72b820/2558.mp3",
    title: "Soul Searching (Demo)",
    artist: "David Chavez",
    artwork:
      "https://cdn1.player.fm/images/2082067/series/a6T0LNRk02vnyWDy/512.jpg",
  },
  {
    id: "3333",
    url: "http://www.noiseaddicts.com/samples_1w72b820/1453.mp3",
    title: "Lullaby (Demo)",
    artist: "David Chavez",
    artwork:
      "https://www.howwe.biz/uploads/songcover/howwebiz_bc5afadada79dd680e4a35c441f523d2_1437126317_cover.jpg",
  },
  {
    id: "4444",
    url: "https://www.sample-videos.com/audio/mp3/wave.mp3",
    title: "Rhythm City (Demo)",
    artist: "David Chavez",
    artwork: "https://www.dx-revision.com/wp-content/uploads/AltMusicPack.png",
  },
];
