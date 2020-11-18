// Home.js
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Platform,
} from "react-native";
import { UserInfo } from "react-native-auth0";
import { Navigation } from "react-native-navigation";
import Feather from "react-native-vector-icons/Feather";
import YoutubePlayer from "react-native-youtube-iframe";
import styled from "styled-components/native";
import { RoundedButton } from "../../components/button/RoundedButton";
import CardsContainer from "../../components/card/CardsContainer";
import LargeCard from "../../components/card/largeCard/LargeCard";
import LargeTextCard from "../../components/card/largeTextCard/LargeTextCard";
import MediumCard from "../../components/card/mediumCard/MediumCard";
import PipeCard from "../../components/card/pipeCard/PipeCard";
import SmallCard from "../../components/card/smallCard/SmallCard";
import Loader from "../../components/loader/Loader";
import SearchBar from "../../components/searchBar/SearchBar";
import { BigTitle } from "../../components/title/Titles";
import {
  Blog,
  useGetHomePageDataQuery,
  User,
  useSearchDataMutation,
} from "../../generated/types-and-hooks";
import ScreenLayout from "../layout/ScreenLayout";
import MusicPlayer from "../../services/MusicPlayer";
import { DEFAULT_AVATAR, DEFAULT_MUSIC } from "../../assets/img/default-images";
import GenreVerticalList from "src/components/list/vertical/GenreVerticalList";
import VerticalListContainer from "src/components/list/vertical/VerticalListContainer";

interface HomeProps {
  componentId: string;
  userInfo: UserInfo;
}

const Home = (props: HomeProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Fetch home page data : Songs, Blogs, Genre
  const { data, error, loading, refetch } = useGetHomePageDataQuery();
  // console.log("DATA",data)

  const [
    search,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useSearchDataMutation();

  if (loading || searchLoading)
    return <Loader animationType="fade" modalVisible={true} />;
  if (error || searchError) return <Text>Error</Text>;
  if (!data) {
    throw new Error("Data Undefined");
  }

  const filterSearch = (val: boolean, text: string) => {
    setIsSearching(val);
    search({
      variables: {
        searchText: text,
      },
    });
  };
  return (
    <ScreenLayout componentId={props.componentId} userInfo={props.userInfo}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <SearchBar
            handelSearch={filterSearch}
            style={styles.searchBarWrapper}
          >
            <Feather
              name="message-square"
              size={40}
              color="#3AA8A5"
              style={{ marginRight: 20 }}
              onPress={() => {
                Navigation.push(props.componentId, {
                  component: {
                    name: "NewMessage",
                    passProps: { userInfo: props.userInfo },
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                });
              }}
            />
          </SearchBar>
        </View>
        {isSearching && (
          <SearchContent
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <MainTitle title="People" />
            {searchData?.search?.users?.map((people) => {
              return (
                <PipeCard
                  key={people.id}
                  img={people.avatar ? { uri: people.avatar } : DEFAULT_AVATAR}
                  title={people.name}
                  subTitle={people.talentCategory}
                  onClick={() => {
                    Navigation.push(props.componentId, {
                      component: {
                        name: "MusicPlayer",
                        passProps: { userInfo: props.userInfo },
                        options: {
                          topBar: {
                            visible: false,
                          },
                        },
                      },
                    });
                  }}
                />
              );
            })}
            <MainTitle title="Blogs" />
            {searchData?.search?.blogs?.map((blog) => {
              return (
                <PipeCard
                  key={blog.id}
                  img={
                    blog.image
                      ? { uri: blog.image }
                      : Platform.OS === "ios"
                      ? { uri: "default-avatar" }
                      : require("../../assets/img/img(56).png")
                  }
                  title={blog.title}
                  onClick={() => {
                    Navigation.push(props.componentId, {
                      component: {
                        name: "MusicPlayer",
                        passProps: { userInfo: props.userInfo },
                        options: {
                          topBar: {
                            visible: false,
                          },
                        },
                      },
                    });
                  }}
                />
              );
            })}
            {searchData?.search?.songs && (
              <>
                <MainTitle title="Songs" />
                {searchData.search.songs.map((song) => {
                  return (
                    <PipeCard
                      key={song.id}
                      img={song.img ? { uri: song.img } : DEFAULT_MUSIC}
                      title={song.title}
                      subTitle={song.genre || ""}
                      onClick={() => {
                        // TODO Play song
                      }}
                    />
                  );
                })}
              </>
            )}
          </SearchContent>
        )}

        {!isSearching && (
          <HomeContent
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refetch} />
            }
          >
            {data.genre && (
              <>
                <MainTitle title="Recommended Genres" />
                <GenreVerticalList
                  data={data.genre}
                  componentId={props.componentId}
                />
              </>
            )}

            {data.producers && (
              <>
                <MainTitle title="Recommended producers" />
                {data.producers.map(
                  (
                    user: Pick<
                      User,
                      | "id"
                      | "name"
                      | "avatar"
                      | "description"
                      | "talentCategory"
                    >
                  ) => {
                    return (
                      <LargeTextCard
                        key={user.id}
                        img={
                          user.avatar ? { uri: user.avatar } : DEFAULT_AVATAR
                        }
                        title={user.name}
                        description={user.description!}
                        designation={user.talentCategory!}
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
                    );
                  }
                )}
              </>
            )}

            {data.blogs && (
              <>
                <MainTitle title="Recommended Blogs" />
                <VerticalListContainer>
                  {data.blogs.map(
                    (blog: Pick<Blog, "id" | "title" | "image">) => (
                      <MediumCard
                        key={blog.id}
                        img={{
                          uri: blog.image || "",
                        }}
                        title={blog.title}
                        onClick={() => {
                          Navigation.push(props.componentId, {
                            component: {
                              name: "BlogArticle",
                              passProps: { articleId: blog.id },
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
                </VerticalListContainer>
              </>
            )}

            <RoundedButton
              text="All Blogs"
              handleOnPress={() => {
                Navigation.push(props.componentId, {
                  component: {
                    name: "Blog",
                    passProps: {},
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                });
              }}
            />

            {data.musicians && (
              <>
                <MainTitle title="Recommended Musicians" />
                {data.musicians.map(
                  (user: Pick<User, "id" | "name" | "avatar">) => {
                    return (
                      <LargeCard
                        key={user.id}
                        img={
                          user.avatar ? { uri: user.avatar } : DEFAULT_AVATAR
                        }
                        title={user.name}
                        onClick={() => {
                          Navigation.push(props.componentId, {
                            component: {
                              name: "ArtistProfile",
                              passProps: { id: user.id, artist: user },
                              options: {
                                topBar: {
                                  visible: false,
                                },
                              },
                            },
                          });
                        }}
                      />
                    );
                  }
                )}
              </>
            )}

            {data.songs && (
              <>
                <MainTitle title="Recommended Songs" />
                <CardsContainer>
                  {data.songs?.map((song) => (
                    <SmallCard
                      key={song.id}
                      img={
                        song.img
                          ? {
                              uri: song.img,
                            }
                          : DEFAULT_MUSIC
                      }
                      title={song.title}
                      onClick={async () => {
                        await MusicPlayer.playSong(song);
                      }}
                    />
                  ))}
                </CardsContainer>
              </>
            )}
            <>
              <MainTitle title="Recommended Videos" />
              <Youtube
                ref={playerRef}
                height={240}
                videoId={"z12nA4hr-Gk"}
                play={playing}
                // onChangeState={(event) => console.log(event)}
                // onReady={() => console.log("ready")}
                // onError={(e) => console.log(e)}
                // onPlaybackQualityChange={(q) => console.log(q)}
                volume={50}
                playbackRate={1}
                playerParams={{
                  cc_lang_pref: "us",
                  showClosedCaptions: true,
                }}
              />
            </>
          </HomeContent>
        )}
      </SafeAreaView>
    </ScreenLayout>
  );
};

export default Home;

const SearchContent = styled(ScrollView)`
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 80px;
`;

const HomeContent = styled(ScrollView)`
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 80px;
`;

const MainTitle = styled(BigTitle)`
  padding-top: 30px;
  padding-bottom: 10px;
`;

const Youtube = styled(YoutubePlayer)`
  border-radius: 20px;
`;

const styles = StyleSheet.create({
  searchBarWrapper: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: "100%",
    height: 90,
  },
});
