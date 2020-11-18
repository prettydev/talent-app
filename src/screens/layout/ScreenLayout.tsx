import { Container } from "native-base";
import React from "react";
import { UserInfo } from "react-native-auth0";
import { Song } from "src/generated/types-and-hooks";
import styled, { ThemeProvider } from "styled-components/native";
import BarMusicPlayer from "../../components/barMusicPlayer/BarMusicPlayer";
import theme from "../../theme/Theme";
import { connect } from "react-redux";
interface ScreenLayoutProps {
  userInfo: UserInfo;
  currentSong: Song;
}

const ScreenLayout = (props: ScreenLayoutProps) => (
  <ThemeProvider theme={theme}>
    <ScreenLayoutContainer>{props.children}</ScreenLayoutContainer>
    {props.currentSong && <BarMusicPlayer />}
  </ThemeProvider>
);

const mapStateToProps = (state) => ({
  currentSong: state.musicPlayer.currentSong,
});

export default connect(mapStateToProps)(ScreenLayout);

const ScreenLayoutContainer = styled(Container)`
  flex: 1;
`;
