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
    onInputSizeChanged={d => console.log(d)}
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
    setMessages([
      {
        _id: 1,
        text: 'Hello sandeep',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(
        previousMessages,
        messages.map(d => ({...d})),
      ),
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
          _id: 1,
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
