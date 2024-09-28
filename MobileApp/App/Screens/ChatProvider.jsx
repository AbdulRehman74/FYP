import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth } from '../../firebase';

const ChatProvider = ({ navigation }) => {
  const [providers, setProviders] = useState([]);
  const currentCustomerId = auth.currentUser.uid;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const db = getDatabase();
        const chatsRef = ref(db, 'chats');

        onValue(chatsRef, async (snapshot) => {
          const chats = snapshot.val();
          if (!chats) return;

          const providersList = Object.keys(chats)
            .filter(chatId => chatId.startsWith(currentCustomerId))  // Filter chats related to current customer
            .map(chatId => {
              const [_, providerId] = chatId.split('_');
              return { id: providerId };
            });

          // Fetch usernames for each provider
          const promises = providersList.map(async provider => {
            const snapshot = await ref(db, `users/Provider/${provider.id}`).get();
            if (snapshot.exists()) {
              provider.name = snapshot.val().username || `Provider ${provider.id}`;
            } else {
              provider.name = `Provider ${provider.id}`;
            }
            return provider;
          });

          const updatedProviders = await Promise.all(promises);
          setProviders(updatedProviders);
        });
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [currentCustomerId]);

  const navigateToChat = (providerId) => {
    navigation.navigate('Chat', { customerId: currentCustomerId, providerId });
  };

  const renderChatItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigateToChat(item.id)}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
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
        data={providers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color="white"
            />
            <Text style={styles.headerText}>Messages</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="white"
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#17a2b8',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dee2e6',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatProvider;
