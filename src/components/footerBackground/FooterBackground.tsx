import React, { Component } from "react";
import styled from "styled-components/native";

class FooterBackground extends Component {
  render() {
    return (
      <BackgroundImage
        source={require("../../assets/img/footer-Bg.png")}
        resizeMode="contain"
      />
    );
  }
}
export default FooterBackground;

const BackgroundImage = styled.Image`
  width: 100%;
  height: 421px;
  opacity: 0.5;
  position: absolute;
  bottom: -60px;
`;
