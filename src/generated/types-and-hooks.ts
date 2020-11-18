import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  users: User[];
  user: User;
  artist: Artist;
  videos: Video[];
  songs: Song[];
  songsByGenre: Song[];
  blogs: Blog[];
  blog: Blog;
  studios: Studio[];
  genre: Genre[];
  welcome: Scalars["String"];
  messages: Message[];
};

export type QueryUsersArgs = {
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  sort?: Maybe<SortInput[]>;
  filters?: Maybe<FilterInput>;
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type QueryArtistArgs = {
  id: Scalars["String"];
};

export type QuerySongsArgs = {
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QuerySongsByGenreArgs = {
  genre: Scalars["String"];
};

export type QueryBlogArgs = {
  id: Scalars["String"];
};

export type QueryStudiosArgs = {
  approved?: Maybe<Scalars["Boolean"]>;
};

export type QueryMessagesArgs = {
  receiverId: Scalars["String"];
  userId: Scalars["String"];
  sort?: Maybe<ChatSortInput[]>;
};

export type SortInput = {
  direction?: Maybe<SortDirections>;
  field?: Maybe<UserSortField>;
};

export enum SortDirections {
  Asc = "asc",
  Desc = "desc",
}

export enum UserSortField {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
}

export type FilterInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  talentCategory?: Maybe<AllowedTalentCategories>;
  profileType?: Maybe<AllowedProfiles>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export enum AllowedTalentCategories {
  Musician = "musician",
  Producer = "producer",
  Studio = "studio",
  Videographer = "videographer",
  Photographer = "photographer",
}

export enum AllowedProfiles {
  Talent = "talent",
  Business = "business",
}

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  interests?: Maybe<Song[]>;
  talentCategory: AllowedTalentCategories;
  profileType: AllowedProfiles;
  favourites?: Maybe<Favourites>;
  songs?: Maybe<Song[]>;
  connections?: Maybe<FavouriteUser[]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Song = {
  __typename?: "Song";
  id: Scalars["ID"];
  title: Scalars["String"];
  url: Scalars["String"];
  img?: Maybe<Scalars["String"]>;
  genre?: Maybe<AllowedGenre>;
  author: Artist;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export enum AllowedGenre {
  Hiphop = "hiphop",
  Jazz = "jazz",
  Techno = "techno",
  Rock = "rock",
  Electro = "electro",
}

export type Artist = {
  __typename?: "Artist";
  id: Scalars["ID"];
  name: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  talentCategory: AllowedTalentCategories;
  profileType: AllowedProfiles;
  songs?: Maybe<Song[]>;
};

export type Favourites = {
  __typename?: "Favourites";
  id: Scalars["ID"];
  users?: Maybe<FavouriteUser[]>;
  songs?: Maybe<Song[]>;
};

export type FavouriteUser = {
  __typename?: "FavouriteUser";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  avatar?: Maybe<Scalars["String"]>;
};

export type Video = {
  __typename?: "Video";
  id: Scalars["ID"];
  title: Scalars["String"];
  url: Scalars["String"];
};

export type Blog = {
  __typename?: "Blog";
  id: Scalars["ID"];
  title: Scalars["String"];
  content: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  category: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Studio = {
  __typename?: "Studio";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  website: Scalars["String"];
  telephone: Scalars["String"];
  address: Address;
  coordinates: Coordinates;
  approved: Scalars["Boolean"];
};

export type Address = {
  __typename?: "Address";
  street: Scalars["String"];
  zip: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
};

export type Coordinates = {
  __typename?: "Coordinates";
  long: Scalars["String"];
  lat: Scalars["String"];
};

export type Genre = {
  __typename?: "Genre";
  id: Scalars["ID"];
  name: Scalars["String"];
  title: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
};

export type ChatSortInput = {
  direction?: Maybe<SortDirections>;
  field?: Maybe<ChatSortField>;
};

export enum ChatSortField {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
}

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  user: ChatUser;
  receiver: ChatUser;
  text: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  video?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
};

export type ChatUser = {
  __typename?: "ChatUser";
  name: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  updateUser: User;
  updateUserFavourites: User;
  createVideo: Video;
  createSong: Song;
  createBlog: Blog;
  deleteBlog: Blog;
  createStudio: Studio;
  approveStudio: Studio;
  updateStudio: Studio;
  createGenre: Genre;
  createMessage: Message;
  search: Search;
  searchUser: User[];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  id: Scalars["String"];
};

export type MutationUpdateUserFavouritesArgs = {
  input: UpdateUserInput;
  id: Scalars["String"];
};

export type MutationCreateVideoArgs = {
  input: CreateVideoInput;
};

export type MutationCreateSongArgs = {
  input: CreateSongInput;
};

export type MutationCreateBlogArgs = {
  input: CreateBlogInput;
};

export type MutationDeleteBlogArgs = {
  id: Scalars["String"];
};

export type MutationCreateStudioArgs = {
  input: CreateStudioInput;
};

export type MutationApproveStudioArgs = {
  approved?: Maybe<Scalars["Boolean"]>;
  studio: Scalars["ID"];
};

export type MutationUpdateStudioArgs = {
  input: UpdateStudioInput;
  id: Scalars["String"];
};

export type MutationCreateGenreArgs = {
  input: CreateGenreInput;
};

export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};

export type MutationSearchArgs = {
  searchText: Scalars["String"];
};

export type MutationSearchUserArgs = {
  searchText: Scalars["String"];
};

export type CreateUserInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  talentCategory: AllowedTalentCategories;
  profileType: AllowedProfiles;
  interests?: Maybe<Scalars["String"][]>;
  favourites?: Maybe<FavouritesInput>;
  songs?: Maybe<Scalars["String"][]>;
  connections?: Maybe<Scalars["String"][]>;
};

export type FavouritesInput = {
  songs?: Maybe<Scalars["String"][]>;
  users?: Maybe<Scalars["String"][]>;
};

export type UpdateUserInput = {
  name?: Maybe<Scalars["String"]>;
  avatar?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  talentCategory?: Maybe<AllowedTalentCategories>;
  profileType?: Maybe<AllowedProfiles>;
  interests?: Maybe<Scalars["String"][]>;
  favourites?: Maybe<FavouritesInput>;
  songs?: Maybe<Scalars["String"][]>;
  connections?: Maybe<Scalars["String"][]>;
};

export type CreateVideoInput = {
  title: Scalars["String"];
  url: Scalars["String"];
};

export type CreateSongInput = {
  title: Scalars["String"];
  url: Scalars["String"];
  img?: Maybe<Scalars["String"]>;
  genre?: Maybe<AllowedGenre>;
  author: Scalars["String"];
};

export type CreateBlogInput = {
  title: Scalars["String"];
  content: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  category: Scalars["String"];
};

export type CreateStudioInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  website: Scalars["String"];
  telephone: Scalars["String"];
  approved: Scalars["Boolean"];
  address: AddressInput;
  coordinates: CoordinatesInput;
};

export type AddressInput = {
  street: Scalars["String"];
  zip: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
};

export type CoordinatesInput = {
  long: Scalars["String"];
  lat: Scalars["String"];
};

export type UpdateStudioInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  website?: Maybe<Scalars["String"]>;
  telephone?: Maybe<Scalars["String"]>;
  approved?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<AddressUpdateInput>;
  coordinates?: Maybe<CoordinatesUpdateInput>;
};

export type AddressUpdateInput = {
  street?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
};

export type CoordinatesUpdateInput = {
  long?: Maybe<Scalars["String"]>;
  lat?: Maybe<Scalars["String"]>;
};

export type CreateGenreInput = {
  name: Scalars["String"];
  title: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
};

export type CreateMessageInput = {
  text: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  video?: Maybe<Scalars["String"]>;
  user: ChatUserInput;
  receiver: ChatUserInput;
};

export type ChatUserInput = {
  name: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type Search = {
  __typename?: "Search";
  users?: Maybe<User[]>;
  blogs?: Maybe<Blog[]>;
  songs?: Maybe<Song[]>;
};

export type Subscription = {
  __typename?: "Subscription";
  newMessage: Message;
};

export type SubscriptionNewMessageArgs = {
  userId: Scalars["String"];
};

export type CreateUserMutationVariables = {
  name: Scalars["String"];
  talentCategory: AllowedTalentCategories;
  profileType: AllowedProfiles;
  id: Scalars["ID"];
};

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & Pick<
    User,
    "name" | "id" | "talentCategory" | "avatar"
  >;
};

export type CreateMessageMutationVariables = {
  text: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  video?: Maybe<Scalars["String"]>;
  user: ChatUserInput;
  receiver: ChatUserInput;
};

export type CreateMessageMutation = { __typename?: "Mutation" } & {
  createMessage: { __typename?: "Message" } & Pick<
    Message,
    "id" | "text" | "image" | "createdAt" | "video"
  >;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
  id: Scalars["String"];
};

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: { __typename?: "User" } & Pick<
    User,
    "name" | "id" | "talentCategory" | "avatar" | "description"
  >;
};

export type CreateSongMutationVariables = {
  input: CreateSongInput;
};

export type CreateSongMutation = { __typename?: "Mutation" } & {
  createSong: { __typename?: "Song" } & Pick<
    Song,
    "id" | "title" | "url" | "img" | "genre"
  >;
};

export type SearchDataMutationVariables = {
  searchText: Scalars["String"];
};

export type SearchDataMutation = { __typename?: "Mutation" } & {
  search: { __typename?: "Search" } & {
    songs?: Maybe<
      ({ __typename?: "Song" } & Pick<
        Song,
        "id" | "title" | "url" | "img" | "genre"
      >)[]
    >;
    users?: Maybe<
      ({ __typename?: "User" } & Pick<
        User,
        "id" | "name" | "avatar" | "talentCategory"
      >)[]
    >;
    blogs?: Maybe<
      ({ __typename?: "Blog" } & Pick<Blog, "id" | "title" | "image">)[]
    >;
  };
};

export type SearchUserMutationVariables = {
  searchText: Scalars["String"];
};

export type SearchUserMutation = { __typename?: "Mutation" } & {
  searchUser: ({ __typename?: "User" } & Pick<
    User,
    "id" | "name" | "avatar" | "talentCategory"
  >)[];
};

export type UpdateUserFavouritesMutationVariables = {
  input: UpdateUserInput;
  id: Scalars["String"];
};

export type UpdateUserFavouritesMutation = { __typename?: "Mutation" } & {
  updateUserFavourites: { __typename?: "User" } & Pick<User, "id" | "name"> & {
      favourites?: Maybe<
        { __typename?: "Favourites" } & {
          users?: Maybe<
            ({ __typename?: "FavouriteUser" } & Pick<
              FavouriteUser,
              "id" | "name"
            >)[]
          >;
          songs?: Maybe<
            ({ __typename?: "Song" } & Pick<Song, "id" | "title">)[]
          >;
        }
      >;
    };
};

export type GetUserQueryVariables = {
  id: Scalars["String"];
};

export type GetUserQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & Pick<User, "name" | "id" | "talentCategory">;
};

export type GetHomePageDataQueryVariables = {};

export type GetHomePageDataQuery = { __typename?: "Query" } & {
  songs: ({ __typename?: "Song" } & Pick<
    Song,
    "id" | "title" | "url" | "img" | "genre" | "createdAt" | "updatedAt"
  > & { author: { __typename?: "Artist" } & Pick<Artist, "id" | "name"> })[];
  blogs: ({ __typename?: "Blog" } & Pick<Blog, "id" | "title" | "image">)[];
  genre: ({ __typename?: "Genre" } & Pick<
    Genre,
    "id" | "name" | "image" | "title"
  >)[];
  producers: ({ __typename?: "User" } & Pick<
    User,
    "name" | "id" | "avatar" | "talentCategory" | "description"
  >)[];
  musicians: ({ __typename?: "User" } & Pick<
    User,
    "name" | "id" | "avatar" | "talentCategory" | "description"
  > & {
      songs?: Maybe<
        ({ __typename?: "Song" } & Pick<Song, "id" | "title" | "url" | "img">)[]
      >;
    })[];
};

export type GetBlogPageDataQueryVariables = {};

export type GetBlogPageDataQuery = { __typename?: "Query" } & {
  blogs: ({ __typename?: "Blog" } & Pick<Blog, "id" | "title" | "image">)[];
};

export type GetArticlePageDataQueryVariables = {
  id: Scalars["String"];
};

export type GetArticlePageDataQuery = { __typename?: "Query" } & {
  blog: { __typename?: "Blog" } & Pick<
    Blog,
    "id" | "title" | "content" | "category"
  >;
};

export type GetFavouritesQueryVariables = {
  id: Scalars["String"];
};

export type GetFavouritesQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & {
    favourites?: Maybe<
      { __typename?: "Favourites" } & {
        users?: Maybe<
          ({ __typename?: "FavouriteUser" } & Pick<
            FavouriteUser,
            "id" | "name" | "avatar"
          >)[]
        >;
        songs?: Maybe<
          ({ __typename?: "Song" } & Pick<
            Song,
            "id" | "title" | "url" | "img" | "genre" | "createdAt" | "updatedAt"
          >)[]
        >;
      }
    >;
  };
};

export type GetProfileQueryVariables = {
  id: Scalars["String"];
};

export type GetProfileQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & Pick<
    User,
    "name" | "avatar" | "description"
  > & {
      favourites?: Maybe<
        { __typename?: "Favourites" } & {
          users?: Maybe<
            ({ __typename?: "FavouriteUser" } & Pick<
              FavouriteUser,
              "id" | "name" | "avatar"
            >)[]
          >;
          songs?: Maybe<
            ({ __typename?: "Song" } & Pick<
              Song,
              | "id"
              | "title"
              | "url"
              | "img"
              | "genre"
              | "createdAt"
              | "updatedAt"
            >)[]
          >;
        }
      >;
      connections?: Maybe<
        ({ __typename?: "FavouriteUser" } & Pick<
          FavouriteUser,
          "id" | "name" | "avatar"
        >)[]
      >;
      songs?: Maybe<
        ({ __typename?: "Song" } & Pick<
          Song,
          "id" | "title" | "url" | "img" | "genre" | "createdAt" | "updatedAt"
        >)[]
      >;
    };
};

export type GetStudiosQueryVariables = {};

export type GetStudiosQuery = { __typename?: "Query" } & {
  studios: ({ __typename?: "Studio" } & Pick<
    Studio,
    "name" | "id" | "description" | "website" | "telephone"
  > & {
      address: { __typename?: "Address" } & Pick<Address, "country">;
      coordinates: { __typename?: "Coordinates" } & Pick<
        Coordinates,
        "lat" | "long"
      >;
    })[];
};

export type GetMessagesQueryVariables = {
  userId: Scalars["String"];
  receiverId: Scalars["String"];
};

export type GetMessagesQuery = { __typename?: "Query" } & {
  messages: ({ __typename?: "Message" } & Pick<
    Message,
    "id" | "createdAt" | "text" | "image" | "video"
  > & {
      user: { __typename?: "ChatUser" } & Pick<
        ChatUser,
        "id" | "name" | "avatar"
      >;
    })[];
};

export type GetGenreQueryVariables = {};

export type GetGenreQuery = { __typename?: "Query" } & {
  genre: ({ __typename?: "Genre" } & Pick<
    Genre,
    "id" | "name" | "title" | "image"
  >)[];
};

export type GetDataForArtistPageQueryVariables = {
  artistId: Scalars["String"];
  id: Scalars["String"];
};

export type GetDataForArtistPageQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & {
    favourites?: Maybe<
      { __typename?: "Favourites" } & {
        users?: Maybe<
          ({ __typename?: "FavouriteUser" } & Pick<FavouriteUser, "id">)[]
        >;
      }
    >;
  };
  artist: { __typename?: "Artist" } & Pick<
    Artist,
    "name" | "avatar" | "description" | "talentCategory"
  > & {
      songs?: Maybe<
        ({ __typename?: "Song" } & Pick<Song, "id" | "title" | "url" | "img">)[]
      >;
    };
};

export type GetAllUserQueryVariables = {};

export type GetAllUserQuery = { __typename?: "Query" } & {
  users: ({ __typename?: "User" } & Pick<
    User,
    "name" | "id" | "avatar" | "talentCategory" | "description"
  >)[];
};

export type SongsByGenreQueryVariables = {
  genre: Scalars["String"];
};

export type SongsByGenreQuery = { __typename?: "Query" } & {
  songsByGenre: ({ __typename?: "Song" } & Pick<
    Song,
    "id" | "title" | "url" | "img" | "genre" | "createdAt" | "updatedAt"
  > & { author: { __typename?: "Artist" } & Pick<Artist, "id" | "name"> })[];
};

export type NewMessageSubscriptionVariables = {
  userId: Scalars["String"];
};

export type NewMessageSubscription = { __typename?: "Subscription" } & {
  newMessage: { __typename?: "Message" } & Pick<
    Message,
    "id" | "text" | "image" | "video" | "createdAt"
  > & {
      user: { __typename?: "ChatUser" } & Pick<
        ChatUser,
        "name" | "id" | "avatar"
      >;
      receiver: { __typename?: "ChatUser" } & Pick<
        ChatUser,
        "name" | "id" | "avatar"
      >;
    };
};

export const CreateUserDocument = gql`
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
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      talentCategory: // value for 'talentCategory'
 *      profileType: // value for 'profileType'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<
  CreateUserMutation
>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const CreateMessageDocument = gql`
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
export type CreateMessageMutationFn = ApolloReactCommon.MutationFunction<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      image: // value for 'image'
 *      video: // value for 'video'
 *      user: // value for 'user'
 *      receiver: // value for 'receiver'
 *   },
 * });
 */
export function useCreateMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CreateMessageDocument, baseOptions);
}
export type CreateMessageMutationHookResult = ReturnType<
  typeof useCreateMessageMutation
>;
export type CreateMessageMutationResult = ApolloReactCommon.MutationResult<
  CreateMessageMutation
>;
export type CreateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;
export const UpdateUserDocument = gql`
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
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserMutation
>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const CreateSongDocument = gql`
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
export type CreateSongMutationFn = ApolloReactCommon.MutationFunction<
  CreateSongMutation,
  CreateSongMutationVariables
>;

/**
 * __useCreateSongMutation__
 *
 * To run a mutation, you first call `useCreateSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSongMutation, { data, loading, error }] = useCreateSongMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSongMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateSongMutation,
    CreateSongMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateSongMutation,
    CreateSongMutationVariables
  >(CreateSongDocument, baseOptions);
}
export type CreateSongMutationHookResult = ReturnType<
  typeof useCreateSongMutation
>;
export type CreateSongMutationResult = ApolloReactCommon.MutationResult<
  CreateSongMutation
>;
export type CreateSongMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateSongMutation,
  CreateSongMutationVariables
>;
export const SearchDataDocument = gql`
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
export type SearchDataMutationFn = ApolloReactCommon.MutationFunction<
  SearchDataMutation,
  SearchDataMutationVariables
>;

/**
 * __useSearchDataMutation__
 *
 * To run a mutation, you first call `useSearchDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchDataMutation, { data, loading, error }] = useSearchDataMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useSearchDataMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SearchDataMutation,
    SearchDataMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SearchDataMutation,
    SearchDataMutationVariables
  >(SearchDataDocument, baseOptions);
}
export type SearchDataMutationHookResult = ReturnType<
  typeof useSearchDataMutation
>;
export type SearchDataMutationResult = ApolloReactCommon.MutationResult<
  SearchDataMutation
>;
export type SearchDataMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SearchDataMutation,
  SearchDataMutationVariables
>;
export const SearchUserDocument = gql`
  mutation searchUser($searchText: String!) {
    searchUser(searchText: $searchText) {
      id
      name
      avatar
      talentCategory
    }
  }
`;
export type SearchUserMutationFn = ApolloReactCommon.MutationFunction<
  SearchUserMutation,
  SearchUserMutationVariables
>;

/**
 * __useSearchUserMutation__
 *
 * To run a mutation, you first call `useSearchUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchUserMutation, { data, loading, error }] = useSearchUserMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useSearchUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SearchUserMutation,
    SearchUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SearchUserMutation,
    SearchUserMutationVariables
  >(SearchUserDocument, baseOptions);
}
export type SearchUserMutationHookResult = ReturnType<
  typeof useSearchUserMutation
>;
export type SearchUserMutationResult = ApolloReactCommon.MutationResult<
  SearchUserMutation
>;
export type SearchUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SearchUserMutation,
  SearchUserMutationVariables
>;
export const UpdateUserFavouritesDocument = gql`
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
export type UpdateUserFavouritesMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserFavouritesMutation,
  UpdateUserFavouritesMutationVariables
>;

/**
 * __useUpdateUserFavouritesMutation__
 *
 * To run a mutation, you first call `useUpdateUserFavouritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserFavouritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserFavouritesMutation, { data, loading, error }] = useUpdateUserFavouritesMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserFavouritesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserFavouritesMutation,
    UpdateUserFavouritesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateUserFavouritesMutation,
    UpdateUserFavouritesMutationVariables
  >(UpdateUserFavouritesDocument, baseOptions);
}
export type UpdateUserFavouritesMutationHookResult = ReturnType<
  typeof useUpdateUserFavouritesMutation
>;
export type UpdateUserFavouritesMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserFavouritesMutation
>;
export type UpdateUserFavouritesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserFavouritesMutation,
  UpdateUserFavouritesMutationVariables
>;
export const GetUserDocument = gql`
  query getUser($id: String!) {
    user(id: $id) {
      name
      id
      talentCategory
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    baseOptions
  );
}
export function useGetUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    baseOptions
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const GetHomePageDataDocument = gql`
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

/**
 * __useGetHomePageDataQuery__
 *
 * To run a query within a React component, call `useGetHomePageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomePageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomePageDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomePageDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >(GetHomePageDataDocument, baseOptions);
}
export function useGetHomePageDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetHomePageDataQuery,
    GetHomePageDataQueryVariables
  >(GetHomePageDataDocument, baseOptions);
}
export type GetHomePageDataQueryHookResult = ReturnType<
  typeof useGetHomePageDataQuery
>;
export type GetHomePageDataLazyQueryHookResult = ReturnType<
  typeof useGetHomePageDataLazyQuery
>;
export type GetHomePageDataQueryResult = ApolloReactCommon.QueryResult<
  GetHomePageDataQuery,
  GetHomePageDataQueryVariables
>;
export const GetBlogPageDataDocument = gql`
  query getBlogPageData {
    blogs {
      id
      title
      image
    }
  }
`;

/**
 * __useGetBlogPageDataQuery__
 *
 * To run a query within a React component, call `useGetBlogPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogPageDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlogPageDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetBlogPageDataQuery,
    GetBlogPageDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetBlogPageDataQuery,
    GetBlogPageDataQueryVariables
  >(GetBlogPageDataDocument, baseOptions);
}
export function useGetBlogPageDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetBlogPageDataQuery,
    GetBlogPageDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetBlogPageDataQuery,
    GetBlogPageDataQueryVariables
  >(GetBlogPageDataDocument, baseOptions);
}
export type GetBlogPageDataQueryHookResult = ReturnType<
  typeof useGetBlogPageDataQuery
>;
export type GetBlogPageDataLazyQueryHookResult = ReturnType<
  typeof useGetBlogPageDataLazyQuery
>;
export type GetBlogPageDataQueryResult = ApolloReactCommon.QueryResult<
  GetBlogPageDataQuery,
  GetBlogPageDataQueryVariables
>;
export const GetArticlePageDataDocument = gql`
  query getArticlePageData($id: String!) {
    blog(id: $id) {
      id
      title
      content
      category
    }
  }
`;

/**
 * __useGetArticlePageDataQuery__
 *
 * To run a query within a React component, call `useGetArticlePageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlePageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlePageDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArticlePageDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetArticlePageDataQuery,
    GetArticlePageDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetArticlePageDataQuery,
    GetArticlePageDataQueryVariables
  >(GetArticlePageDataDocument, baseOptions);
}
export function useGetArticlePageDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetArticlePageDataQuery,
    GetArticlePageDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetArticlePageDataQuery,
    GetArticlePageDataQueryVariables
  >(GetArticlePageDataDocument, baseOptions);
}
export type GetArticlePageDataQueryHookResult = ReturnType<
  typeof useGetArticlePageDataQuery
>;
export type GetArticlePageDataLazyQueryHookResult = ReturnType<
  typeof useGetArticlePageDataLazyQuery
>;
export type GetArticlePageDataQueryResult = ApolloReactCommon.QueryResult<
  GetArticlePageDataQuery,
  GetArticlePageDataQueryVariables
>;
export const GetFavouritesDocument = gql`
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

/**
 * __useGetFavouritesQuery__
 *
 * To run a query within a React component, call `useGetFavouritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavouritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavouritesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFavouritesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetFavouritesQuery,
    GetFavouritesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetFavouritesQuery,
    GetFavouritesQueryVariables
  >(GetFavouritesDocument, baseOptions);
}
export function useGetFavouritesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetFavouritesQuery,
    GetFavouritesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetFavouritesQuery,
    GetFavouritesQueryVariables
  >(GetFavouritesDocument, baseOptions);
}
export type GetFavouritesQueryHookResult = ReturnType<
  typeof useGetFavouritesQuery
>;
export type GetFavouritesLazyQueryHookResult = ReturnType<
  typeof useGetFavouritesLazyQuery
>;
export type GetFavouritesQueryResult = ApolloReactCommon.QueryResult<
  GetFavouritesQuery,
  GetFavouritesQueryVariables
>;
export const GetProfileDocument = gql`
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

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProfileQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProfileQuery,
    GetProfileQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    baseOptions
  );
}
export function useGetProfileLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProfileQuery,
    GetProfileQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetProfileQuery,
    GetProfileQueryVariables
  >(GetProfileDocument, baseOptions);
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<
  typeof useGetProfileLazyQuery
>;
export type GetProfileQueryResult = ApolloReactCommon.QueryResult<
  GetProfileQuery,
  GetProfileQueryVariables
>;
export const GetStudiosDocument = gql`
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

/**
 * __useGetStudiosQuery__
 *
 * To run a query within a React component, call `useGetStudiosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudiosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudiosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStudiosQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetStudiosQuery,
    GetStudiosQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetStudiosQuery, GetStudiosQueryVariables>(
    GetStudiosDocument,
    baseOptions
  );
}
export function useGetStudiosLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetStudiosQuery,
    GetStudiosQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetStudiosQuery,
    GetStudiosQueryVariables
  >(GetStudiosDocument, baseOptions);
}
export type GetStudiosQueryHookResult = ReturnType<typeof useGetStudiosQuery>;
export type GetStudiosLazyQueryHookResult = ReturnType<
  typeof useGetStudiosLazyQuery
>;
export type GetStudiosQueryResult = ApolloReactCommon.QueryResult<
  GetStudiosQuery,
  GetStudiosQueryVariables
>;
export const GetMessagesDocument = gql`
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

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useGetMessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(
    GetMessagesDocument,
    baseOptions
  );
}
export function useGetMessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >(GetMessagesDocument, baseOptions);
}
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<
  typeof useGetMessagesLazyQuery
>;
export type GetMessagesQueryResult = ApolloReactCommon.QueryResult<
  GetMessagesQuery,
  GetMessagesQueryVariables
>;
export const GetGenreDocument = gql`
  query getGenre {
    genre {
      id
      name
      title
      image
    }
  }
`;

/**
 * __useGetGenreQuery__
 *
 * To run a query within a React component, call `useGetGenreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGenreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGenreQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGenreQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetGenreQuery,
    GetGenreQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetGenreQuery, GetGenreQueryVariables>(
    GetGenreDocument,
    baseOptions
  );
}
export function useGetGenreLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetGenreQuery,
    GetGenreQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetGenreQuery, GetGenreQueryVariables>(
    GetGenreDocument,
    baseOptions
  );
}
export type GetGenreQueryHookResult = ReturnType<typeof useGetGenreQuery>;
export type GetGenreLazyQueryHookResult = ReturnType<
  typeof useGetGenreLazyQuery
>;
export type GetGenreQueryResult = ApolloReactCommon.QueryResult<
  GetGenreQuery,
  GetGenreQueryVariables
>;
export const GetDataForArtistPageDocument = gql`
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

/**
 * __useGetDataForArtistPageQuery__
 *
 * To run a query within a React component, call `useGetDataForArtistPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataForArtistPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataForArtistPageQuery({
 *   variables: {
 *      artistId: // value for 'artistId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDataForArtistPageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetDataForArtistPageQuery,
    GetDataForArtistPageQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetDataForArtistPageQuery,
    GetDataForArtistPageQueryVariables
  >(GetDataForArtistPageDocument, baseOptions);
}
export function useGetDataForArtistPageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDataForArtistPageQuery,
    GetDataForArtistPageQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetDataForArtistPageQuery,
    GetDataForArtistPageQueryVariables
  >(GetDataForArtistPageDocument, baseOptions);
}
export type GetDataForArtistPageQueryHookResult = ReturnType<
  typeof useGetDataForArtistPageQuery
>;
export type GetDataForArtistPageLazyQueryHookResult = ReturnType<
  typeof useGetDataForArtistPageLazyQuery
>;
export type GetDataForArtistPageQueryResult = ApolloReactCommon.QueryResult<
  GetDataForArtistPageQuery,
  GetDataForArtistPageQueryVariables
>;
export const GetAllUserDocument = gql`
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

/**
 * __useGetAllUserQuery__
 *
 * To run a query within a React component, call `useGetAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllUserQuery,
    GetAllUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetAllUserQuery, GetAllUserQueryVariables>(
    GetAllUserDocument,
    baseOptions
  );
}
export function useGetAllUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllUserQuery,
    GetAllUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetAllUserQuery,
    GetAllUserQueryVariables
  >(GetAllUserDocument, baseOptions);
}
export type GetAllUserQueryHookResult = ReturnType<typeof useGetAllUserQuery>;
export type GetAllUserLazyQueryHookResult = ReturnType<
  typeof useGetAllUserLazyQuery
>;
export type GetAllUserQueryResult = ApolloReactCommon.QueryResult<
  GetAllUserQuery,
  GetAllUserQueryVariables
>;
export const SongsByGenreDocument = gql`
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

/**
 * __useSongsByGenreQuery__
 *
 * To run a query within a React component, call `useSongsByGenreQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongsByGenreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongsByGenreQuery({
 *   variables: {
 *      genre: // value for 'genre'
 *   },
 * });
 */
export function useSongsByGenreQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SongsByGenreQuery,
    SongsByGenreQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    SongsByGenreQuery,
    SongsByGenreQueryVariables
  >(SongsByGenreDocument, baseOptions);
}
export function useSongsByGenreLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SongsByGenreQuery,
    SongsByGenreQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SongsByGenreQuery,
    SongsByGenreQueryVariables
  >(SongsByGenreDocument, baseOptions);
}
export type SongsByGenreQueryHookResult = ReturnType<
  typeof useSongsByGenreQuery
>;
export type SongsByGenreLazyQueryHookResult = ReturnType<
  typeof useSongsByGenreLazyQuery
>;
export type SongsByGenreQueryResult = ApolloReactCommon.QueryResult<
  SongsByGenreQuery,
  SongsByGenreQueryVariables
>;
export const NewMessageDocument = gql`
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

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewMessageSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    NewMessageSubscription,
    NewMessageSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    NewMessageSubscription,
    NewMessageSubscriptionVariables
  >(NewMessageDocument, baseOptions);
}
export type NewMessageSubscriptionHookResult = ReturnType<
  typeof useNewMessageSubscription
>;
export type NewMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  NewMessageSubscription
>;
