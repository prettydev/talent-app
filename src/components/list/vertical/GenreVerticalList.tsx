import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { Genre } from "src/generated/types-and-hooks";
import styled from "styled-components/native";

interface SmallCardProps {
  componentId: string;
  title?: string;
  data: GenereProps[];
}

interface GenereProps extends Pick<Genre, "id" | "name" | "title" | "image"> {}

const GenreVerticalList = (props: SmallCardProps) => {
  if (!props.data) {
    throw new Error("Data Undefined");
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {props.data.map((genre) => (
          <TouchableOpacity
            style={styles.card}
            key={genre.id}
            onPress={() => {
              Navigation.push(props.componentId, {
                component: {
                  name: "Songs",
                  passProps: { genre: genre.name },
                  options: {
                    topBar: {
                      visible: false,
                    },
                  },
                },
              });
            }}
          >
            <Image source={{ uri: genre.image || "" }} style={styles.image} />
            <Shape>
              <Rectangle>
                <ShapeTitle>{genre.title}</ShapeTitle>
              </Rectangle>
              <Triangle />
            </Shape>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default GenreVerticalList;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
  },
  scrollView: {
    marginTop: 10,
  },
  card: {
    marginRight: 10,
    marginLeft: 10,
    width: 109,
    flexDirection: "column",
    minHeight: 100,
  },
  image: {
    width: undefined,
    flex: 1,
    height: 100,
    borderRadius: 8,
    marginBottom: 7,
  },
});

const Triangle = styled.View`
  background-color: transparent;
  border-style: solid;
  border-left-width: 12.5px;
  border-right-width: 12.5px;
  border-bottom-width: 25px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
  position: relative;
`;

const Rectangle = styled.View`
  display: flex;
  height: 25px;
  width: 70%;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
`;

const Shape = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 70px;
`;

const ShapeTitle = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 700;
`;
