import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Keyboard, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

interface SearchBarProps {
  handelSearch: any;
  style?: StyleProp<ViewStyle>;
}

export default (props: SearchBarProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const search = async () => {
    if (searchText !== "") {
      setIsSearching(true);
      Keyboard.dismiss();
      props.handelSearch(true, searchText);
    }
  };

  const clear = () => {
    setIsSearching(false);
    setSearchText("");

    props.onBlur?.(false, "");
    props.handelSearch?.(false, "");
  };

  const handleBlur = () => props.onBlur?.(isSearching, searchText);

  const handleSearchTextInputFocus = () => {
    setIsSearching(true);
  };

  const handleChange = (text: string) => {
    setIsSearching(!!text);
    setSearchText(text);
  };

  return (
    <SearchBarContainer style={props.style}>
      <InnerSearchBar>
        {!isSearching && (
          <SearchIcon
            name="ios-search"
            size={20}
            color="#919191"
            onPress={search}
          />
        )}
        {isSearching && (
          <SearchIcon
            name="md-close"
            size={20}
            color="#919191"
            onPress={clear}
          />
        )}

        <SearchTextInput
          placeholder="Suche"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#3aa8a5"
          value={searchText}
          onChangeText={handleChange}
          onFocus={handleSearchTextInputFocus}
          onBlur={handleBlur}
        />
      </InnerSearchBar>
      {props.children}
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: pink;
  justify-content: space-between;
`;

const InnerSearchBar = styled.View`
  flex: 1;
  border-width: 2px;
  border-color: #3aa8a5;
  background-color: #ffffff;
  border-radius: 8px;
  height: 50px;
  margin-left: 21px;
  margin-right: 21px;
`;

const SearchTextInput = styled.TextInput`
  display: flex;
  flex: 1;
  margin-left: 20px;
  color: black;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  right: 10px;
  top: 3px;
  color: #3aa8a5;
  z-index: 10;
  padding: 10px;
`;
