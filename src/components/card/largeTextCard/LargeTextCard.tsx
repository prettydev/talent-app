import React from "react";
import styled from "styled-components/native";
import { Card, CardItem, Text, Left } from "native-base";
import {
  TouchableOpacity,
  ImageSourcePropType,
  TextStyle,
  StyleProp,
} from "react-native";

interface LargeTextCardProps {
  onClick: () => void;
  id?: string;
  img: ImageSourcePropType;
  title?: string;
  description?: string;
  designation?: string;
  style?: StyleProp<TextStyle>;
}

const LargeTextCard = (props: LargeTextCardProps) => {
  return (
    <TouchableOpacity onPress={props.onClick} style={props.style}>
      <CardContainer>
        <HeaderImage source={props.img} />

        {props.title !== "" && (
          <Shape>
            <Rectangle>
              <ShapeTitle>{props.title}</ShapeTitle>
            </Rectangle>
            <Triangle />
          </Shape>
        )}

        {props.designation && (
          <TalentIconContainer>
            <Left>
              <TalentIcon
                source={require("../../../assets/img/talent-icon.png")}
              />
              <IconText>{props.designation}</IconText>
            </Left>
          </TalentIconContainer>
        )}
        {props.description && (
          <BottomTextContainer>
            <BottomText>{props.description}</BottomText>
          </BottomTextContainer>
        )}
      </CardContainer>
    </TouchableOpacity>
  );
};

export default LargeTextCard;

const CardContainer = styled(Card)`
  border-radius: 20px;
  overflow: hidden;
`;

const HeaderImage = styled.Image`
  height: 200px;
  width: 100%;
  overflow: hidden;
`;

const TalentIconContainer = styled(CardItem)``;

const TalentIcon = styled.Image`
  height: 20px;
  width: 20px;
`;

const IconText = styled(Text)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.textColor};
`;

const BottomTextContainer = styled(CardItem)`
  padding-top: 10px;
  padding-bottom: 25px;
`;

const BottomText = styled(Text)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.textColor};
`;

const Triangle = styled.View`
  background-color: transparent;
  border-style: solid;
  border-left-width: 17.2px;
  border-right-width: 17.2px;
  border-bottom-width: 35px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
  position: relative;
`;

const Rectangle = styled.View`
  display: flex;
  height: 35px;
  width: 70%;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
`;

const Shape = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 38%;
`;

const ShapeTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;
