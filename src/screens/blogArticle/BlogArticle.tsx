import React, { Component } from "react";
import { View, Text, Dimensions, SafeAreaView } from "react-native";
import HTML from "react-native-render-html";
import styled from "styled-components/native";
import ScreenLayout from "../layout/ScreenLayout";
import HeaderBackground from "../../components/headerBackground/HeaderBackground";
import Header, { Left } from "../../components/header/Header";
import { TopHeaderTitle } from "../../components/title/Titles";
import { Content } from "native-base";
import { Navigation } from "react-native-navigation";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useGetArticlePageDataQuery } from "../../generated/types-and-hooks";
import Spinner from "../../components/spinner/Spinner";

interface BlogArticleProps {
  componentId: string;
  articleId: string;
}

const BlogArticle = (props: BlogArticleProps) => {
  const { data, error, loading } = useGetArticlePageDataQuery({
    variables: { id: props.articleId },
  });

  if (loading) return <Spinner />;
  if (error) return <Text>Error</Text>;
  if (!data) {
    throw new Error("Data Undefined");
  }

  return (
    <ScreenLayout componentId={props.componentId}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#DFF0F0" }} />
      <BlogArticleContainer
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
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
          <HeaderTitle title={data.blog.title} />
        </HeaderTitleContainer>

        <BlogArticleContent>
          <HTML
            html={data.blog.content}
            imagesMaxWidth={Dimensions.get("window").width}
          />
        </BlogArticleContent>
      </BlogArticleContainer>
    </ScreenLayout>
  );
};
export default BlogArticle;

const BlogArticleContainer = styled(SafeAreaView)`
  flex: 1;
  position: relative;
`;

const BlogArticleContent = styled(View)`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: -80px;
`;

const HeaderTitle = styled(TopHeaderTitle)`
  position: relative;
  max-width: 250px;
`;

const HeaderTitleContainer = styled(View)`
  align-self: center;
  position: absolute;
  top: 50px;
`;
