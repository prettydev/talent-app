import { BoldTitle, MediumTitle } from "src/components/title/Titles";
import { Text, View } from "native-base";
import { DEFAULT_AVATAR, DEFAULT_MUSIC } from "src/assets/img/default-images";
import Header, { Left, Right } from "src/components/header/Header";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import {
  Song,
  useGetProfileQuery,
  useUpdateUserMutation,
} from "src/generated/types-and-hooks";
import AddAddress from "src/common-components/AddAddress";
import AddConnection from "src/common-components/AddConnection";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import CardsContainer from "src/components/card/CardsContainer";
import FeatherIcon from "react-native-vector-icons/Feather";
import HeaderBackground from "src/components/headerBackground/HeaderBackground";
import Loader from "src/components/loader/Loader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MusicPlayer from "src/services/MusicPlayer";
import { Navigation } from "react-native-navigation";
import ProfileImg from "src/components/profileImg/ProfileImg";
import ScreenLayout from "src/screens/layout/ScreenLayout";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import SmallCard from "src/components/card/smallCard/SmallCard";
import UploadImage from "src/common-components/UploadImage";
import UploadSong from "src/common-components/UploadSong";
import { UserInfo } from "react-native-auth0";
import styled from "styled-components/native";
import { RootState } from "src/redux/reducers";

interface ProfileProps {
  componentId: string;
  userInfo: UserInfo;
}

const Profile = (props: ProfileProps) => {
  const currentUserId = useSelector((state: RootState) => state.user.userId);

  const { data, error, loading, refetch } = useGetProfileQuery({
    variables: { id: currentUserId },
  });
  const [showSong, setShowSong] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [connections, setConnections] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();

  const [
    updateUser,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (data && data.user) {
      setDescription(data.user.description ? data.user.description : "");
    }
  }, [data]);

  if (loading || imageLoading)
    return <Loader animationType="fade" modalVisible={true} />;
  if (error) {
    console.warn(error);
    return <Text>Error</Text>;
  }
  if (!data) {
    throw new Error("Data Undefined");
  }

  const toggleModal = () => {
    if (showSong) setShowSong(false);
    if (connections) setConnections(false);
    if (showAddress) setShowAddress(false);
  };

  const handleEditDescription = () => {
    setEditDescription(!editDescription);
  };

  const handleDescription = (event: any) => {
    setDescription(event);
    setShowSave(true);
  };

  const SaveDescription = () => {
    updateUser({
      variables: {
        input: {
          description,
        },
        id: currentUserId,
      },
    });
    setShowSave(false);
    setEditDescription(!editDescription);
  };

  if (showSong)
    return (
      <UploadSong toggleModal={toggleModal} userId={currentUserId} {...props} />
    );

  if (connections)
    return (
      <AddConnection
        toggleModal={toggleModal}
        userId={currentUserId}
        connections={data.user.connections}
      />
    );

  if (showAddress)
    return (
      <AddAddress
        toggleModal={toggleModal}
        userId={currentUserId}
        connections={data.user.connections}
      />
    );

  return (
    <>
      <ScreenLayout
        componentId={props.componentId}
        footer={false}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
        selectedSong={selectedSong}
        userInfo={props.userInfo}
      >
        <SafeAreaView style={{ flex: 0, backgroundColor: "#DFF0F0" }} />
        <ProfileContainer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refetch} />
            }
          >
            <Header>
              <Left>
                <FeatherIcon
                  name="share-2"
                  size={40}
                  color="#3AA8A5"
                  style={{ marginRight: 20 }}
                />
              </Left>
              <Right>
                <SimpleLineIcon
                  name="settings"
                  size={40}
                  color="#3AA8A5"
                  onPress={() => {
                    Navigation.push(props.componentId, {
                      component: {
                        name: "Settings",
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
              </Right>
            </Header>
            <HeaderBackground />
            <ProfileImage
              img={
                img.length
                  ? { uri: img }
                  : data.user && data.user.avatar && data.user.avatar.length
                  ? { uri: data.user.avatar }
                  : DEFAULT_AVATAR
              }
            />
            <UploadImg userId={currentUserId} setImage={setImg} {...props} />
            <ProfileContent>
              <UserName title={data.user.name} />
              {/* TODO: Make the tracking statistics dynamic */}
              {/* <SubTitle title="365 Profilaufrufe in den letzten 24 Stunden" /> */}
              <EditIcon
                name="pencil-circle-outline"
                size={40}
                color="#3AA8A5"
                onPress={() => handleEditDescription()}
              />
              {editDescription ? (
                <EditProfileDescription
                  multiline={true}
                  onChangeText={(event) => handleDescription(event)}
                  value={description}
                />
              ) : (
                <ProfileDescription>
                  {updateData && updateData.updateUser
                    ? updateData.updateUser.description
                    : data.user.description}
                </ProfileDescription>
              )}
              {showSave ? (
                <AntDesignIcon
                  name="save"
                  size={40}
                  color="#3AA8A5"
                  onPress={() => SaveDescription()}
                />
              ) : null}
              <ArtistsWorkedWithTitle title="Artists I have worked with" />
              <CardsContainer>
                <UploadBox>
                  <TouchableOpacity onPress={() => setConnections(true)}>
                    <AntDesignIcon
                      name="pluscircle"
                      size={40}
                      color="#3AA8A5"
                    />
                  </TouchableOpacity>
                </UploadBox>
                {data?.user?.connections?.map((connection) => {
                  return (
                    <SmallCard
                      key={connection.id}
                      img={
                        connection.avatar
                          ? { uri: connection.avatar }
                          : DEFAULT_AVATAR
                      }
                      onClick={() => {
                        Navigation.push(props.componentId, {
                          component: {
                            name: "ArtistProfile",
                            passProps: { id: connection.id },
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
              </CardsContainer>
              <ArtistsWorkedWithTitle title="Uploaded Songs" />
              <CardsContainer>
                <UploadBox>
                  <TouchableOpacity onPress={() => setShowSong(true)}>
                    <AntDesignIcon
                      name="pluscircle"
                      size={40}
                      color="#3AA8A5"
                    />
                  </TouchableOpacity>
                </UploadBox>
                {data?.user?.songs?.map((song) => {
                  return (
                    <SmallCard
                      key={song.id}
                      img={song.img ? { uri: song.img } : DEFAULT_MUSIC}
                      title={song.title}
                      onClick={async () => {
                        await MusicPlayer.playSong(song);
                      }}
                    />
                  );
                })}
              </CardsContainer>
              <ArtistsWorkedWithTitle title="My address" />
              <CardsContainer>
                <UploadBox>
                  <TouchableOpacity onPress={() => setShowAddress(true)}>
                    <AntDesignIcon
                      name="pluscircle"
                      size={40}
                      color="#3AA8A5"
                    />
                  </TouchableOpacity>
                </UploadBox>
                {
                  // TODO: Display address
                }
              </CardsContainer>
            </ProfileContent>
          </ScrollView>
        </ProfileContainer>
      </ScreenLayout>
    </>
  );
};
export default Profile;

const ProfileContainer = styled(SafeAreaView)`
  flex: 1;
  position: relative;
`;

const ProfileContent = styled(View)`
  margin-left: 15px;
  margin-right: 15px;
`;

const ProfileImage = styled(ProfileImg)`
  align-self: center;
  position: absolute;
  top: 109px;
`;

const UserName = styled(BoldTitle)`
  align-self: center;
`;

const SubTitle = styled(MediumTitle)`
  text-align: center;
  align-self: center;
  max-width: 250px;
`;

const ArtistsWorkedWithTitle = styled(MediumTitle)`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ProfileDescription = styled(Text)`
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 17px;
  text-align: left;
  line-height: 23px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const EditProfileDescription = styled.TextInput`
  font-size: 17px;
  text-align: left;
  line-height: 23px;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #def0f0;
  position: relative;
`;

const UploadBox = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  height: 108px;
  width: 30%;
  margin: 6px;
  background-color: #def0f0;
`;
const UploadImg = styled(UploadImage)`
  position: absolute;
  top: 10px;
`;
const EditIcon = styled(MaterialCommunityIcons)`
  position: relative;
  margin-left: 250px;
`;
