// SignIn.js
import React, { useState } from "react";
import SInfo from "react-native-sensitive-info";
import Config from "react-native-config";
import { RoundedButton } from "../../components/button/RoundedButton";
import styled from "styled-components/native";
import { Navigation } from "react-native-navigation";
import { startMainApp } from "../../Nav";
import { auth0 } from "./config";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../components/Input";

interface SignInProps {
  componentId: string;
}

const signInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignIn = (props: SignInProps) => {
  const [error, setError] = useState("");
  const signIn = async (email: string, password: string) => {
    try {
      const result = await auth0.auth.passwordRealm({
        username: email,
        password,
        audience: Config.AUDIENCE_URL,
        scope: "openid offline_access",
        realm: Config.REALM_CONNECTION,
      });
      // console.log("Token", result.accessToken);
      await SInfo.setItem("ACCESS_TOKEN", result.accessToken, {});
      await SInfo.setItem(
        "REFRESH_TOKEN",
        result.refreshToken || "NO_REFRESH_TOKEN",
        {}
      );

      // get user info
      const userInfo = await auth0.auth.userInfo({ token: result.accessToken });
      startMainApp(userInfo);
    } catch (err) {
      setError(err.message);
      throw new Error(`ERROR Signing in User: ${err}`);
    }
  };

  return (
    <Wrapper source={require("../../assets/img/auth-bg.png")}>
      <Container>
        <TalentLogo source={require("../../assets/img/talent-logo.png")} />
        <Title>Anmelden</Title>
        <TextDesc>Werde kostenfrei Teil der {"\n"} Talent Community</TextDesc>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
          onSubmit={(values) => {
            signIn(values.email, values.password);
          }}
        >
          {(formikProps) => (
            <>
              {!!error && <ErrorText>{error}</ErrorText>}
              <Input
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="white"
                onChangeText={formikProps.handleChange("email")}
                value={formikProps.values.email}
                errors={formikProps.errors.email}
              />
              <Input
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                placeholderTextColor="white"
                onChangeText={formikProps.handleChange("password")}
                value={formikProps.values.password}
                errors={formikProps.errors.password}
              />
              <RoundedButton
                text="Anmelden"
                handleOnPress={formikProps.handleSubmit}
              />
            </>
          )}
        </Formik>

        <TextLink
          onPress={() => {
            Navigation.push(props.componentId, {
              component: {
                name: "SignUp",
                passProps: {},
                options: {
                  topBar: {
                    visible: false,
                  },
                },
              },
            });
          }}
        >
          oder registrieren…
        </TextLink>
      </Container>
    </Wrapper>
  );
};

export default SignIn;

const Wrapper = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TalentLogo = styled.Image`
  margin-bottom: 30px;
  margin-top: -60px;
  width: 191px;
  height: 56px;
`;

const TextLink = styled.Text`
  color: #c9c9c9;
  font-size: 18px;
  text-align: center;
  text-decoration: underline;
`;
const ErrorText = styled.Text`
  color: #ff6961;
  font-size: 18px;
  text-align: center;
  text-decoration: underline;
`;

const TextDesc = styled.Text`
  text-align: center;
  letter-spacing: 0px;
  color: #efefef;
  opacity: 1;
  font-size: 16px;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Title = styled.Text`
  letter-spacing: 3px;
  color: #3aa8a5;
  text-transform: uppercase;
  opacity: 1;
  margin-bottom: 5px;
  font-size: 35px;
  font-weight: 700;
`;
