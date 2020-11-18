import { Content, View } from "native-base";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-simple-toast";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components/native";
import ContactCard from "../components/card/contactCard/ContactCard";
import Header, { Left } from "../components/header/Header";
import HeaderBackground from "../components/headerBackground/HeaderBackground";
import Loader from "../components/loader/Loader";
import SearchBar from "../components/searchBar/SearchBar";
import { TopHeaderTitle } from "../components/title/Titles";
import {
  useSearchUserMutation,
  useUpdateUserMutation,
} from "../generated/types-and-hooks";
import ScreenLayout from "../screens/layout/ScreenLayout";

const AddConnection = (props: any) => {
  // console.log("PP",props)

  const [searchUser, { data, loading, error }] = useSearchUserMutation();
  const [
    updateUser,
    { data: updateData, error: updateError },
  ] = useUpdateUserMutation();

  const filterSearch = (val: boolean, text: string) => {
    searchUser({
      variables: {
        searchText: text,
      },
    });
  };

  const handleConnection = (connectionId: string) => {
    const connections: string[] = [];
    props.connections.map((connection: { id: string }) => {
      connections.push(connection.id);
    });
    if (connections.includes(connectionId)) {
      Toast.show("connection already added");
    } else {
      connections.push(connectionId);
      updateUser({
        variables: {
          input: {
            connections,
          },
          id: props.userId,
        },
      });
    }
  };

  if (loading) return <Loader animationType="fade" modalVisible={true} />;
  if (error || updateError) Toast.show("Something went wrong");
  if (updateData?.updateUser?.id) Toast.show("connection Added sucessfully");
  if (data?.searchUser?.length === 0) Toast.show("No Connection found");

  return (
    <ScreenLayout componentId={props.componentId} footer={false}>
      <MainContainer>
        <Header>
          <Left>
            <FontAwesome5Icon
              name="chevron-left"
              size={40}
              color="#3AA8A5"
              onPress={() => props.toggleModal()}
              light={true}
            />
          </Left>
        </Header>
        <HeaderBackground />
        <HeaderTitle title="add connections" />

        <SearchBar
          handelSearch={filterSearch}
          style={styles.searchBarWrapper}
        />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          style={{ position: "relative", top: -100 }}
        >
          {data?.searchUser?.map((user) => {
            if (user.id !== props.userId) {
              return (
                <>
                  <ContactCard
                    key={user.id}
                    img={
                      user.avatar && user.avatar.length
                        ? { uri: user.avatar }
                        : require("../assets/img/img(56).png")
                    }
                    title={user.name}
                    subTitle={user.talentCategory}
                    onClick={() => handleConnection(user.id)}
                  />
                  <Divider />
                </>
              );
            }
          })}
        </ScrollView>
      </MainContainer>
    </ScreenLayout>
  );
};
export default AddConnection;

const MainContainer = styled(Content)`
  flex: 1;
  position: relative;
`;

const HeaderTitle = styled(TopHeaderTitle)`
  align-self: center;
  position: absolute;
  top: 25px;
`;
const CardWrapper = styled(View)`
  flex-direction: row;
`;
const AddIcon = styled(TouchableOpacity)`
  position: relative;
  margin-left: 300px;
  align-self: center;
`;

export const ListContainer = styled(View)`
  position: absolute;
  top: 180px;
  justify-content: space-between;
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
