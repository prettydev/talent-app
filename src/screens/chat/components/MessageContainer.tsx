/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Bubble, MessageText } from "react-native-gifted-chat";

export const renderBubble = (props) => (
  <Bubble
    {...props}
    renderTime={() => <></>}
    wrapperStyle={{
      left: { backgroundColor: "#F0F0F0" },
      right: { backgroundColor: "#DFF0F0" },
    }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    textStyle={{
      left: { color: "#2C2C2C" },
      right: { color: "#2C2C2C" },
    }}
    customTextStyle={{ fontSize: 14, lineHeight: 19 }}
  />
);
