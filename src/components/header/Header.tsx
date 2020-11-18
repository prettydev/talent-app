import React, { Component } from "react";
import styled from "styled-components/native";

class Header extends Component {
  render() {
    return <HeaderContainer>{this.props.children}</HeaderContainer>;
  }
}
export default Header;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  z-index: 1;
  padding: 8px;
  position: absolute;
`;

export const Left = styled.View`
  flex: 1;
  align-items: flex-start;
  padding: 10px;
`;

export const Right = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
`;
