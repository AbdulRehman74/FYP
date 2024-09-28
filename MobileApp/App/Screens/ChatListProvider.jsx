import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth } from '../../firebase';

const ChatListProvider = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const currentProviderId = auth.currentUser.uid;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const db = getDatabase();
        const chatsRef = ref(db, 'chats');

        onValue(chatsRef, async (snapshot) => {
          const chats = snapshot.val();
          if (!chats) return;

          const customersList = Object.keys(chats)
            .filter(chatId => chatId.includes(currentProviderId))  // Filter chats related to current provider
            .map(chatId => {
              const [customerId] = chatId.split('_');
              return { id: customerId };
            });

          // Fetch usernames for each customer
          const promises = customersList.map(async customer => {
            const snapshot = await ref(db, `users/Customer/${customer.id}`).get();
            if (snapshot.exists()) {
              customer.name = snapshot.val().username || `Customer ${customer.id}`;
            } else {
              customer.name = `Customer ${customer.id}`;
            }
            return customer;
          });

          const updatedCustomers = await Promise.all(promises);
          setCustomers(updatedCustomers);
        });
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [currentProviderId]);

  const navigateToChat = (customerId) => {
    navigation.navigate('Chat', { providerId: currentProviderId, customerId });
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
        data={customers}
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

export default ChatListProvider;
