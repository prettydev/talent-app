import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

interface RadioButtonProps {
  options: any;
  onChange: (value: any) => void;
  value: any;
}

export default class RadioButton extends Component<RadioButtonProps> {
  state = {
    value: this.props.value,
  };

  render() {
    const { options } = this.props;
    const { value } = this.state;

    return (
      <View>
        {options.map((res: any) => {
          return (
            <RadioItemContainer
              key={res.key}
              onPress={() => {
                this.setState({
                  value: res.key,
                });
                this.props.onChange(res.key);
              }}
            >
              <RadioItemText>{res.text}</RadioItemText>
              <RadioCircle
                onPress={() => {
                  this.setState({
                    value: res.key,
                  });
                }}
              >
                {value === res.key && <SelectedRb />}
              </RadioCircle>
            </RadioItemContainer>
          );
        })}
      </View>
    );
  }
}

const RadioItemContainer = styled.TouchableOpacity`
  width: 85%;
  height: 55px;
  background-color: rgba(255, 255, 255, 0.25);
  align-self: center;
  margin: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RadioItemText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

const RadioCircle = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 100px;
  border-width: 2px;
  border-color: #3aa8a5;
  align-items: center;
  justify-content: center;
`;

const SelectedRb = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background-color: #3aa8a5;
`;
