import React, { Component } from "react";
import styled from "styled-components/native";
import { Card } from "native-base";
import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

interface SmallCardProps {
  img: ImageSourcePropType;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onClick?: () => void;
}

export default class SmallCard extends Component<SmallCardProps> {
  render() {
    return (
      <CardContainer style={this.props.style}>
        <TouchableOpacity onPress={this.props.onClick}>
          <HeaderImage source={this.props.img} />
          {!!this.props.title && (
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

const CardContainer = styled(Card)`
  border-radius: 8px;
  overflow: hidden;
  height: 108px;
  width: 30%;
  margin: 5px;
`;

const HeaderImage = styled.Image`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Triangle = styled.View`
  background-color: transparent;
  border-style: solid;
  border-left-width: 12.1px;
  border-right-width: 12.1px;
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
  width: 70%;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
`;

const Shape = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 70px;
`;

const ShapeTitle = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 700;
`;
