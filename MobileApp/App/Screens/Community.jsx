import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import React from "react";
import {Avatar} from "react-native-paper";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const Community = ({ navigation }) => {
    return (
      <View style={styles.container}>
        {/* NavBar */}
        <View style={styles.navBar}>
          {/* Logo */}
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
          {/* Menu */}
          <View style={styles.menu}>
            <Pressable
              onPress={() => navigation.navigate("Hamburger1")}
              style={styles.hamburger}
            >
              <FontAwesomeIcon icon={faBars} size={34} color="black" />
            </Pressable>
          </View>              
        </View>
        <View style={styles.line} />
  
      
        <View style={styles.subhead}>
          <Text style={styles.bannerText}>Community Guidlines</Text>
        </View>
        <View style={styles.line} />

          <Text style={styles.descriptionTitle}>
            We are here to change people's lifestyle.
          </Text>
          <View style={styles.people}>
            <Image
              style={styles.persons}
              source={require("../../assets/persons.png")}
            />
            <Image
              style={styles.persons}
              source={require("../../assets/persons.png")}
            />
            </View>
          <View style={styles.para3}>
            <Text style={styles.text}>We're passionate about connecting people ready to work with people who need work done.
             As Work-Whiz continues to grow it's important that the community follows guidelines
             that reflect our values and standards of behavior.</Text>
          </View>
          <View style={styles.para4}>
            <Text style={styles.policy}>PRIVACY POLICY </Text>
            <Text style={styles.terms}>TERMS & CONDITIONS </Text>
          </View>
          <View style={styles.para5}>
            <Text style={styles.text2}>
            Policies For Our Community Members
           </Text>
          </View>
          <View style={styles.para6}>
            <Text style={styles.text}>
            Creating a community where all members can enjoy a safe and rewarding.
             Work-Whiz experience requires trust. Being responsible and 
             respectful to others are the building blocks that form our marketplace integrity.
           </Text>
          </View>
          <View style={styles.providers}>
            <Image
              style={styles.service}
              source={require("../../assets/serviceprovider.png")}
            />
            <Text style={styles.cap}>
            Service Provider
           </Text>
            </View>
            <Text style={styles.text3}>
            A member that has offer his services on a task.
           </Text>
            <View style={styles.customers}>
            <Image
              style={styles.customer}
              source={require("../../assets/customer.png")}
            />
            <Text style={styles.cap}>
            Customer
           </Text>
            </View>
            <Text style={styles.text3}>
            A member that has posted a Task.
           </Text>
            <Text style={styles.subtext}>WorkWhiz Pvt. Ltd 2018 ©, All rights reserved</Text>
      </View>
    );
  };
 

const styles = StyleSheet.create({

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
    backgroundColor: "rgb(222, 213, 205)",
  },
  // NavBar Started
  navBar: {
    flex: 0.7,
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
    gap:55
  },
  menu: {
    flex: 0.1,
    // borderColor: "yellow",
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  // NavBar Ended
  subhead: {
    flex: 0.25,
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
    flex: 0.606,
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 100,
    backgroundColor:"white"
  },
  about: {
    flex: 0.3,
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
  },
  
  descriptionTitle: {

    color: 'rgba(90,97,113,255)',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    fontStyle: "italic",
    backgroundColor: "rgb(222, 213, 205)",
  },



  subtext:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    alignItems: "center",
    fontStyle: "italic",
    paddingLeft:5,
    paddingRight:5
  },
 

  checkIcon: {
    position: 'absolute',
  },

  para3:{
    backgroundColor: "rgb(222, 213, 205)",
  },

  para4:{
    backgroundColor: "rgb(222, 213, 205)",
  },

  para5:{
    backgroundColor: "rgb(222, 213, 205)",
  },

  para6:{
    backgroundColor: "rgb(222, 213, 205)",
  },

  text:{
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: "italic",
    marginLeft:10,
    marginRight:10,
    lineHeight:20,
    backgroundColor: "rgb(222, 213, 205)",
  },

  people:{
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
  },

  persons:{
    width:100,
    height:65,
    resizeMode: "contain",
  },

  policy:{
    color: 'rgba(37, 83, 173, 1)', 
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    textDecorationLine: 'underline',
    fontStyle: 'italic', 
    marginLeft: 15,
  },

  terms:{
    color: 'rgba(37, 83, 173, 1)', 
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
    textDecorationLine: 'underline',
    fontStyle: 'italic', 
    marginLeft: 15,
  },

  text2:{
    color: 'rgba(65, 74, 92, 1)', 
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 15,
    marginTop:10,
  },

  providers:{
    flexDirection: "row",
    alignItems:"left",
    marginTop:30,
  },

  customers:{
    flexDirection: "row",
    alignItems:"left",
  },
  
  service:{
    width:100,
    height:65,
    resizeMode: "contain",

  },

  customer:{
    width:100,
    height:65,
    resizeMode: "contain",
  },

  text3:{
    color: 'black', 
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 15,
    fontStyle:"italic"
  },

  cap:{
    color: 'black', 
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 15,
    marginTop:10,
  },

});



export default Community;
