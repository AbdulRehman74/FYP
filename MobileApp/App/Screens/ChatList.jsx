import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth } from '../../firebase'; // Assuming your Firebase authentication setup

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserUid = auth.currentUser.uid;
  const isCustomer = auth.currentUser.isCustomer; // Assuming you have a way to differentiate customer and provider roles

  useEffect(() => {
    const fetchChats = () => {
      try {
        const db = getDatabase();
        const chatsRef = ref(db, 'chats');

        onValue(chatsRef, snapshot => {
          const chatsData = snapshot.val();
          if (!chatsData) {
            setChats([]);
            setLoading(false);
            return;
          }

          const userChats = Object.keys(chatsData)
            .filter(chatId => chatId.includes(currentUserUid))
            .map(chatId => {
              const [customerId, providerId] = chatId.split('_');
              return {
                id: chatId,
                participantId: isCustomer ? providerId : customerId,
                participantType: isCustomer ? 'Provider' : 'Customer',
              };
            });

          setChats(userChats);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching chats:', error);
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUserUid, isCustomer]);

  const renderChatItem = ({ item }) => {
    const participantText = isCustomer ? `Provider ID: ${item.participantId}` : `Customer ID: ${item.participantId}`;

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('Chat', {
          customerId: isCustomer ? currentUserUid : item.participantId,
          providerId: isCustomer ? item.participantId : currentUserUid,
        })}
      >
        <MaterialCommunityIcons name="account-circle" size={40} color="#128C7E" />
        <Text style={styles.participantText}>{participantText}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  participantText: {
    marginLeft: 20,
    fontSize: 16,
  },
});

export default ChatList;
