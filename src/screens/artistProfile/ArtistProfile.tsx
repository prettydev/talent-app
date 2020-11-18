import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Navigation } from "react-native-navigation";
import ReadMore from "react-native-read-more-text";
import SInfo from "react-native-sensitive-info";
import Toast from "react-native-simple-toast";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components/native";
import CardsContainer from "../../components/card/CardsContainer";
import SmallCard from "../../components/card/smallCard/SmallCard";
// Header Imports
import Header, { Left, Right } from "../../components/header/Header";
import HeaderBackground from "../../components/headerBackground/HeaderBackground";
import ProfileImg from "../../components/profileImg/ProfileImg";
import { BoldTitle, MediumTitle } from "../../components/title/Titles";
import {
  useGetDataForArtistPageQuery,
  useUpdateUserFavouritesMutation,
} from "../../generated/types-and-hooks";
import ScreenLayout from "../layout/ScreenLayout";
import PubSub from "pubsub-js";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";
import MusicPlayer from "../../services/MusicPlayer";
import { DEFAULT_AVATAR } from "../../assets/img/default-images";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";
interface ArtistProfileProps {
  componentId: string;
  id: string;
}

const ArtistProfile = (props: ArtistProfileProps) => {
  // function for revealing more text
  const currentUserId = useSelector((state: RootState) => state.user.userId);
  const [favourites, setFavourites] = useState(false);

  const { data, error, loading, refetch } = useGetDataForArtistPageQuery({
    variables: {
      artistId: props.id,
      id: currentUserId,
    },
  });

  // TODO: refactor the functionality
  useEffect(() => {
    if (data?.user?.favourites?.users?.length) {
      data.user.favourites.users.map((user) => {
        if (user.id === props.id) setFavourites(true);
      });
    }
  }, [data]);

  const [
    updateUserFavourites,
    { data: updateData, error: updateError },
  ] = useUpdateUserFavouritesMutation();

  const showMoreTextAction = (handlePress: any) => {
    return (
      <ReadMoreIcon
        name="chevron-down"
        size={35}
        color="#3AA8A5"
        onPress={handlePress}
        light={true}
      />
    );
  };

  // function for revealing less text
  const showLessTextAction = (handlePress: any) => {
    return (
      <ReadMoreIcon
        name="chevron-up"
        size={35}
        color="#3AA8A5"
        onPress={handlePress}
        light={true}
      />
    );
  };

  // TODO: make a global handler for this / Or do it on Backend
  const handleFavourites = async () => {
    // console.log("helloooo",data);
    let favoriteUsers: string[] = [];
    data?.user.favourites?.users?.map((user) => {
      if (user.id !== props.id) favoriteUsers.push(user.id);
    });
    if (favourites) {
      favoriteUsers = favoriteUsers.filter((favoriteUser) => {
        return favoriteUser !== props.id;
      });
      setFavourites(false);
    } else {
      favoriteUsers.push(props.id);
      setFavourites(true);
    }
    // console.tron.log("favoriteUsers", favoriteUsers);
    await updateUserFavourites({
      variables: {
        input: {
          favourites: {
            users: favoriteUsers,
          },
        },
        id: currentUserId,
      },
    });
    PubSub.publish("IS_FAVOURITE", "added to favourites");
  };

  if (updateData?.updateUserFavourites.id && favourites) {
    Toast.show("Artist added to favourites");
  } else if (updateData?.updateUserFavourites.id && !favourites) {
    Toast.show("Artist removed from favourites");
  }

  if (error || updateError) Toast.show("something went wrong");

  return (
    <ScreenLayout componentId={props.componentId} footer={false}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#DFF0F0" }} />
      <ArtistProfileContainer>
        <ScrollView
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
              <AntDesignIcon
                name="star"
                size={40}
                color={favourites ? "#ffe000" : "#3AA8A5"}
                onPress={handleFavourites}
              />
            </Right>
          </Header>
          <HeaderBackground />

          <ProfileImage
            img={
              data?.artist?.avatar
                ? { uri: data.artist.avatar }
                : DEFAULT_AVATAR
            }
          />

          <ArtistProfileContent>
            <UserName title={data?.artist?.name ? data.artist.name : ""} />
            <SubTitle
              title={
                data?.artist?.talentCategory ? data?.artist?.talentCategory : ""
              }
            />
            <ReadMoreContainer>
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={(e) => showMoreTextAction(e)}
                renderRevealedFooter={(e) => showLessTextAction(e)}
              >
                <ProfileDescription>
                  {data?.artist?.description ? data.artist.description : null}
                </ProfileDescription>
              </ReadMore>
            </ReadMoreContainer>

            {data?.artist.songs?.length! > 0 && (
              <>
                <PublishedSongsTitle title="Uploaded Songs" />

                <CardsContainer>
                  {data?.artist.songs?.map((song) => {
                    return (
                      <SmallCard
                        img={
                          song?.img
                            ? { uri: song.img }
                            : require("../../assets/img/default-images/music.png")
                        }
                        key={song.id}
                        onClick={async () => {
                          await MusicPlayer.playSong(song);
                        }}
                      />
                    );
                  })}
                </CardsContainer>
              </>
            )}
          </ArtistProfileContent>
        </ScrollView>
      </ArtistProfileContainer>
    </ScreenLayout>
  );
};
export default ArtistProfile;

const ArtistProfileContainer = styled(SafeAreaView)`
  flex: 1;
  position: relative;
`;

const ProfileImage = styled(ProfileImg)`
  align-self: center;
  position: absolute;
  top: 109px;
`;

const ArtistProfileContent = styled(View)`
  margin-left: 15px;
  margin-right: 15px;
`;

const UserName = styled(BoldTitle)`
  align-self: center;
`;

const SubTitle = styled(MediumTitle)`
  align-self: center;
`;

const PublishedSongsTitle = styled(MediumTitle)`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ReadMoreContainer = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProfileDescription = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 17px;
  text-align: left;
  line-height: 23px;
`;

const ReadMoreIcon = styled(FontAwesome5Icon)`
  align-self: center;
  margin-top: 10px;
`;
