import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";

interface Screen2Props {
  componentId: string;
}

export default class Screen2 extends Component<Screen2Props> {
  static get options() {
    return {
      topBar: {
        title: {
          text: "Studios",
        },
      },
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Studios</Text>
        <Button
          onPress={() => Navigation.pop(this.props.componentId)}
          title="Go Back"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
