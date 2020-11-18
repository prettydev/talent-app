import React, { useEffect } from "react";
import ImagePicker from "react-native-image-picker";
import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useUpdateUserMutation } from "../../src/generated/types-and-hooks";
import useS3Aws from "../hooks/s3Aws";
import Loader from "../components/loader/Loader";

const UploadImage = (props: any) => {
  // console.log("PROPS", props);
  const [updateUser, { data }] = useUpdateUserMutation();
  const [isLoading, uploadedUrl, handleUpload] = useS3Aws();

  useEffect(() => {
    if (uploadedUrl) handleUpdateUser();
  }, [uploadedUrl]);

  const chooseImage = async () => {
    const options = {
      title: "Upload Prescription",
      takePhotoButtonTitle: "Take a Photo",
      chooseFromLibraryButtonTitle: "Select From Gallery",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        // console.log("User cancelled image picker");
      } else if (response.error) {
        // console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // console.log("User tapped custom button: ", response.customButton);
        // console.log(response.customButton);
      } else {
        // console.log(response.uri);
        const file = {
          uri: response.uri,
          name: response.fileName || response.uri.split("/").reverse()[0],
          type: "image/jpeg",
        };
        props.setImageFile?.(file);
        if (!props.preventUpload) handleUpload(file, "photos");
      }
    });
  };

  const handleUpdateUser = () => {
    // console.log("uploaded url",uploadedUrl)
    updateUser({
      variables: {
        input: {
          avatar: uploadedUrl,
        },
        id: props.userId,
      },
    });
    props.setImage(uploadedUrl);
  };

  return (
    <>
      {isLoading ? <Loader animationType="fade" modalVisible={true} /> : null}
      {props.song === "song" ? (
        <TextField numberOfLines={1} onPress={() => chooseImage()}>
          {props.valueLabel || "Upload Image"}
        </TextField>
      ) : (
        <Touchable onPress={() => chooseImage()}>
          <MaterialCommunityIcons
            name="pencil-circle-outline"
            size={40}
            color="#3AA8A5"
          />
        </Touchable>
      )}
    </>
  );
};
export default UploadImage;

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
const Touchable = styled.TouchableOpacity`
  position: absolute;
  top: 100px;
  right: 120px;
`;
