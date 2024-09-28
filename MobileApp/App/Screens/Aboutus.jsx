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
const Aboutus = ({ navigation }) => {
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
            </View>
            <View style={styles.title}>
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
          <Text style={styles.bannerText}>About Us</Text>
        </View>
        <View style={styles.line} />

          <Text style={styles.descriptionTitle}>
            We are here to change people's lifestyle.
          </Text>
           <View style={styles.para2}>
            <Text style={styles.subtext}>A new way of connecting people who are ready to work, with people who need their work done.</Text>
           </View>
            <View style={styles.icons}>
            <Avatar.Image size={80} style={styles.avi} source={require("../../assets/user.png")} />
            <MaterialIcons style={styles.arrowright} name="arrow-forward" size={30} color="black" />
            <View style={styles.iconContainer}>
             <FontAwesome5 name="mobile-alt" size={50} color="black" />
            <FontAwesome5 name="check" size={20} color="black" style={styles.checkIcon} />
             </View>
          </View>
          <View style={styles.para3}>
            <Text style={styles.text}>WorkWhiz is a community platform that connects skilled/unskilled people
             who want to sell their services/time to individual users/household/business.</Text>
          </View>
          <View style={styles.para4}>
            <Text style={styles.text}>Traditional methods that are currently being followed in Pakistan have lot of drawbacks in it.
             Identifying those loopholes we are revolutionizing the way how people outsource their tasks. 
             We are providing an innovative solution to the problems that almost every household and business faces on day to day basis.</Text>
          </View>
          <View style={styles.para5}>
            <Text style={styles.text}>
            WorkWhiz not only empowers people who want to outsource task but 
            provides an equal opportunity to the taskers 
            (People who want to complete different tasks).
           </Text>
          </View>
          <View style={styles.para6}>
            <Text style={styles.text}>
            WorkWhiz is a solution that lets you live an economically stable life by selling your skills to the right people with no capital requirements.
           </Text>
          </View>
            <Text style={styles.subtext2}>WorkWhiz Pvt. Ltd 2018 ©, All rights reserved</Text>
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
    borderColor:"black",
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
    flex: 0.45,
    borderColor: "blue",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
 },
  logo: {
    flex: 0.2,
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
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: "blue",
    marginRight:10
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
    marginTop: 10,
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
  },

  subtext2:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:50,
    textAlign: 'center',
    alignItems: "center",
    fontStyle: "italic",
    paddingLeft:5,
    paddingRight:5
  },

  title:{
    flex:0.6,
    alignItems:"center",
    // borderColor:"green",
    // borderWidth:1
  }

});



export default Aboutus;
