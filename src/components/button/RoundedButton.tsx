import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

interface RoundedButton {
  text: string;
  handleOnPress?: any;
  style?: StyleProp<ViewStyle>;
}

export const RoundedButton = (props: RoundedButton) => {
  return (
    <Wrapper style={props.style} onPress={props.handleOnPress}>
      <BtnText>{props.text}</BtnText>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  align-self: center;
  height: 39px;
  padding: 0px 25px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #3aa8a5;
  margin: 10px;
`;

const BtnText = styled.Text`
  flex: 1;
  color: #3aa8a5;
  text-align: center;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 5px;
  margin-top: 5px;
`;
