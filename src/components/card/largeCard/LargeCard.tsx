import React, { Component } from "react";
import { Card } from "native-base";
import styled from "styled-components/native";
import {
  ImageSourcePropType,
  TextStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";

interface LargeCardProps {
  img: ImageSourcePropType;
  title?: string;
  style?: StyleProp<TextStyle>;
  smallHeight?: boolean;
  onClick: () => void;
}

class LargeCard extends Component<LargeCardProps> {
  render() {
    return (
      <CardContainer style={this.props.style}>
        <TouchableOpacity onPress={this.props.onClick}>
          <HeaderImage
            source={this.props.img}
            smallHeight={this.props.smallHeight || false}
          />

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
export default LargeCard;

const CardContainer = styled(Card)`
  border-radius: 20px;
  overflow: hidden;
`;

const HeaderImage = styled.Image<{ smallHeight: boolean }>`
  height: ${(props) => (props.smallHeight ? "129px" : "200px")};
  width: 100%;
  overflow: hidden;
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
  bottom: 25px;
`;

const ShapeTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;
