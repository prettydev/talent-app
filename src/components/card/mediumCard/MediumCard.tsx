import React, { Component } from "react";
import styled from "styled-components/native";
import { Card } from "native-base";
import {
  ImageSourcePropType,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Dimensions,
} from "react-native";

interface MediumCardProps {
  img: ImageSourcePropType;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onClick?: () => void;
}
class MediumCard extends Component<MediumCardProps> {
  render() {
    return (
      <CardContainer style={this.props.style}>
        <TouchableOpacity onPress={this.props.onClick}>
          <HeaderImage source={this.props.img} />
          {this.props.title && (
            <Shape>
              <Rectangle>
                <ShapeTitle>{this.props.title}</ShapeTitle>
              </Rectangle>
              <Triangle />
            </Shape>
          )}
        </TouchableOpacity>
      </CardContainer>
    );
  }
}
export default MediumCard;

const CardContainer = styled(Card)`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  height: 108px;
  width: ${Math.floor(Dimensions.get("window").width / 2.25)}px;
`;

const HeaderImage = styled.Image`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Triangle = styled.View`
  background-color: transparent;
  border-style: solid;
  border-left-width: 12.6px;
  border-right-width: 12.6px;
  border-bottom-width: 25px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
  position: relative;
`;

const Rectangle = styled.View`
  display: flex;
  height: 25px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
`;

const Shape = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 10px;
`;

const ShapeTitle = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 700;
`;
