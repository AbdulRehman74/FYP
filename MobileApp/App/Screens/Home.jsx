import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const Home = ({ navigation }) => {
  return (
    // {/* <ScrollView> */}
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.logo}>
          <Image
            style={styles.img2}
            source={require("../../assets/Logo.png")}
          />
          <Text style={styles.logoText}>
            Work
            <Text style={[styles.logoText, styles.logoText2]}>{" Whiz"}</Text>
          </Text>
        </View>
        <View style={styles.menu}>
          <Pressable
          onPress={() =>
            navigation.navigate("Hamburger1", console.log("Fav Pressed"))
          }
          style={styles.hamburger}
          >
            <FontAwesomeIcon icon={faBars} size={34} color="black" />
            </Pressable>
            </View>  
      </View>
      <View style={styles.threButns}>
        <Text style={styles.mainText}>Welcome to Work Whiz</Text>
      </View>
      <View style={styles.poster}>
        <Button
          icon={() => <FontAwesome name="dollar" size={24} color="white" />}
          mode="contained"
          buttonColor="#316B8C"
          onPress={() =>  navigation.navigate('Registration')}
        >
          Earn Money
        </Button>
        <Button
  icon={() => <MaterialCommunityIcons name="briefcase-upload" size={24} color="white" />}
  mode="contained"
  buttonColor="#316B8C"
  onPress={() => navigation.navigate('TaskForm')}
>
  Post a Job
</Button>

      </View>
      <View style={styles.bottomNavBar}>
        <Text style={styles.bannerText}>Need Some Service ?</Text>
      </View>
      <View style={styles.servicesSection}>
        <View style={styles.gridContainer}>
        <Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Gardener');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="cut" size={24} color="black" />
  <Text style={styles.gridItemText}>Gardener</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Mechanic');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="settings" size={24} color="black" />
  <Text style={styles.gridItemText}>Mechanic</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Plumber');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="hammer" size={24} color="black" />
  <Text style={styles.gridItemText}>Plumber</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Tailor');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="shirt" size={24} color="black" />
  <Text style={styles.gridItemText}>Tailor</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Home Service');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="calendar" size={24} color="black" />
  <Text style={styles.gridItemText}>Home Service</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Painter');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="brush" size={24} color="black" />
  <Text style={styles.gridItemText}>Painter</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Car Wash');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="car-sport" size={24} color="black" />
  <Text style={styles.gridItemText}>Car Wash</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Developer');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="code-slash" size={24} color="black" />
  <Text style={styles.gridItemText}>Developer</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Lock Master');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="key" size={24} color="black" />
  <Text style={styles.gridItemText}>Lock Master</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Cooking Service');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="fast-food" size={24} color="black" />
  <Text style={styles.gridItemText}>Cooking Service</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Electrician');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="flash" size={24} color="black" />
  <Text style={styles.gridItemText}>Electrician</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Event Planner');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="book" size={24} color="black" />
  <Text style={styles.gridItemText}>Event Planner</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Editor');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="create" size={24} color="black" />
  <Text style={styles.gridItemText}>Editor</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Photographer');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="camera" size={24} color="black" />
  <Text style={styles.gridItemText}>Photographer</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Security');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="desktop-outline" size={24} color="black" />
  <Text style={styles.gridItemText}>Security</Text>
</Pressable>

<Pressable style={styles.gridItem} onPress={() => {
  AsyncStorage.setItem('selectedService', 'Carpenter');
  navigation.navigate('TaskForm');
}}>
  <Ionicons name="construct" size={24} color="black" />
  <Text style={styles.gridItemText}>Carpenter</Text>
</Pressable>
        </View>
      </View>
    </View>
    // {/* </ScrollView> */}
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "rgb(222, 213, 205)",
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
  hamburger:{

  },
  mainText: {
    color: "#F5F5F5",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
  },
  container: {
    flex: 1,
    // borderColor: "violet",
    // borderWidth: 5,
    backgroundColor: "rgb(222, 213, 205)",
  },
  // NavBar Started
  navBar: {
    flex: 0.14,
    // borderColor: "blue",
    // borderWidth: 1,
    flexDirection: "row",
    // backgroundColor: "#B1ABAB",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 0.8,
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    gap:55,
    marginLeft:10
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
    flex: 0.1,
    // borderColor: "red",
    // borderWidth: 5,
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    justifyContent: "center",
  },
  poster: {
    flex: 0.09,
    // borderColor: "green",
    // borderWidth: 5,
    // backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  servicesSection: {
    flex: 0.6,
    // borderColor: "orange",
    // borderWidth: 5,
    // backgroundColor: "blue",
  },
  bottomNavBar: {
    flex: 0.1,
    // borderColor: "purple",
    // borderWidth: 3,
    // backgroundColor: "pink",
  },
});

export default Home;
// {
//   const data = [
//     { icon: "md-home", text: "Home" },
//     { icon: "md-settings", text: "Settings" },
//     { icon: "md-person", text: "Profile" },
//     { icon: "md-chatbubbles", text: "Chat" },
//     { icon: "md-calendar", text: "Calendar" },
//     { icon: "md-camera", text: "Camera" },
//     { icon: "md-mic", text: "Microphone" },
//     { icon: "md-globe", text: "World" },
//     { icon: "md-rocket", text: "Rocket" },
//     { icon: "md-heart", text: "Heart" },
//     { icon: "md-star", text: "Star" },
//     { icon: "md-book", text: "Book" },
//     // Add more items as needed
//   ];
  
//   export default function App() {
//     return (
//       <View style={styles.gridContainer}>
//         <FlatList
//           data={data}
//           numColumns={3} // Adjust as needed
//           keyExtractor={(item) => item.icon}
//           renderItem={({ item }) => (
//             <Pressable style={styles.gridItem}>
//               <Ionicons name={item.icon} size={24} color="black" />
//               <Text style={styles.gridItemText}>{item.text}</Text>
//             </Pressable>
//           )}
//         />
//       </View>
//     );
//   }
// }
