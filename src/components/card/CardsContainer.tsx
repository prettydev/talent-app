import React, { Component } from "react";
import { StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";
import { View } from "native-base";

interface CardsContainerProps {
  style?: StyleProp<TextStyle>;
}

class CardsContainer extends Component<CardsContainerProps> {
  render() {
    return (
      <Container style={this.props.style}>{this.props.children}</Container>
    );
  }
}
export default CardsContainer;

const Container = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
