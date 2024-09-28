import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const reviewDataPositive = [
  {
    id: "1",
    name: "Akiara Nomura",
    avatarUri: "https://i.pravatar.cc/150?img=1",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Excellent service!",
    rating: 5,
  },
  {
    id: "2",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=2",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "6",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=6",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "10",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=10",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "14",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=14",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "18",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=18",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "22",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=22",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "26",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=26",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "30",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=30",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "34",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=34",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "38",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=38",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
  {
    id: "42",
    name: "John Doe",
    avatarUri: "https://i.pravatar.cc/150?img=42",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Great service!",
    rating: 4,
  },
];
const reviewDataNegative = [
  {
    id: "3",
    name: "Jane Doe",
    avatarUri: "https://i.pravatar.cc/150?img=3",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Average service!",
    rating: 2,
  },
  {
    id: "4",
    name: "John Smith",
    avatarUri: "https://i.pravatar.cc/150?img=4",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Fair service!",
    rating: 2,
  },
  {
    id: "5",
    name: "Jane Smith",
    avatarUri: "https://i.pravatar.cc/150?img=5",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Poor service!",
    rating: 1,
  },
  {
    id: "7",
    name: "Jane Doe",
    avatarUri: "https://i.pravatar.cc/150?img=7",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Average service!",
    rating: 2,
  },
  {
    id: "8",
    name: "John Smith",
    avatarUri: "https://i.pravatar.cc/150?img=8",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Fair service!",
    rating: 2,
  },
  {
    id: "9",
    name: "Jane Smith",
    avatarUri: "https://i.pravatar.cc/150?img=9",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Poor service!",
    rating: 1,
  },
  {
    id: "11",
    name: "Jane Doe",
    avatarUri: "https://i.pravatar.cc/150?img=11",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Average service!",
    rating: 2,
  },
  {
    id: "12",
    name: "John Smith",
    avatarUri: "https://i.pravatar.cc/150?img=12",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Fair service!",
    rating: 2,
  },
  {
    id: "13",
    name: "Jane Smith",
    avatarUri: "https://i.pravatar.cc/150?img=13",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Poor service!",
    rating: 1,
  },
  {
    id: "15",
    name: "Jane Doe",
    avatarUri: "https://i.pravatar.cc/150?img=15",
    date: "March 21, 2024",
    timeAgo: "8 hours ago",
    content: "Average service!",
    rating: 2,
  },
];

const ProfileProvider =  ({ navigation }) => {
  const [selectedReviewType, setSelectedReviewType] = useState("positive");
  const [completedTasksCount, setCompletedTasksCount] = useState(120);

  const insets = useSafeAreaInsets();
  // console.log(insets);

  const renderRatingStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <MaterialCommunityIcons
          key={i}
          name={i < rating ? "star" : "star-outline"}
          size={14}
          color={i < rating ? "#FFD700" : "#CCCCCC"}
          style={styles.star}
        />
      );
    }
    return stars;
  };
  return (
    <>

<View style={styles.container}>
      {/* NavBar */}
      <View style={styles.navBar}>
        {/* Logo */}
        <View style={styles.logo}>
          <Image
            style={styles.img}
            source={require("../../assets/Logo.png")}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.logoText}>
            Work<Text style={styles.logoText2}> Whiz</Text>
          </Text>
        </View>
        {/* Menu */}
        <View style={styles.menu}>
          <Pressable onPress={() => navigation.navigate("Hamburger1")}>
            <FontAwesomeIcon icon={faBars} size={34} color="black" />
          </Pressable>
        </View>
      </View>
        <View style={styles.avatarContainer}>
          <Avatar.Text size={70} label="A" style={styles.avatar} />
        </View>

        <View style={styles.reviewToggle}>
          <Text style={styles.taskCompletedText}>Tasks Completed</Text>
          <View style={styles.taskCompletedBox}>
            <TouchableOpacity
              onPress={() => setSelectedReviewType("positive")}
              style={[
                styles.toggleButton,
                selectedReviewType === "positive" && styles.selectedToggle,
              ]}
            >
              <Text style={styles.toggleText}>Positive</Text>
            </TouchableOpacity>
              <Text style={styles.taskCompletedCount}>{completedTasksCount}</Text>
            <TouchableOpacity
              onPress={() => setSelectedReviewType("negative")}
              style={[
                styles.toggleButton,
                selectedReviewType === "negative" && styles.selectedToggle,
              ]}
            >
              <Text style={styles.toggleText}>Negative</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.reviewsContainer}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>Reviews</Text>
          </View>
          <FlatList
            data={
              selectedReviewType === "positive"
                ? reviewDataPositive
                : reviewDataNegative
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingBottom: 240 
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.offerItem}>
                <Image
                  source={{ uri: item.avatarUri }}
                  style={styles.offerAvatar}
                />
                <View style={styles.offerDetails}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.review}>{item.content}</Text>
                  {/* <View style={styles.offerRating}>
                    {[...Array(item.rating)].map((_, index) => (
                      <Ionicons
                        key={index}
                        name="star"
                        size={14}
                        color="#ffc107"
                        style={styles.starRating}
                      />
                    ))}
                  </View> */}
                  <View style={styles.rating}>
                    {renderRatingStars(item.rating)}
                  </View>
                </View>
                <View style={styles.offerDateTime}>
                  <Text style={styles.date}>{item.date}</Text>
                  <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      {/* <View style={{ height: insets.bottom, backgroundColor: 'blue' }} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(222, 213, 205)",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 25,  // Increased padding to give more space
  
  },
  logo: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    flex: 2,
    alignItems: "center",
  },
  menu: {
    flex: 1,
    alignItems: "flex-end",
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 35,
    fontStyle: "italic",
    fontWeight: "700",
    color: "#316B8C",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  logoText2: {
    color: "#1E2643",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 8,
    //  borderColor: "green",
    // borderWidth: 1,
    marginBottom:20
  },
  avatar: {
    backgroundColor: "#ccc",
  },
  reviewToggle: {
    alignItems: "center",
    // justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginHorizontal: 10,

    backgroundColor: "#e0e0e0", // Or any other color
    // marginRight: 8, // Adjust as necessary
  },
  toggleButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    // textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedToggle: {
    backgroundColor: "rgba(44, 139, 139, 0.55)",
    borderColor: "#4caf50",

  },
  toggleText: {
    color: "#555",
    fontWeight: "bold",
    // alignSelf: "center",
  },
  reviewsContainer: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    // height: "100%",
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#17a2b8",
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  offerItem: {
    flexDirection: "row",
    // alignItems: "center",
    // marginVertical: 3,
    // // borderColor: "black",
    // // borderWidth: 1,
    padding: 8,
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  offerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Assuming this is a circular avatar
    // borderColor: "black",
    // borderWidth: 1,
  },
  offerDetails: {
    marginLeft: 10,
    flex: 1, // Take up remaining space
    // borderColor: "black",
    // borderWidth: 1,
  },
  offerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  offerRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  offerDate: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
  starRating: {
    marginRight: 5,
  },
  offerDateTime: {
    // borderColor: "black",
    // borderWidth: 1,
  },
  // avatar: {
  //   // marginRight: 16,
  // },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  rating: {
    flexDirection: "row",
    marginBottom: 4,
  },
  review: {
    fontSize: 14,
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#757575",
  },
  taskCompletedBox: {
    flexDirection: "row",
    // alignContent: 'space-evenly',
    // textAlign: "center",
    gap: 10,
  },
  taskCompletedText: {
    color: "#555",
    fontWeight: "bold",
    marginBottom: 4, // Adjust as necessary
  },
  taskCompletedCount: {
    color: "#2C8B8B",
    fontSize: 18,
    fontWeight: "bold",
    // padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    // borderRadius: 20,
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    
  },
});

export default ProfileProvider;