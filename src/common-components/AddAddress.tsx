import { Content, View } from "native-base";
import React, { useState } from "react";
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
import Config from "react-native-config";

import {
  useSearchUserMutation,
  useUpdateUserMutation,
} from "../generated/types-and-hooks";
import ScreenLayout from "../screens/layout/ScreenLayout";

const AddAddress = (props: any) => {
  const [locations, setLocations] = useState([]);

  const getLocations = async (query) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${
          Config.GOOGLE_API
        }&input=${
          query || ""
        }&inputtype=textquery&fields=name,formatted_address,geometry&type=address`
      );
      const data = await res.json();

      if (data?.predictions?.length === 0) return;

      setLocations(data.predictions);
    } catch (error) {
      console.warn("Failed to get location from google", error);
    }
  };

  let timeout;
  const filterSearch = (val: boolean, text: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => getLocations(text), 500);
  };

  const handleLocation = (id) => {
    // TODO: server request
    props.toggleModal();
  };

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
        <HeaderTitle title="add address" />

        <SearchBar onBlur={filterSearch} style={styles.searchBarWrapper} />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          style={{ position: "relative", top: -100 }}
        >
          {locations?.map((location) => (
            <LocationWrapper
              key={location.place_id}
              onPress={() => handleLocation(location.place_id)}
            >
              <LocationText>{location.description}</LocationText>
            </LocationWrapper>
          ))}
          {/* {data?.searchUser?.map((user) => {
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
          })} */}
        </ScrollView>
      </MainContainer>
    </ScreenLayout>
  );
};
export default AddAddress;

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

export const LocationWrapper = styled(TouchableOpacity)`
  padding: 12px 24px;
`;
export const LocationText = styled.Text`
  font-size: 18px;
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
