import { gql } from "apollo-boost";

export const SUBSCRIBE_TO_MESSAGES = gql`
  subscription newMessage($userId: String!) {
    newMessage(userId: $userId) {
      id
      user {
        name
        id
        avatar
      }
      receiver {
        name
        id
        avatar
      }
      text
      image
      video
      createdAt
    }
  }
`;
