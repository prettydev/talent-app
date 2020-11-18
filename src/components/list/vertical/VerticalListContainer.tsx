import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

class VerticalListContainer extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}
export default VerticalListContainer;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
  },
  scrollView: {
    marginTop: 10,
  },
});
