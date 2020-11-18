import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";

interface TitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

export const BigTitle = (props: TitleProps) => {
  return <BigTitleText style={props.style}>{props.title}</BigTitleText>;
};

export const MediumTitle = (props: TitleProps) => {
  return <MediumTitleText style={props.style}>{props.title}</MediumTitleText>;
};

export const BoldTitle = (props: TitleProps) => {
  return <BoldTitleText style={props.style}>{props.title}</BoldTitleText>;
};

export const TopHeaderTitle = (props: TitleProps) => {
  return (
    <TopHeaderTitleText style={props.style}>{props.title}</TopHeaderTitleText>
  );
};

const BigTitleText = styled(Text)`
  text-align: left;
  font-size: 20px;
  letter-spacing: 1.8px;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.fontFamily};
  text-transform: uppercase;
  opacity: 1;
`;

const MediumTitleText = styled(Text)`
  text-align: left;
  font-size: 18px;
  letter-spacing: 1.8px;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.fontFamily};
  text-transform: none;
  opacity: 1;
`;

const BoldTitleText = styled(Text)`
  text-align: left;
  font-size: 22px;
  letter-spacing: 1.8px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.fontFamily};
  text-transform: uppercase;
  opacity: 1;
`;

const TopHeaderTitleText = styled(Text)`
  text-align: center;
  font-size: 25px;
  letter-spacing: 2px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.headerFontFamily};
  text-transform: uppercase;
  opacity: 1;
`;
