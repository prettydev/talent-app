import { View } from "native-base";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { UserInfo } from "react-native-auth0";
import { Navigation } from "react-native-navigation";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components/native";
import ContactCard from "../../components/card/contactCard/ContactCard";
import Header, { Left } from "../../components/header/Header";
import HeaderBackground from "../../components/headerBackground/HeaderBackground";
import Loader from "../../components/loader/Loader";
import SearchBar from "../../components/searchBar/SearchBar";
import { TopHeaderTitle } from "../../components/title/Titles";
import {
  useGetAllUserQuery,
  useSearchUserMutation,
} from "../../generated/types-and-hooks";
import ScreenLayout from "../layout/ScreenLayout";
import Toast from "react-native-simple-toast";
import { DEFAULT_AVATAR } from "../../assets/img/default-images";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";

interface NewMessageProps {
  componentId: string;
  userInfo: UserInfo;
}

const NewMessage = (props: NewMessageProps) => {
  const currentUserId = useSelector((state: RootState) => state.user.userId);
  const { data, error, loading, refetch } = useGetAllUserQuery();
  const [
    searchUser,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useSearchUserMutation();
  // console.log("DDD",data)

  const filterSearch = (val: boolean, text: string) => {
    searchUser({
      variables: {
        searchText: text,
      },
    });
  };

  if (loading || searchLoading)
    return <Loader animationType="fade" modalVisible={true} />;
  if (error || searchError) Toast.show("Something went wrong");
  if (!data) {
    throw new Error("Data Undefined");
  }
  if (searchData?.searchUser?.length === 0) Toast.show("Nothing found");

  return (
    <ScreenLayout componentId={props.componentId} footer={false}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#DFF0F0" }} />
      <MainContainer>
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
        </Header>
        <HeaderBackground />
        <HeaderTitle title="neue nachricht" />

        <SearchBar
          handelSearch={filterSearch}
          style={styles.searchBarWrapper}
        />
        <ScrollView
          style={{
            position: "relative",
            top: -100,
            flexGrow: 1,
            flexShrink: 0,
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
        >
          {searchData && searchData?.searchUser?.length
            ? searchData.searchUser.map((user) => {
                if (user.id !== currentUserId) {
                  return (
                    <>
                      <ContactCard
                        key={user.id}
                        img={
                          user.avatar && user.avatar.length
                            ? { uri: user.avatar }
                            : DEFAULT_AVATAR
                        }
                        title={user.name}
                        subTitle={user.talentCategory}
                        onClick={() => {
                          Navigation.push(props.componentId, {
                            component: {
                              name: "Chat",
                              passProps: {
                                userInfo: props.userInfo,
                                artistInfo: user,
                              },
                              options: {
                                topBar: {
                                  visible: false,
                                },
                              },
                            },
                          });
                        }}
                      />
                      <Divider />
                    </>
                  );
                }
              })
            : data.users
            ? data.users.map((user) => {
                if (user.id !== currentUserId) {
                  return (
                    <>
                      <ContactCard
                        key={user.id}
                        img={
                          user.avatar && user.avatar.length
                            ? { uri: user.avatar }
                            : DEFAULT_AVATAR
                        }
                        title={user.name}
                        subTitle={user.talentCategory}
                        onClick={() => {
                          Navigation.push(props.componentId, {
                            component: {
                              name: "Chat",
                              passProps: {
                                userInfo: props.userInfo,
                                artistInfo: user,
                              },
                              options: {
                                topBar: {
                                  visible: false,
                                },
                              },
                            },
                          });
                        }}
                      />
                      <Divider />
                    </>
                  );
                }
              })
            : null}
        </ScrollView>
      </MainContainer>
    </ScreenLayout>
  );
};
export default NewMessage;

const MainContainer = styled(View)`
  flex: 1;
  position: relative;
`;

const HeaderTitle = styled(TopHeaderTitle)`
  align-self: center;
  position: absolute;
  top: 25px;
`;
const ContactCardWrapper = styled(ContactCard)`
  border-bottom-width: 5px;
`;

export const ListContainer = styled(View)`
  position: absolute;

  top: 180px;
`;

export const Divider = styled(View)`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
`;

const styles = StyleSheet.create({
  searchBarWrapper: {
    position: "absolute",
    top: 60,
    left: 0,
    backgroundColor: "transparent",
    width: "100%",
    height: 90,
    zIndex: 99,
  },
  listWrapper: {
    flex: 1,
    flexGrow: 1,
    position: "absolute",
    top: 200,
    width: "100%",

    zIndex: 99,
  },
});
