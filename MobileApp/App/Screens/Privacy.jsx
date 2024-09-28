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
const Privacy = ({ navigation }) => {
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
          <Text style={styles.bannerText}>Privacy Policy</Text>
        </View>
        <View style={styles.line} />

          <Text style={styles.descriptionTitle}>
            Our Privacy Policy
          </Text>
           <View style={styles.para2}>
            <Text style={styles.text}>This Privacy Policy describes how Work-Whiz handles your personal information and sets out the rights and obligations
             that both you and Work-Whiz have in relation to your personal information.By accessing www.WorkWhiz.pk (the "Site") you accept and agree to the 
             terms and conditions of Work-Whiz user agreement ("User Agreement"), which includes your consent to, and authorization of, the collection, 
             use and disclosure of your personal information in accordance with this Privacy Policy.</Text>
           </View>
          <View style={styles.para3}>
            <Text style={styles.descriptionTitle}>Collection and Use of Your Personal Information</Text>
          </View>
          <View style={styles.para4}>
            <Text style={styles.text}>WorkWhiz provides a unique, innovative, community-based online outsourcing service.
             A failure by you to provide information requested by us may mean that
              We are unable to provide some or all of our services to you.</Text>
          </View>
          <View style={styles.para5}>
            <Text style={styles.text}>
            If you have concerns about how We handle your personal information or require further information, please email WorkWhiz using the contact form provided on the Site.
             If you make a formal written complaint in relation to our compliance with this Privacy Policy, the only information about you that We will post publicly is your WorkWhiz public profile.
           </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.subtext}>WorkWhiz Pvt. Ltd 2018 ©, All rights reserved</Text>
          </View>
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
    flex: 0.5,
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
    fontSize: 20,
    textAlign: 'center',
    fontStyle: "italic",
    backgroundColor: "rgb(222, 213, 205)",
    paddingTop:20
  },

  para2:{

    backgroundColor: "rgb(222, 213, 205)",
  },

  subtext:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 30,
    textAlign: 'center',
    alignItems: "center",
    fontStyle: "italic",
    paddingLeft:5,
    paddingRight:5
  },
 
  icons:{
    flexDirection: 'row',   
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: "rgb(222, 213, 205)"   
  },
  
  avi: {
    marginRight:140,
    position:"relative",
    marginTop:10
  },

  arrowright:{
    position:"absolute"
  },

  iconContainer: {
    width: 50, 
    height: 50, 
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
  }

});



export default Privacy;
