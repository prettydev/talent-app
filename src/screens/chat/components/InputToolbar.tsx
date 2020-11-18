/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { InputToolbar, Composer, Send } from "react-native-gifted-chat";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: "#DFF0F0",
      borderRadius: 40,
      marginLeft: 26,
      marginRight: 19,
      marginBottom: 14,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 17,
      paddingRight: 17,
      alignItems: "center",
    }}
    primaryStyle={{ alignItems: "center" }}
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      height: 22,
      letterSpacing: 1.4,
      fontFamily: "Avenir Next",
      fontSize: 14,
    }}
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    alwaysShowSend={true}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
    }}
  >
    <FontAwesome5Icon name="paper-plane" size={32} color="#3AA8A5" />
  </Send>
);
