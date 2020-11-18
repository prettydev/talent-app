import React, { useState, useEffect } from "react";
import { Text, KeyboardAvoidingView } from "react-native";
import ScreenLayout from "../layout/ScreenLayout";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { ApolloClient } from "apollo-boost";
import Header from "./components/Header";
import {
  renderComposer,
  renderInputToolbar,
  renderSend,
} from "./components/InputToolbar";
import { renderBubble, renderMessageText } from "./components/MessageContainer";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
  Message,
  User,
} from "../../generated/types-and-hooks";
import { useApolloClient } from "@apollo/react-hooks";
import { SUBSCRIBE_TO_MESSAGES } from "../../graphql/subscriptions";
import Spinner from "../../components/spinner/Spinner";
import { UserInfo } from "react-native-auth0";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";

interface ChatProps {
  componentId: string;
  client: ApolloClient<any>;
  userInfo: UserInfo;
  artistInfo: User;
}

const Chat = (props: ChatProps) => {
  // console.log("Props",props)
  const [messages, setMessages] = useState<IMessage[] | undefined>();
  const currentUserId = useSelector((state: RootState) => state.user.userId);

  const client = useApolloClient();

  const {
    data: msgData,
    error: msgError,
    loading: msgLoading,
  } = useGetMessagesQuery({
    variables: {
      receiverId: props.artistInfo.id,
      userId: currentUserId,
    },
  });

  const [createNewMessage] = useCreateMessageMutation();
  // console.log("Client",props)

  useEffect(() => {
    const subscription = client
      .subscribe({
        query: SUBSCRIBE_TO_MESSAGES,
        variables: { userId: currentUserId },
      })
      .subscribe({
        next(response) {
          const { newMessage } = response.data;
          if (
            newMessage.receiver.id === currentUserId ||
            newMessage.user.id === currentUserId
          ) {
            // console.log("Message",newMessage)
            setMessages((prevMessages) => {
              return GiftedChat.append(prevMessages, [
                {
                  _id: newMessage.id,
                  text: newMessage.text,
                  createdAt: newMessage.createdAt,
                  user: {
                    _id: newMessage.user.id,
                    name: newMessage.user.name,
                    avatar: newMessage.user.avatar,
                  },
                  image: newMessage.image || "",
                  video: newMessage.video || "",
                },
              ]);
            });
          }
        },
      });
    return () => subscription.unsubscribe();
  }, [client]);

  // console.log("MessageData",msgData)
  // console.log("MessageLoading",msgLoading)

  useEffect(() => {
    if (messages === undefined) {
      const oldMessages = msgData?.messages.map(
        (
          msg: Pick<
            Message,
            "id" | "text" | "user" | "createdAt" | "image" | "video"
          >
        ) => {
          const { user } = msg;
          return {
            _id: msg.id,
            text: msg.text,
            createdAt: msg.createdAt,
            user: {
              _id: user.id,
              name: user.name,
              avatar: user.avatar || "",
            },
            image: msg.image || "",
            video: msg.video || "",
          };
        }
      );
      setMessages(oldMessages);
    }
  }, [msgData]);

  if (msgError) {
    return <Text>Error</Text>;
  }

  if (!msgLoading && !msgData) {
    throw new Error("Data Undefined");
  }

  const onSend = (messageInput: IMessage[]) => {
    // console.log("MESSAGEINPUT",messageInput)
    messageInput.map((message) => {
      createNewMessage({
        variables: {
          user: {
            id: message.user._id.toString(),
            name: message.user.name || "unknown",
            avatar: message.user.avatar?.toString(),
          },
          receiver: {
            id: props.artistInfo.id,
            name: props.artistInfo.name || "unknown",
            avatar: props.artistInfo.avatar,
          },
          text: message.text,
          image: message.image,
          video: message.video,
        },
      });
    });
  };
  // console.log("All_messages",messages)
  return (
    <>
      {msgLoading && <Spinner />}
      {!msgLoading && (
        <ScreenLayout componentId={props.componentId}>
          <Header
            artistInfo={props.artistInfo}
            componentId={props.componentId}
          />
          <GiftedChat
            messages={messages}
            onSend={(messagesInput) => onSend(messagesInput)}
            renderComposer={renderComposer}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
            // TODO: Verify the props and fetch the data from the DB instead.
            user={{
              _id: currentUserId,
              name: props.userInfo.name,
              avatar: props.userInfo.picture,
            }}
            minInputToolbarHeight={70}
            renderBubble={renderBubble}
            renderMessageText={renderMessageText}
          />
          <KeyboardAvoidingView />
        </ScreenLayout>
      )}
    </>
  );
};

export default Chat;
