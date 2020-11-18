import React, { useState } from "react";
import { View } from "native-base";
import styled, { withTheme } from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { RoundedButton } from "../components/button/RoundedButton";
import { Formik } from "formik";
import * as yup from "yup";
import DocumentPicker from "react-native-document-picker";
import UploadImage from "./UploadImage";
import {
  useCreateSongMutation,
  AllowedGenre,
} from "../../src/generated/types-and-hooks";
import Loader from "../components/loader/Loader";
import TalentCategoryPicker from "../screens/auth/TalentCategoryPicker";
import useS3Aws from "../hooks/s3Aws";
import Toast from "react-native-simple-toast";

const UploadSong = (props: any) => {
  // console.log("PPP111", props);
  const [createSong, { data, error }] = useCreateSongMutation();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState<AllowedGenre>(AllowedGenre.Electro);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [songFile, setSongFile] = useState({});
  const [isLoading, uploadedUrl, handleUpload] = useS3Aws();

  // const [genreList, setGenreList] = useState([])
  // console.log("DATa",data)
  // console.log("DATaAaaaa",props.userId)

  const allowedGenreOptions = [
    {
      key: AllowedGenre.Electro,
      text: "Electro",
    },
    {
      key: AllowedGenre.Hiphop,
      text: "Hiphop",
    },
    {
      key: AllowedGenre.Jazz,
      text: "Jazz",
    },
    {
      key: AllowedGenre.Rock,
      text: "Rock",
    },
    {
      key: AllowedGenre.Techno,
      text: "Techno",
    },
  ];

  const songUploadSchema = yup.object({
    title: yup.string().required(),
    url: yup.string().required(),
    genre: yup.string().required(),
  });

  const handleSong = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      // console.log("SONG",res)
      const file = {
        uri: res.uri,
        name: res.name,
        type: res.type,
      };

      setSongFile(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // console.log(err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleChange = (event: any, field: any) => {
    if (field === "title") setTitle(event);
    if (field === "genre") setGenre(event);
  };

  const handleSaveSong = async () => {
    const [songUrl, imageUrl] = await Promise.all([
      handleUpload(songFile, "music"),
      handleUpload(imageFile, "photos"),
    ]);

    createSong({
      variables: {
        input: {
          title,
          url: songUrl,
          img: image,
          genre,
          author: props.userId,
        },
      },
    });
  };

  if (data && data.createSong && data.createSong.id) {
    props.toggleModal();
    Toast.show("Song uploaded Successfully");
  }

  return (
    <Container>
      {isLoading ? <Loader animationType="fade" modalVisible={true} /> : null}
      <Wrapper onPress={() => props.toggleModal()}>
        <Icon name="md-close" size={30} color={"black"} />
      </Wrapper>
      <WizardContainer>
        <Title>Upload Song</Title>
        <Formik
          initialValues={{
            title: "",
            genre: AllowedGenre.Electro,
          }}
          validationSchema={songUploadSchema}
          onSubmit={(values) => {
            // console.log("fff", values);
          }}
        >
          {(formikProps) => (
            <View style={{ width: "100%" }}>
              <View>
                <InputField
                  placeholder="Title"
                  autoCapitalize="none"
                  placeholderTextColor="#2c2c2c"
                  onChangeText={(event) => handleChange(event, "title")}
                  value={title}
                />
                <TalentCategoryPicker
                  options={allowedGenreOptions}
                  onChange={formikProps.handleChange("genre")}
                  value={formikProps.values.genre}
                  pickerStyle={{ color: "#000000" }}
                  placeholderStyle={{ color: "#000000" }}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                />
                <TextField numberOfLines={1} onPress={handleSong}>
                  {songFile?.name || "Upload Music"}
                </TextField>
                <UploadImage
                  song="song"
                  image={image}
                  valueLabel={imageFile?.name || image}
                  preventUpload={true}
                  setLoading={setLoading}
                  setImage={setImage}
                  setImageFile={setImageFile}
                  {...formikProps}
                />
              </View>
              <RoundedButton text="Save" handleOnPress={handleSaveSong} />
            </View>
          )}
        </Formik>
      </WizardContainer>
    </Container>
  );
};
export default UploadSong;

const Wrapper = styled.TouchableOpacity`
  padding: 12px;
`;

const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0);
`;

const WizardContainer = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
`;

const InputField = styled.TextInput`
  width: 85%;
  font-size: 16px;
  font-weight: normal;
  height: 55px;
  background-color: rgba(0, 0, 0, 0.25);
  align-self: center;
  margin: 10px;
  color: #2c2c2c;
  padding-left: 20px;
  border-radius: 14px;
`;

const TextField = styled.Text`
  width: 85%;
  font-size: 16px;
  font-weight: normal;
  height: 55px;
  background-color: rgba(0, 0, 0, 0.25);
  align-self: center;
  margin: 10px;
  color: #2c2c2c;
  padding-left: 20px;
  padding-top: 14px;
  border-radius: 14px;
`;

const Title = styled.Text`
  letter-spacing: 3px;
  color: #3aa8a5;
  text-transform: uppercase;
  opacity: 1;
  width: 100%;
  margin-bottom: 5px;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
`;
