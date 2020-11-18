import React from "react";
import styled from "styled-components/native";
import { StyleSheet, Text } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const capitalize = (input: string = "") => {
  const _input = [...input];
  if (_input[0]) _input[0] = _input[0].toUpperCase();

  return _input;
};

const InputWrapper = styled.View`
  width: 85%;
  margin: 16px 10px;
`;

const InputField = styled.TextInput`
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  height: 55px;
  background-color: rgba(255, 255, 255, 0.25);
  align-self: center;
  color: white;
  padding-left: 20px;
  border-radius: 14px;
  border-width: 1px;
`;

const Input = (props: any) => {
  return (
    <InputWrapper>
      <InputField
        {...props}
        style={{ borderColor: props.errors ? "#ff6961" : "transparent" }}
      />
      {props.errors && (
        <FontAwesomeIcon
          style={styles.exclamation}
          name="exclamation-circle"
          size={24}
          color="#ff6961"
        />
      )}
      {props.errors && (
        <Text style={styles.error}>{capitalize(props.errors)}</Text>
      )}
    </InputWrapper>
  );
};

const styles = StyleSheet.create({
  exclamation: {
    position: "absolute",
    margin: 15.5,
    top: 0,
    right: 0,
  },
  error: {
    position: "absolute",
    top: 0,
    left: 18,
    height: 20,
    fontSize: 16,
    lineHeight: 20,
    transform: [{ translateY: -20 - 4 }],
    color: "#ff6961",
  },
});

export default Input;
