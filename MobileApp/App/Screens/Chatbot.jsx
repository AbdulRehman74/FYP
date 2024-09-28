import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { speak, isSpeakingAsync, stop } from "expo-speech";

import ChatBubble from "./ChatBubble";

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyBfBpLwxpMHudMVT9PdkKEbaWKvQQYnvXQ";

  const handleUserInput = async () => {
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
      // console.log('Response ',response.data);
      // console.log('Responsee ',response.data?.candidates?.[0].content?.parts?.[0]?.text);

      const modelResponse =
        response.data?.candidates?.[0].content?.parts?.[0]?.text || "";
      if (modelResponse) {
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
        // setLoading(false);
      }
    } catch (error) {
      console.error(error);
      console.error(error.response?.data);
      setError("try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = async (text) => {
    console.log('handleSpeak');
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        console.log('speaking');
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeak={() => handleSpeak(item.parts[0].text)}
    />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Chatbot</Text>
        <FlatList
            data={chat}
            renderItem={renderChatItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={userInput}
                onChangeText={setUserInput}
                placeholder="Type a message..."
            />
            <TouchableOpacity style={styles.button} onPress={handleUserInput}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator style={styles.loading} />}
        {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 40,
        color: '#333',
        textAlign: 'center',
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        // padding: 8,
    },
    input: {
        flex: 1,
        height: 40,
        // width: '70%',
        marginRight: 8,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        color: '#333',
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 8,
        marginLeft: 8,
    },
    buttonText: {
        color: 'white',
    },
    loading: {
        padding: 8,
        marginTop:10
    },
    error: {
        padding: 8,
        marginTop: 10,
        color: 'red',
    },

});
