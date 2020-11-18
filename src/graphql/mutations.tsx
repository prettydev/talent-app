import { gql } from "apollo-boost";

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $talentCategory: AllowedTalentCategories!
    $profileType: AllowedProfiles!
    $id: ID!
  ) {
    createUser(
      input: {
        id: $id
        name: $name
        talentCategory: $talentCategory
        profileType: $profileType
      }
    ) {
      name
      id
      talentCategory
      avatar
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage(
    $text: String!
    $image: String
    $video: String
    $user: ChatUserInput!
    $receiver: ChatUserInput!
  ) {
    createMessage(
      input: {
        text: $text
        image: $image
        video: $video
        user: $user
        receiver: $receiver
      }
    ) {
      id
      text
      image
      createdAt
      video
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!, $id: String!) {
    updateUser(input: $input, id: $id) {
      name
      id
      talentCategory
      avatar
      description
    }
  }
`;

export const CREATE_SONG = gql`
  mutation createSong($input: CreateSongInput!) {
    createSong(input: $input) {
      id
      title
      url
      img
      genre
    }
  }
`;

export const SEARCH_DATA = gql`
  mutation searchData($searchText: String!) {
    search(searchText: $searchText) {
      songs {
        id
        title
        url
        img
        genre
      }
      users {
        id
        name
        avatar
        talentCategory
      }
      blogs {
        id
        title
        image
      }
    }
  }
`;

export const SEARCH_USER = gql`
  mutation searchUser($searchText: String!) {
    searchUser(searchText: $searchText) {
      id
      name
      avatar
      talentCategory
    }
  }
`;

export const UPDATE_USER_FAVOURITES = gql`
  mutation updateUserFavourites($input: UpdateUserInput!, $id: String!) {
    updateUserFavourites(input: $input, id: $id) {
      id
      name
      favourites {
        users {
          id
          name
        }
        songs {
          id
          title
        }
      }
    }
  }
`;
