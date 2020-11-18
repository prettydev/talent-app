import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import ScreenLayout from "../layout/ScreenLayout";
import HeaderBackground from "../../components/headerBackground/HeaderBackground";
import { TopHeaderTitle, BigTitle } from "../../components/title/Titles";
import CardsContainer from "../../components/card/CardsContainer";
import SmallCard from "../../components/card/smallCard/SmallCard";
import PipeCard from "../../components/card/pipeCard/PipeCard";
import Loader from "../../components/loader/Loader";
import {
  FavouriteUser,
  Song,
  useGetFavouritesQuery,
} from "../../generated/types-and-hooks";
import { UserInfo } from "react-native-auth0";
import { Navigation } from "react-native-navigation";
import PubSub from "pubsub-js";
import MusicPlayer from "../../services/MusicPlayer";
import { DEFAULT_AVATAR, DEFAULT_MUSIC } from "../../assets/img/default-images";

interface FavoriteProps {
  componentId: string;
  userInfo: UserInfo;
}

const Favorites = (props: FavoriteProps) => {
  // Get currentUserId from Redux store
  const currentUserId = useSelector((state) => state.user.userId);
  // Fetch favorite users,songs
  const { data, error, loading, refetch } = useGetFavouritesQuery({
    variables: { id: currentUserId },
  });
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();

  const mySubscriber = (msg: any, SubscribeData: any) => {
    if (refetch) {
      refetch();
    }
  };

  useEffect(() => {
    PubSub.subscribe("IS_FAVOURITE", mySubscriber);
  }, []);

  if (loading) return <Loader animationType="fade" modalVisible={true} />;
  if (error) return <Text>Error</Text>;
  if (!data) {
    throw new Error("Data Undefined");
  }

  return (
    <ScreenLayout
      componentId={props.componentId}
      fullScreen={fullScreen}
      setFullScreen={setFullScreen}
      selectedSong={selectedSong}
      userInfo={props.userInfo}
    >
      <FavoriteContainer
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <HeaderBackground />
        <HeaderTitle title="Your favorites" />

        <FavoriteContent>
          <MainTitle title="Artists" />
          {data.user.favourites?.users?.map(
            (user: Pick<FavouriteUser, "name" | "avatar" | "id">) => (
              <PipeCard
                key={user.name || ""}
                img={user.avatar ? { uri: user.avatar } : DEFAULT_AVATAR}
                title={user.name || ""}
                onClick={() => {
                  Navigation.push(props.componentId, {
                    component: {
                      name: "ArtistProfile",
                      passProps: { id: user.id },
                      options: {
                        topBar: {
                          visible: false,
                        },
                      },
                    },
                  });
                }}
              />
            )
          )}
          <MainTitle title="Songs" />
          <CardsContainer>
            {data?.user?.favourites?.songs?.map((song) => (
              <SmallCard
                key={song.id}
                img={song.img ? { uri: song.img } : DEFAULT_MUSIC}
                title={song.title}
                onClick={async () => {
                  await MusicPlayer.playSong(song);
                }}
              />
            ))}
          </CardsContainer>
          {/* TODO: make users categorized */}
          {/* <MainTitle title="Produzenten" />
          <PipeCard
            img={require("../../assets/img/img(56).png")}
            title="Melisa Carolina"
            subTitle="RnB / HipHop"
          />
          <PipeCard
            img={require("../../assets/img/img(56).png")}
            title="Melisa Carolina"
            subTitle="RnB / HipHop"
          /> */}
        </FavoriteContent>
      </FavoriteContainer>
    </ScreenLayout>
  );
};

export default Favorites;

const FavoriteContainer = styled(ScrollView)`
  flex: 1;
  position: relative;
`;

const FavoriteContent = styled(View)`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: -110px;
`;

const HeaderTitle = styled(TopHeaderTitle)`
  align-self: center;
  position: absolute;
  top: 80px;
`;

const MainTitle = styled(BigTitle)`
  padding-top: 30px;
  padding-bottom: 10px;
`;
