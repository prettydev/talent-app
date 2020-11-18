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

const logout = async () => {
  try {
    await SInfo.deleteItem("ACCESS_TOKEN", {});
    startLogin();
  } catch (err) {
    throw new Error(`ERROR in Log Out Function: ${err}`);
  }
};
const renderMenuList1 = (componentId) => {
  const handlePersonal = () =>
    Navigation.push(componentId, {
      component: {
        name: "ProfileInformation",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  const handleSecurity = () =>
    Navigation.push(componentId, {
      component: {
        name: "SecuritySettings",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  const handlePrivacy = () =>
    Navigation.push(componentId, {
      component: {
        name: "PrivacySettings",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  const handleNotifications = () =>
    Navigation.push(componentId, {
      component: {
        name: "NotificationSettings",
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  return (
    <>
      <MenuContainer onPress={handlePersonal}>
        <MenuIcon>
          <AntDesign name="user" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Personal Information</MenuText>
      </MenuContainer>

      <MenuContainer onPress={handleNotifications}>
        <MenuIcon>
          <AntDesign name="bells" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Notifications</MenuText>
      </MenuContainer>

      <MenuContainer onPress={handleSecurity}>
        <MenuIcon>
          <FeatherIcon name="shield" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Security</MenuText>
      </MenuContainer>

      <MenuContainer onPress={handlePrivacy}>
        <MenuIcon>
          <FeatherIcon name="lock" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Privacy</MenuText>
      </MenuContainer>

      {/* <MenuContainer>
        <MenuIcon>
          <MaterialCommunityIcons name="web" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Sprache</MenuText>
      </MenuContainer>

      <MenuContainer>
        <MenuIcon>
          <AntDesign name="link" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Soziale Medien</MenuText>
      </MenuContainer> */}
    </>
  );
};

const renderMenuList2 = () => {
  return (
    <>
      <MenuContainer>
        <MenuIcon>
          <FeatherIcon name="headphones" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Persönliche Informationen</MenuText>
      </MenuContainer>

      <MenuContainer>
        <MenuIcon>
          <MaterialCommunityIcons
            name="playlist-music-outline"
            size={20}
            color="#3AA8A5"
          />
        </MenuIcon>
        <MenuText>Benachrichtigungen</MenuText>
      </MenuContainer>

      <MenuContainer>
        <MenuIcon>
          <AntDesign name="sound" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Sicherheit</MenuText>
      </MenuContainer>

      <MenuContainer>
        <MenuIcon>
          <Entypo name="sound-mix" size={20} color="#3AA8A5" />
        </MenuIcon>
        <MenuText>Privatsphäre</MenuText>
      </MenuContainer>
    </>
  );
};
const Settings = (props: SettingsProps) => {
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
          <Right>
            <FeatherIcon
              name="log-out"
              size={40}
              color="#3AA8A5"
              style={{ marginRight: 20 }}
              onPress={logout}
            />
          </Right>
        </Header>
        <HeaderBackground />
        <HeaderTitle title="Settings" />

        <SettingsContent>
          <MainTitle title="Account Settings" />
          {renderMenuList1(props.componentId)}
          {/* <Divider />
          <MainTitle title="musikeinstellungen" />
          {renderMenuList2()} */}
        </SettingsContent>
      </SettingsContainer>
    </ScreenLayout>
  );
};
export default Settings;

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

const MenuContainer = styled.TouchableOpacity`
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

export const Divider = styled(View)`
  border-bottom-width: 2px;
  color: ${(props) => props.theme.textColor};
  margin-top: 15px;
  opacity: 0.1;
`;
