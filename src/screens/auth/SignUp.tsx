// SignUp.js
import React, { useState } from "react";
import { View } from "react-native";
import { Navigation } from "react-native-navigation";

import {
  Step,
  Steps,
  Wizard,
  WizardNext,
  WizardPrev,
} from "../../utils/wizard";
import styled from "styled-components/native";
import { RoundedButton } from "../../components/button/RoundedButton";
import { auth0 } from "./config";
import Config from "react-native-config";
import {
  AllowedProfiles,
  AllowedTalentCategories,
  useCreateUserMutation,
} from "../../generated/types-and-hooks";
import { Formik } from "formik";
import * as yup from "yup";
import RadioButton from "./RadioButton";
import TalentCategoryPicker from "./TalentCategoryPicker";
import Input from "../../components/Input";

interface SignUpProps {
  componentId: string;
}

const signUpSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  allowedProfile: yup.string().required(),
  allowedTalentCategory: yup.string().required(),
});

const SignUp = (props: SignUpProps) => {
  const [createUser, { data }] = useCreateUserMutation();
  const [error, setError] = useState("");

  const navigateToLogin = () => {
    Navigation.push(props.componentId, {
      component: {
        name: "SignIn",
        passProps: {},
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });
  };

  const signUp = async (
    username: string,
    email: string,
    password: string,
    allowedProfile: AllowedProfiles,
    allowedTalentCategory: AllowedTalentCategories
  ) => {
    try {
      const newUser = await auth0.auth.createUser({
        email,
        username,
        password,
        connection: Config.REALM_CONNECTION,
      });

      createUser({
        variables: {
          id: newUser.Id,
          name: username,
          talentCategory: allowedTalentCategory,
          profileType: allowedProfile,
        },
      });

      navigateToLogin();
    } catch (err) {
      setError(err.message);
      throw new Error(`ERROR Creating User: ${err}`);
    }
  };

  // Key represents the AllowedProfiles in the API
  const allowedProfileOptions = [
    {
      key: AllowedProfiles.Talent,
      text: "Künstlerprofil",
    },
    {
      key: AllowedProfiles.Business,
      text: "Businessprofil",
    },
  ];

  const allowedTalentCategoryOptions = [
    {
      key: AllowedTalentCategories.Musician,
      text: "Musician",
    },
    {
      key: AllowedTalentCategories.Photographer,
      text: "Photographer",
    },
    {
      key: AllowedTalentCategories.Producer,
      text: "Producer",
    },
    {
      key: AllowedTalentCategories.Studio,
      text: "Studio",
    },
    {
      key: AllowedTalentCategories.Videographer,
      text: "Videographer",
    },
  ];

  return (
    <Wrapper source={require("../../assets/img/auth-bg.png")}>
      <Container>
        <Wizard>
          <PreviousButtonContainer>
            <WizardPrev />
          </PreviousButtonContainer>
          <WizardContainer>
            <TalentLogo source={require("../../assets/img/talent-logo.png")} />
            <Title>Registrierung</Title>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                allowedProfile: AllowedProfiles.Talent,
                allowedTalentCategory: AllowedTalentCategories.Musician,
              }}
              validationSchema={signUpSchema}
              onSubmit={(values) => {
                signUp(
                  values.username,
                  values.email,
                  values.password,
                  values.allowedProfile,
                  values.allowedTalentCategory
                );
              }}
            >
              {(formikProps) => (
                <View style={{ width: "100%" }}>
                  <Steps>
                    <Step>
                      <View>
                        <TextDesc>
                          Werde kostenfrei Teil der {"\n"} Talent Community
                        </TextDesc>
                        {!!error && <ErrorText>{error}</ErrorText>}
                        <Input
                          placeholder="Username"
                          autoCapitalize="none"
                          placeholderTextColor="white"
                          onChangeText={formikProps.handleChange("username")}
                          value={formikProps.values.username}
                          errors={formikProps.errors.username}
                        />
                        <Input
                          placeholder="Email"
                          autoCapitalize="none"
                          placeholderTextColor="white"
                          onChangeText={formikProps.handleChange("email")}
                          value={formikProps.values.email}
                          errors={formikProps.errors.email}
                        />
                        <Input
                          placeholder="Password"
                          secureTextEntry={true}
                          autoCapitalize="none"
                          placeholderTextColor="white"
                          onChangeText={formikProps.handleChange("password")}
                          value={formikProps.values.password}
                          errors={formikProps.errors.password}
                        />
                        <WizardNext />
                        <TextLink onPress={navigateToLogin}>
                          oder anmelden…
                        </TextLink>
                      </View>
                    </Step>
                    <Step>
                      <View>
                        <TextDesc>
                          Bist du ein Künstler oder bist du eine {"\n"} Person
                          aus der Industrie?
                        </TextDesc>
                        <RadioButton
                          options={allowedProfileOptions}
                          onChange={formikProps.handleChange("allowedProfile")}
                          value={formikProps.values.allowedProfile}
                        />

                        <WizardNext />
                      </View>
                    </Step>
                    <Step>
                      <View>
                        <TextDesc>
                          Verrate uns welches Talent in dir steckt und {"\n"}{" "}
                          lege dein Profil an.
                        </TextDesc>
                        <TalentCategoryPicker
                          options={allowedTalentCategoryOptions}
                          onChange={formikProps.handleChange(
                            "allowedTalentCategory"
                          )}
                          value={formikProps.values.allowedTalentCategory}
                        />
                        <TextDesc>
                          *gehe zurück und wähle das Businessprofil wenn du eine
                          Person aus der Industrie bist z.B. A&R´s, Booker oder
                          Tourmanager…
                        </TextDesc>
                        <RoundedButton
                          text="Registrieren"
                          handleOnPress={formikProps.handleSubmit}
                        />
                      </View>
                    </Step>
                  </Steps>
                </View>
              )}
            </Formik>
          </WizardContainer>
        </Wizard>
      </Container>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const WizardContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PreviousButtonContainer = styled.View`
  justify-content: flex-start;
  padding: 5px;
  margin: 15px;
`;

const TalentLogo = styled.Image`
  margin-bottom: 30px;
  margin-top: -60px;
  width: 191px;
  height: 56px;
`;

const ErrorText = styled.Text`
  color: #ff6961;
  font-size: 18px;
  text-align: center;
  text-decoration: underline;
`;

const TextLink = styled.Text`
  color: #c9c9c9;
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
