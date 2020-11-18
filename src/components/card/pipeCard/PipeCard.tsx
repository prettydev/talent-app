import React, { Component } from "react";
import styled from "styled-components/native";
import { Card, CardItem, Text, Left } from "native-base";
import {
  TouchableOpacity,
  ImageSourcePropType,
  TextStyle,
  StyleProp,
} from "react-native";

interface PipeCardProps {
  onClick?: () => void;
  img: ImageSourcePropType;
  title?: string;
  subTitle?: string;
  style?: StyleProp<TextStyle>;
}

class PipeCard extends Component<PipeCardProps> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onClick} style={this.props.style}>
        <CardContainer>
          <LeftContainer>
            <HeaderImage source={this.props.img} />
          </LeftContainer>
          <RightContainer>
            <MainTitle>{this.props.title}</MainTitle>
            {this.props.subTitle && <SubTitle>{this.props.subTitle}</SubTitle>}
          </RightContainer>
        </CardContainer>
      </TouchableOpacity>
    );
  }
}
export default PipeCard;

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: row;
  height: 85px;
  overflow: hidden;
  border-radius: 10px;
  justify-content: flex-start;
`;

const RightContainer = styled.View`
  margin-left: 20px;
  align-self: center;
`;

const LeftContainer = styled.View``;

const HeaderImage = styled.Image`
  height: 100%;
  width: 110px;
  overflow: hidden;
`;

const MainTitle = styled(Text)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.textColor};
  font-size: 17px;
  text-transform: uppercase;
`;

const SubTitle = styled(Text)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.lightTextColor};
`;
