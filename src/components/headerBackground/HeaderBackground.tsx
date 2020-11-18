import React, { Component } from "react";
import styled from "styled-components/native";

class HeaderBackground extends Component {
  render() {
    return (
      <BackgroundImage
        source={require("../../assets/img/header-bg.png")}
        resizeMode="contain"
      />
    );
  }
}
export default HeaderBackground;

const BackgroundImage = styled.Image`
  width: 100%;
  height: 300px;
  top: -60px;
`;
