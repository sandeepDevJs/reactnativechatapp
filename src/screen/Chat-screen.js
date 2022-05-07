/* eslint-disable prettier/prettier */
import React, {useState, useCallback, useEffect} from 'react';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import {Input, IconButton, ChevronRightIcon} from 'native-base';
import {ImageBackground, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const user_id = 404;
const vendor_id = 302;

const ChatBubble = props => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: '#b53030',
      },
    }}
  />
);

const CustomComposer = props => (
  <Composer
    {...props}
    textInputStyle={{
      backgroundColor: 'white',
      borderRadius: 50,
      fontSize: 20,
      height: 40,
      width: '80%',
      padding: 7,
      marginRight: 4,
      marginBottom: 7,
    }}
  />
);

const image = {
  uri: 'https://i.pinimg.com/originals/4d/ee/65/4dee65d05bdbe09c669afcecc9fd8b20.jpg',
};

const ComposerToolBar = props => (
  <InputToolbar
    {...props}
    primaryStyle={{
      marginHorizontal: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    }}
    containerStyle={{
      backgroundColor: 'transparent',
      borderColor: 'red',
      borderTopWidth: 0,
    }}
  />
);

const CustomSend = props => (
  <Send {...props}>
    <View
      style={{
        backgroundColor: '#b53030',
        paddingHorizontal: 8,
        borderRadius: 50,
      }}>
      <ChevronRightIcon size="sm" color="white" marginY={4} paddingX={4} />
    </View>
  </Send>
);

export function Example() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const doc_id = `${vendor_id}-${user_id}`;
    const msgRef = firestore()
      .collection('chatrooms')
      .doc(doc_id)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    msgRef.onSnapshot(querySnap => {
      const allMsgs = querySnap.docs.map(docSnap => {
        let data = docSnap.data();

        if (data.createdAt) {
          return {
            ...data,
            createdAt: data.createdAt.toDate(),
          };
        }
        return {
          ...data,
          createdAt: new Date(),
        };
      });

      setMessages(allMsgs);
    });
  }, []);

  const onSend = useCallback((messageArr = []) => {
    const msgObj = messageArr[0];

    if (!msgObj) {
      return null;
    }

    const message = {
      ...msgObj,
      createdAt: new Date(),
      sent: true,
      received: false,
      pending: false,
      sentBy: 'vendor',
      receivedBy: 'user',
    };

    const doc_id = `${vendor_id}-${user_id}`;

    firestore()
      .collection('chatrooms')
      .doc(doc_id)
      .collection('messages')
      .add({...message, createdAt: firestore.FieldValue.serverTimestamp()});

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  return (
    <ImageBackground
      source={image}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
      resizeMode="cover">
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user_id,
        }}
        alwaysShowSend
        renderBubble={ChatBubble}
        renderAvatar={null}
        renderComposer={CustomComposer}
        renderInputToolbar={ComposerToolBar}
        renderSend={CustomSend}
        listViewProps={{
          style: {
            maxHeight: '98%',
          },
        }}
      />
    </ImageBackground>
  );
}

export default Example;
