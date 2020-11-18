import React, { useState, useEffect } from "react";
import S3 from "aws-sdk/clients/s3";
import { Platform } from "react-native";
import { decode } from "base64-arraybuffer";
import RNFetchBlob from "react-native-fetch-blob";

const useS3Aws = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = (file: any, s3FolderPath: string) =>
    new Promise(async (res, rej) => {
      setIsLoading(true);

      if (Platform.OS === "ios") file.uri = file.uri.replace("file:", "");
      try {
        const s3bucket = new S3({
          accessKeyId: "AKIAQ327Q42Y2RSVRXIL",
          secretAccessKey: "avyNhThX1Dq1TM3bzrZ7BwIKlKcuSKZU30OSW9Ly",
          signatureVersion: "v4",
        });
        const contentType = file.type;
        // const contentDeposition = "inline;filename="" + file.name + """;
        const contentDeposition = `inline;filename="${file.name}"`;
        const base64 = await RNFetchBlob.fs.readFile(file.uri, "base64");
        const arrayBuffer = decode(base64);
        const key = `${s3FolderPath}/${file.name}`;

        s3bucket.createBucket(() => {
          const params = {
            Bucket: "de-talent-app",
            Key: key,
            Body: arrayBuffer,
            ContentDisposition: contentDeposition,
            ContentType: contentType,
          };
          s3bucket.upload(params, (err: any, bucketData: any) => {
            if (err) {
              // console.log("error in callback", err);
            }
            // console.log("ff",bucketData.Location);
            setUploadedUrl(String(bucketData.Location));
            setIsLoading(false);
            res(String(bucketData.Location));
          });
        });
      } catch (error) {
        setIsLoading(false);
        rej();
      }
    });

  return [
    isLoading,
    uploadedUrl,
    (file: any, s3FolderPath: string) => handleUpload(file, s3FolderPath),
  ] as const;
};

export default useS3Aws;
