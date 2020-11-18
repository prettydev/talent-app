import React from "react";
import { View, StyleProp, TextStyle, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { Picker } from "native-base";

interface TalentCategoryPickerProps {
  options: any;
  onChange: (value: any) => void;
  value: any;
  pickerStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const TalentCategoryPicker = (props: TalentCategoryPickerProps) => (
  <TalentCategory style={props.style}>
    <Picker
      mode="dialog"
      placeholder="Mein Talent"
      placeholderStyle={props.placeholderStyle || { color: "#ffffff" }}
      style={props.pickerStyle || { color: "#ffffff" }}
      selectedValue={props.value}
      onValueChange={(value: any) => {
        props.onChange(value);
      }}
    >
      {props.options.map((res: any) => {
        return <Picker.Item label={res.text} value={res.key} key={res.key} />;
      })}
    </Picker>
  </TalentCategory>
);
export default TalentCategoryPicker;

const TalentCategory = styled(View)`
  width: 85%;
  font-size: 18px;
  height: 55px;
  font-weight: 700;
  color: white;
  background-color: rgba(255, 255, 255, 0.25);
  align-self: center;
  margin: 10px;
  padding-left: 15px;
  border-radius: 14px;
`;
