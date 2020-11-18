import React from "react";
import styled from "styled-components/native";
import ScreenLayout from "../layout/ScreenLayout";
import { View, Text } from "native-base";
import { Navigation } from "react-native-navigation";
import Header, { Left, Right } from "../../components/header/Header";
import HeaderBackground from "../../components/headerBackground/HeaderBackground";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native";
import { TopHeaderTitle, BigTitle } from "../../components/title/Titles";
import { startLogin } from "../../Nav";
import SInfo from "react-native-sensitive-info";

interface SettingsProps {
  componentId: string;
}

const Security = (props: SettingsProps) => {
  return (
    <ScreenLayout componentId={props.componentId} footer={false}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#DFF0F0" }} />
      <SettingsContainer>
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
        <HeaderTitle title="Security" />

        <SettingsContent>
          <ContentText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            accusamus, quae eligendi maxime odio quo quis excepturi animi
            voluptatem similique dignissimos cum voluptate autem. Eaque ipsum
            porro nam numquam repellendus vitae perferendis debitis expedita,
            tempora assumenda quam vero suscipit reiciendis architecto
            consectetur, eius impedit hic harum quod qui. Est exercitationem
            quis, nisi fuga dignissimos laudantium sit soluta quam accusamus
            error consequuntur eum debitis facere consectetur inventore cum eius
            dolor architecto quo? Facilis, velit? Quos, est nisi ad iusto saepe
            asperiores!
          </ContentText>
        </SettingsContent>
      </SettingsContainer>
    </ScreenLayout>
  );
};
export default Security;

const SettingsContainer = styled(SafeAreaView)`
  flex: 1;
`;

const SettingsContent = styled(View)`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: -110px;
  margin-bottom: 60px;
`;

const HeaderTitle = styled(TopHeaderTitle)`
  align-self: center;
  position: absolute;
  top: 80px;
`;

const MainTitle = styled(BigTitle)`
  padding-top: 30px;
  padding-bottom: 10px;
`;

const MenuContainer = styled.View`
  display: flex;
  flex-direction: row;

  padding: 8px;
`;

export const MenuIcon = styled.View`
  align-items: flex-start;
  margin-right: 10px;
`;

export const MenuText = styled(Text)`
  text-align: left;
  font-size: 16px;
  letter-spacing: 1.4px;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.headerFontFamily};
  opacity: 1;
`;

export const ContentText = styled(Text)`
  text-align: left;
  font-size: 16px;
  letter-spacing: 1.4px;
  color: ${(props) => props.theme.textColor};
  font-family: ${(props) => props.theme.headerFontFamily};
  opacity: 1;
`;

export const Divider = styled(View)`
  border-bottom-width: 2px;
  color: ${(props) => props.theme.textColor};
  margin-top: 15px;
  opacity: 0.1;
`;
