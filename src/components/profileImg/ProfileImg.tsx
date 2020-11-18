import React, { Component } from "react";
import { ImageSourcePropType, TextStyle, StyleProp } from "react-native";
import styled from "styled-components/native";
import { Thumbnail, View } from "native-base";

interface ProfileImgProps {
  img: ImageSourcePropType;
  style?: StyleProp<TextStyle>;
}

class ProfileImg extends Component<ProfileImgProps> {
  render() {
    return (
      <View style={this.props.style}>
        <ProfileImage large={true} source={this.props.img} />
      </View>
    );
  }
}
export default ProfileImg;

const ProfileImage = styled(Thumbnail)`
  height: 154px;
  width: 154px;
  border-radius: 154px;
`;
