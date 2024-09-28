import React from "react";
import { StyleSheet, View, Pressable, Image, FlatList } from "react-native";
import { Avatar, Divider, Text, Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

// Dummy data for the tasks
const tasksData = [
  {
    id: '1',
    title: 'Need Carpenter For Bed',
    location: 'Township, Lahore',
    price: 'Rs 200',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '2',
    title: 'Require Plumber for Sink Repair',
    location: 'Model Town, Lahore',
    price: 'Rs 300',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '3',
    title: 'Electrician Needed for Wiring Issues',
    location: 'Johar Town, Lahore',
    price: 'Rs 250',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '4',
    title: 'Need Carpenter For Bed',
    location: 'Township, Lahore',
    price: 'Rs 200',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '5',
    title: 'Require Plumber for Sink Repair',
    location: 'Model Town, Lahore',
    price: 'Rs 300',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '6',
    title: 'Electrician Needed for Wiring Issues',
    location: 'Johar Town, Lahore',
    price: 'Rs 250',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '7',
    title: 'Need Carpenter For Bed',
    location: 'Township, Lahore',
    price: 'Rs 200',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '8',
    title: 'Require Plumber for Sink Repair',
    location: 'Model Town, Lahore',
    price: 'Rs 300',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '9',
    title: 'Electrician Needed for Wiring Issues',
    location: 'Johar Town, Lahore',
    price: 'Rs 250',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '10',
    title: 'Need Carpenter For Bed',
    location: 'Township, Lahore',
    price: 'Rs 200',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
  {
    id: '11',
    title: 'Require Plumber for Sink Repair',
    location: 'Model Town, Lahore',
    price: 'Rs 300',
    dueDate: '2021-09-30',
    postedBy: 'John Doe',
    taskStatus: 'Open',
  },
];


const Fav = ({ navigation }) => {
  const renderTask = ({ item }) => (
    <View style={styles.task}>
      <View style={styles.taskImage}>
        <Avatar.Image size={50} source={require("../../assets/user.png")} />
      </View>
      <View style={styles.part2}>
        <View style={styles.aboveText}>
          <Ionicons name="list" size={24} color="black" />
          <Text style={styles.taskText}>{item.title}</Text>
        </View>
        <Divider />
        <View style={styles.lowerText}>
          <Ionicons name="location" size={24} color="black" />
          <Text style={styles.taskText}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.part3}>
        <Pressable
          onPress={() => navigation.navigate('TaskDetail', { task: item })}
          style={styles.buttonOpen}
        >
          <Text style={styles.buttonOpenTxt}>Open</Text>
        </Pressable>
        <Pressable
          style={styles.buttonPrice}
        >
          <Text style={styles.buttonPriceTxt}>{item.price}</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {/* NavBar content here */}
      </View>
      <View style={styles.threButns}>
        <Text style={styles.mainText}>My Tasks</Text>
      </View>
      <View style={styles.poster}>
        <Searchbar
          placeholder="Search Tasks"
          elevation={5}
          style={styles.searchBar}
        />
      </View>
      <View style={styles.servicesSection}>
      <FlatList
        data={tasksData}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  part3: {
    flex: 0.26,
    // borderColor: "red",
    // borderWidth: 1,
    // backgroundColor: "orange",
    justifyContent:'center',
    alignItems:'center',
    gap: 1.5,

  },
  buttonPrice: {
    marginVertical: 1,
    backgroundColor: "#D9D9D9",
    width: 80,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  buttonPriceTxt: {
    color: '#0F2E48',
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonOpen: {
    // marginBottom: 1,
    backgroundColor: "rgba(44, 139, 139, 0.65)",
    width: 80,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  buttonOpenTxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',  
  },
  servicesSection: {
    flex: 0.7,
    // gap: 8,
    padding: 8,
    // justifyContent:"space-around"
    // borderColor: "orange",
    // borderWidth: 1,
    // backgroundColor: "blue",
  },
  aboveText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  lowerText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  task: {
    // flex: 0.3,
    // backgroundColor: "#eaeaea",
    // borderColor: "black",
    // borderWidth: 1,
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 8,
    // justifyContent:'space-around',
    
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
    // flexWrap: "wrap",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  taskImage: {
    flex: 0.16,
    // borderColor: "red",
    // borderWidth: 2,
    // backgroundColor: "green",
  },
  part2: {
    flex: 0.58,
    // borderColor: "red",
    // borderWidth: 1,
    // backgroundColor: "yellow",
    gap: 7,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 10,
  },
  gridItem: {
    width: "21%",
    height: "19%",
    // padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridItemText: {
    color: "#555",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  bannerText: {
    color: "#555",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    // backgroundColor: "white",
  },
  img2: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoText: {
    color: "#316B8C",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 35,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 35,
  },
  logoText2: {
    color: "#1E2643",
  },
  mainText: {
    color: "#F5F5F5",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 45,
    textAlign: "center",
    borderRadius: 100,
    width: "97%",
    backgroundColor: "rgba(44, 139, 139, 0.85)",
  },
  container: {
    flex: 1,
    // borderColor: "violet",
    // borderWidth: 2,
    backgroundColor: "#fff",
  },
  // NavBar Started
  navBar: {
    flex: 0.14,
    // borderColor: "blue",
    // borderWidth: 1,
    flexDirection: "row",
    // backgroundColor: "#B1ABAB",
  },
  logo: {
    flex: 0.8,
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 40,
  },
  menu: {
    flex: 0.2,
    // borderColor: "yellow",
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  // NavBar Ended
  threButns: {
    // flex: 0.09,
    // borderColor: "red",
    // borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  poster: {
    flex: 0.11,
    // borderColor: "green",
    // borderWidth: 1,
    // backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomNavBar: {
    flex: 0.1,
    borderColor: "purple",
    borderWidth: 3,
    backgroundColor: "pink",
  }, searchBar: {
    width: "94%",
    borderRadius: 10,
  },
});

export default Fav;