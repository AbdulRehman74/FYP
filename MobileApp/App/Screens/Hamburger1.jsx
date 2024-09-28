import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const Hamburger1 = ({ navigation }) => {
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
            onPress={() => navigation.navigate('CustomerTabs', { screen: 'Home' })}
            style={styles.hamburger}
          >
            <FontAwesomeIcon icon={faBars} size={34} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.subhead}>
        <Text style={styles.bannerText}>More</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.options}>
        <View style={styles.optionItem}>
          <Pressable onPress={() => navigation.navigate("Aboutus", console.log("Aboutus Pressed"))}>
            <Text style={styles.optionText}>About Us</Text>
          </Pressable>
        </View>
        <View style={styles.optionItem}>
          <Pressable onPress={() => navigation.navigate("Community", console.log("Community Pressed"))}>
            <Text style={styles.optionText}>Community Guidelines</Text>
          </Pressable>
        </View>
        <View style={styles.optionItem}>
          <Pressable onPress={() => navigation.navigate("Terms", console.log("Terms Pressed"))}>
            <Text style={styles.optionText}>Terms and Conditions</Text>
          </Pressable>
        </View>
        <View style={styles.optionItem}>
          <Pressable onPress={() => navigation.navigate("Privacy", console.log("Privacy Pressed"))}>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </Pressable>
        </View>
        <View style={styles.optionItem}>
          <Pressable onPress={() => navigation.navigate("Contact", console.log("Contact Pressed"))}>
            <Text style={styles.optionText}>Contact Us</Text>
          </Pressable>
        </View>
        <View style={styles.optionItem}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.optionText}>Log Out</Text>
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
  hamburger: {

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
    flex: 0.16,
    // borderColor: "blue",
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 0.8,
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 55
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
  subhead: {
    flex: 0.1,
    // borderColor: "red",
    // borderWidth: 5,
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    justifyContent: "center",
  },

  bannerText: {
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
  },

  options: {
    flex: 0.605,
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 100,
    backgroundColor: "rgb(222, 213, 205)"
  },
  about: {
    flex: 0.3,
    backgroundColor: "rgb(222, 213, 205)",
  },


  optionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    justifyContent: "center", // Center vertically
  },
  optionText: {
    fontSize: 30,
    padding: 18,
    textAlign: "center", // Center horizontally
    fontStyle: "italic",
  },

  separator: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "black",
  },

  line: {
    height: 3,
    backgroundColor: "black",
    width: "100%",
  }

});



export default Hamburger1;
