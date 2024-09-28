import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const ChatBubble = ({ role, text, onSpeak }) => {
  // console.log("in chatbuble", role, text);
  return (
    <View
      style={[
        styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeak} style={styles.speakerIcon}>
          <Text>🔊</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 8,
    padding: 15,
    borderRadius: 8,
    maxWidth: "90%",
    position: "relative",
  },
  userChatItem: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-end",
  },
  modelChatItem: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
  },
  chatText: {
    fontSize: 16,
  },
  speakerIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

export default ChatBubble;
