import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { UserInfo } from "react-native-auth0";
import { Navigation } from "react-native-navigation";
import styled from "styled-components/native";
import PipeCard from "../../components/card/pipeCard/PipeCard";
import HeaderBackground from "../../components/headerBackground/HeaderBackground";
import Spinner from "../../components/spinner/Spinner";
import { TopHeaderTitle } from "../../components/title/Titles";
import MusicPlayer from "../../services/MusicPlayer";
import {
  AllowedGenre,
  useSongsByGenreQuery,
} from "../../generated/types-and-hooks";
import ScreenLayout from "../layout/ScreenLayout";
import { DEFAULT_MUSIC } from "../../assets/img/default-images";

import Header, { Left, Right } from "src/components/header/Header";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

interface FavoriteProps {
  componentId: string;
  userInfo: UserInfo;
  genre: AllowedGenre;
}

const Songs = (props: FavoriteProps) => {
  const { data, error, loading, refetch } = useSongsByGenreQuery({
    variables: { genre: props.genre },
  });

  if (loading) return <Spinner />;
  if (error) return <Text>Error</Text>;
  if (!data) {
    throw new Error("Data Undefined");
  }

  return (
    <ScreenLayout componentId={props.componentId}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#DFF0F0" }} />
      <Wrapper
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <Header>
          <Left>
            <FontAwesome5Icon
              name="chevron-left"
              size={40}
              color="#3AA8A5"
              onPress={() => Navigation.pop(props.componentId)}
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
        <HeaderBackground />
        <HeaderTitle title={props.genre} />

        <ListContainer>
          {data.songsByGenre?.map((song) => (
            <PipeCard
              key={song.id}
              img={song.img ? { uri: song.img } : DEFAULT_MUSIC}
              title={song.title}
              subTitle={song.author?.name}
              onClick={async () => {
                MusicPlayer.playSong(song);
              }}
            />
          ))}
        </ListContainer>
      </Wrapper>
    </ScreenLayout>
  );
};

export default Songs;

const Wrapper = styled(ScrollView)`
  flex: 1;
  position: relative;
`;

const ListContainer = styled(View)`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: -80px;
`;

const HeaderTitle = styled(TopHeaderTitle)`
  align-self: center;
  position: absolute;
  top: 80px;
`;
