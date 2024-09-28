import { StyleSheet, View, Pressable,Linking, Text, Image } from "react-native";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Contact = ({ navigation }) => {

    const handlePhonePress = () => {

      Linking.openURL(`tel:03437448204`);
    };
  

    const handleEmailPress = () => {

      Linking.openURL(`mailto:abdullhr01@gmail.com`);
    };
  
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
          <Text style={styles.bannerText}>Contact Us</Text>
        </View>
        <View style={styles.line} />

          <Text style={styles.descriptionTitle}>
          WE'D LOVE TO HELP YOU IN EMAIL OR VIA CALL!
          </Text>
           <View style={styles.para2}>
            <Text style={styles.subtext}>WorkWhiz.pk is helping thousands of people to do business.
             Our customer support team is available from 09:00 am to 05:00 pm (monday to friday), 
             we are passionate about our community platform as well as our members and it shows in the 
             quality of service that we provide. We are always happy to help you in finding the best solutions
              for all your needs. If you have any question about our platform or services contact our support team.</Text>
           </View>
           <Pressable onPress={handlePhonePress} style={styles.contactMethod}>
           <Text style={styles.contactText}>Call Us: 0343-744-8204</Text>
         </Pressable>

         <Pressable onPress={handleEmailPress} style={styles.contactMethod}>
         <Text style={styles.contactText}>Email Us: abdullr01@gmail.comk</Text>
        </Pressable>
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
    flex: 0.37,
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
    flex: 0.2,
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
    paddingTop:20,
    marginLeft:15,
    marginRight:15
  },

  para2:{

    backgroundColor: "rgb(222, 213, 205)",
  },

  subtext:{
    color: 'black',
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
    alignItems: "center",
    fontStyle: "italic",
    marginLeft:15,
    marginRight:15
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

  contactMethod: {
    marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 24,
    color: '#316B8C',
    textDecorationLine: 'underline',
  },

});



export default Contact;
