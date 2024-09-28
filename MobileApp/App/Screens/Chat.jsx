import React, { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { auth } from '../../firebase'; // Assuming your Firebase authentication setup

const Chat = ({ route }) => {
  const { customerId, providerId } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = auth.currentUser.uid;
  const chatId = currentUserId === customerId ? `${customerId}_${providerId}` : `${providerId}_${customerId}`;

  useEffect(() => {
    const fetchMessages = () => {
      try {
        const db = getDatabase();
        const messagesRef = ref(db, `chats/${chatId}/messages`);

        onValue(messagesRef, snapshot => {
          const data = snapshot.val() ? Object.values(snapshot.val()) : [];
          const formattedMessages = data.map(message => ({
            _id: message._id,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.user._id,
              name: message.user.name,
              avatar: message.user.avatar,
            },
          })).reverse(); // Reverse the messages to display them in chronological order
          setMessages(formattedMessages);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  const onSend = (newMessages = []) => {
    const db = getDatabase();
    const messagesRef = ref(db, `chats/${chatId}/messages`);

    newMessages.forEach(message => {
      const msg = {
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt.toISOString(),
        user: {
          _id: currentUserId,
          name: auth.currentUser.displayName,
          avatar: auth.currentUser.photoURL,
        },
      };
      push(messagesRef, msg);
    });
  };

  const pickImage = async () => {
    // Implement image picker functionality here
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: currentUserId,
          name: auth.currentUser.displayName,
          avatar: auth.currentUser.photoURL,
        }}
        renderInputToolbar={props => (
          <InputToolbar {...props} />
        )}
        renderSend={props => (
          <Send {...props}>
            <View style={{ marginRight: 10, marginBottom: 5 }}>
              <MaterialIcons name="send" size={28} color="rgba(44, 139, 139, 1)" />
            </View>
          </Send>
        )}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#128C7E',
              },
              left: {
                backgroundColor: "#17a2b83b",
              },
            }}
          />
        )}
        renderAccessory={() => (
          <TouchableOpacity style={{ padding: 10 }} onPress={pickImage}>
            <MaterialIcons name="photo-library" size={24} color="rgba(44, 139, 139, 1)" />
          </TouchableOpacity>
        )}
        alwaysShowSend={true}
      />
    </>
  );
};

const styles = {
  header: {
    marginTop: 0,
    backgroundColor: 'rgba(44, 139, 139, 1)',
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default Chat;
