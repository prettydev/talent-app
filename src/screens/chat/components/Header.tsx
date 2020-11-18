import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Navigation } from "react-native-navigation";
import { Thumbnail } from "native-base";
import styled from "styled-components/native";
import { User } from "../../../../generated/types-and-hooks";
import Images from "../../../assets/img/default-images";

export default (props: { artistInfo: User; componentId: string }) => (
  <>
    <SafeAreaView />
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 26,
          alignItems: "center",
          paddingTop: 18,
          paddingBottom: 20,
        }}
      >
        <FontAwesome5Icon
          name="chevron-left"
          size={40}
          color="#3AA8A5"
          onPress={() => Navigation.pop(props.componentId)}
          light={true}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {props.artistInfo.avatar && (
            <ContactAvatar source={{ uri: props.artistInfo.avatar }} />
          )}
          <Username>{props.artistInfo.name}</Username>
        </View>
        <FeatherIcon name="info" size={40} color="#3AA8A5" />
      </View>
      <View
        style={{
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 1.0,
        }}
      >
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#DBDBDB" }} />
      </View>
    </View>
  </>
);

export const ContactAvatar = styled(Thumbnail)`
  height: 28px;
  width: 28px;
  overflow: hidden;
  border-radius: 50px;
`;

const Username = styled(Text)`
  text-align: left;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.fontFamily};
  text-transform: uppercase;
  opacity: 1;
  margin-left: 14;
`;
