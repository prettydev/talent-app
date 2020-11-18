import { gql } from "apollo-boost";

export const GET_USER = gql`
  query getUser($id: String!) {
    user(id: $id) {
      name
      id
      talentCategory
    }
  }
`;

export const GET_HOME_PAGE_DATA = gql`
  query getHomePageData {
    songs {
      id
      title
      url
      img
      genre
      author {
        id
        name
      }
      createdAt
      updatedAt
    }
    blogs {
      id
      title
      image
    }
    genre {
      id
      name
      image
      title
    }
    producers: users(
      sort: { direction: asc, field: name }
      filters: { talentCategory: producer }
      limit: 3
    ) {
      name
      id
      avatar
      talentCategory
      description
    }
    musicians: users(
      sort: { direction: asc, field: name }
      filters: { talentCategory: musician }
      limit: 3
    ) {
      name
      id
      avatar
      talentCategory
      description
      songs {
        id
        title
        url
        img
      }
    }
  }
`;

export const GET_BLOG_PAGE_DATA = gql`
  query getBlogPageData {
    blogs {
      id
      title
      image
    }
  }
`;

export const GET_ARTICLE_PAGE_DATA = gql`
  query getArticlePageData($id: String!) {
    blog(id: $id) {
      id
      title
      content
      category
    }
  }
`;

export const GET_FAVOURITES_OF_USER = gql`
  query getFavourites($id: String!) {
    user(id: $id) {
      favourites {
        users {
          id
          name
          avatar
        }
        songs {
          id
          title
          url
          img
          genre
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_PROFILE_OF_USER = gql`
  query getProfile($id: String!) {
    user(id: $id) {
      name
      avatar
      description
      favourites {
        users {
          id
          name
          avatar
        }
        songs {
          id
          title
          url
          img
          genre
          createdAt
          updatedAt
        }
      }
      connections {
        id
        name
        avatar
      }
      songs {
        id
        title
        url
        img
        genre
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_STUDIOS = gql`
  query getStudios {
    studios(approved: true) {
      name
      id
      description
      website
      telephone
      address {
        country
      }
      coordinates {
        lat
        long
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($userId: String!, $receiverId: String!) {
    messages(
      sort: { direction: desc, field: createdAt }
      userId: $userId
      receiverId: $receiverId
    ) {
      user {
        id
        name
        avatar
      }
      id
      createdAt
      text
      image
      video
    }
  }
`;

export const GET_GENRE = gql`
  query getGenre {
    genre {
      id
      name
      title
      image
    }
  }
`;

export const GET_DATA_FOR_ARTIST_PAGE = gql`
  query getDataForArtistPage($artistId: String!, $id: String!) {
    user(id: $id) {
      favourites {
        users {
          id
        }
      }
    }
    artist(id: $artistId) {
      name
      avatar
      description
      talentCategory
      songs {
        id
        title
        url
        img
      }
    }
  }
`;
export const GET_USERS = gql`
  query getAllUser {
    users(limit: 10) {
      name
      id
      avatar
      talentCategory
      description
    }
  }
`;
export const GET_SONGS_BY_GENRE = gql`
  query songsByGenre($genre: String!) {
    songsByGenre(genre: $genre) {
      id
      title
      url
      img
      genre
      author {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;
