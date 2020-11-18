import React, { Component } from "react";
import styled from "styled-components/native";
import { Text, Thumbnail, View } from "native-base";
import {
  TouchableOpacity,
  ImageSourcePropType,
  TextStyle,
  StyleProp,
} from "react-native";

interface ContactCardProps {
  onClick?: () => void;
  img: ImageSourcePropType;
  title?: string;
  subTitle?: string;
  style?: StyleProp<TextStyle>;
}

class ContactCard extends Component<ContactCardProps> {
  render() {
    return (
      <CardWrapper onPress={this.props.onClick}>
        <CardContainer>
          <LeftContainer>
            <ContactAvatar source={this.props.img} />
          </LeftContainer>
          <RightContainer>
            <MainTitle>{this.props.title}</MainTitle>
            <SubTitle>{this.props.subTitle}</SubTitle>
          </RightContainer>
        </CardContainer>
      </CardWrapper>
    );
  }
}
export default ContactCard;

const CardWrapper = styled(TouchableOpacity)`
  width: 100%;
`;
const CardContainer = styled(View)`
  display: flex;
  flex-direction: row;
  height: 80px;
  overflow: hidden;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const RightContainer = styled.View`
  margin-left: 20px;
  align-self: center;
`;

const LeftContainer = styled.View`
  margin-left: 20px;
  align-self: center;
`;

export const ContactAvatar = styled(Thumbnail)`
  height: 100%;
  width: 80px;
  overflow: hidden;
  border-radius: 50px;
`;

const MainTitle = styled(Text)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.textColor};
  font-size: 17px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1.4px;
`;

const SubTitle = styled(Text)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.lightTextColor};
  letter-spacing: 1.4px;
`;
