import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../layout/ScreenLayout";
import HeaderBackground from "../../components/headerBackground/HeaderBackground";
import { TopHeaderTitle, BigTitle } from "../../components/title/Titles";
import LargeCard from "../../components/card/largeCard/LargeCard";
import { Content } from "native-base";
import CardsContainer from "../../components/card/CardsContainer";
import MediumCard from "../../components/card/mediumCard/MediumCard";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Header, { Left, Right } from "../../components/header/Header";
import { Navigation } from "react-native-navigation";
import {
  Blog as BlogType,
  useGetBlogPageDataQuery,
} from "../../generated/types-and-hooks";
import Loader from "../../components/loader/Loader";
import { DEFAULT_GENERAL } from "src/assets/img/default-images";

interface BlogProps {
  componentId: string;
}

const Blog = (props: BlogProps) => {
  const { data, error, loading, refetch } = useGetBlogPageDataQuery();

  if (loading) return <Loader animationType="fade" modalVisible={true} />;
  if (error) return <Text>Error</Text>;
  if (!data) {
    throw new Error("Data Undefined");
  }

  return (
    <ScreenLayout componentId={props.componentId}>
      <BlogContainer
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <Header>
          <Left>
            <FontAwesome5Icon
              name="chevron-left"
              size={40}
              color="#3AA8A5"
              onPress={() => Navigation.pop(props.componentId)}
              light={true}
            />
          </Left>
        </Header>
        <HeaderBackground />
        <HeaderTitleContainer>
          <HeaderTitle title="Blogbeiträge" />
        </HeaderTitleContainer>

        <BlogContent>
          <MainTitle title="Beliebte Blogs" />
          {data.blogs.map((blog: Pick<BlogType, "id" | "title" | "image">) => (
            <LargeCard
              key={blog.id}
              smallHeight={true}
              img={blog.image ? { uri: blog.image } : DEFAULT_GENERAL}
              title={blog.title}
              onClick={() => {
                Navigation.push(props.componentId, {
                  component: {
                    name: "BlogArticle",
                    passProps: { articleId: blog.id },
                    options: {
                      topBar: {
                        visible: false,
                      },
                    },
                  },
                });
              }}
            />
          ))}
          {/* TODO: display blogs category wise */}
          {/* <MainTitle title="Blogs über Lorem Ipsum" />
          <CardsContainer>
            <MediumCard img={require("../../assets/img/img(35).png")} />
            <MediumCard img={require("../../assets/img/img(40).png")} />
          </CardsContainer> */}
        </BlogContent>
      </BlogContainer>
    </ScreenLayout>
  );
};
export default Blog;

const BlogContainer = styled(ScrollView)`
  flex: 1;
  position: relative;
`;

const BlogContent = styled(View)`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: -90px;
`;

const HeaderTitle = styled(TopHeaderTitle)`
  position: relative;
  max-width: 250px;
`;

const HeaderTitleContainer = styled(View)`
  align-self: center;
  position: absolute;
  top: 80px;
`;

const MainTitle = styled(BigTitle)`
  padding-top: 30px;
  padding-bottom: 10px;
`;
