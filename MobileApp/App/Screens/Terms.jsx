// Terms.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  Image
} from 'react-native';
import { Checkbox, Button } from 'react-native-paper';

const Terms = ({ navigation }) => {
  const [agree, setAgree] = useState(false);

  const handleAccept = () => {
    if (agree) {
      // Handle the logic after accepting terms, e.g., navigate to a new screen
      navigation.goBack(); // Or navigation.navigate('YourNextScreen');
    } else {
      alert('Please read and accept the terms and conditions to proceed.');
    }
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

      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>Terms and Conditions</Text>
        
        {/* Insert the terms and conditions text */}
        <Text style={styles.text}>
          <Text style={styles.sectionTitle}>Introduction</Text>{"\n"}
          Welcome to WorkWhiz, a comprehensive platform designed to connect users with a wide range of professional services. By accessing our website or using our application, you agree to be bound by these Terms and Conditions. Please read them carefully.{"\n\n"}

          <Text style={styles.sectionTitle}>Account Registration and Use</Text>{"\n"}
          Eligibility: You must be at least 18 years old to create an account on WorkWhiz.{"\n"}
          Account Security: You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.{"\n"}
          Use of Service: You agree to use WorkWhiz solely for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform.{"\n\n"}

          <Text style={styles.sectionTitle}>Intellectual Property Rights</Text>{"\n"}
          All content displayed on WorkWhiz, including text, graphics, logos, and software, is the property of WorkWhiz or its content suppliers and protected by copyright and intellectual property laws.{"\n\n"}

          <Text style={styles.sectionTitle}>Disclaimers of Warranties</Text>{"\n"}
          WorkWhiz is provided "as is" and "as available" without any warranties, expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.{"\n\n"}

          <Text style={styles.sectionTitle}>Limitation of Liability</Text>{"\n"}
          WorkWhiz or its directors, employees, partners, or agents will not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the platform.{"\n\n"}

          <Text style={styles.sectionTitle}>User-Generated Content</Text>{"\n"}
          You may post reviews, comments, and other content as long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties.{"\n\n"}

          <Text style={styles.sectionTitle}>Termination of Use</Text>{"\n"}
          WorkWhiz reserves the right to terminate your access to the platform without notice if you breach these Terms and Conditions.{"\n\n"}

          <Text style={styles.sectionTitle}>Dispute Resolution</Text>{"\n"}
          These Terms and Conditions are governed by the laws of the jurisdiction where WorkWhiz is headquartered. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts of that jurisdiction.{"\n\n"}

          <Text style={styles.sectionTitle}>Changes to the Terms</Text>{"\n"}
          WorkWhiz reserves the right to make changes to these Terms and Conditions at any time. Your continued use of the platform following any changes indicates your acceptance of the new terms.{"\n\n"}

          <Text style={styles.sectionTitle}>Contact Information</Text>{"\n"}
          For any questions or concerns regarding these Terms and Conditions, please contact us via our official contact methods provided on our platform.{"\n\n"}

          Please check the box below to confirm your acceptance of these terms and conditions.
        </Text>
      </ScrollView>

      <View style={styles.acceptContainer}>
        <Checkbox
          status={agree ? 'checked' : 'unchecked'} // Use status for Checkbox state
          onPress={() => setAgree(!agree)} // Toggle the state
          color='#316B8C' // Optional: Customize the color of the Checkbox
        />
        <Text style={styles.label}>I have read the terms and conditions</Text>
      </View>
      
      <Button
        mode="contained" // Use the contained mode for the Button
        onPress={handleAccept}
        style={styles.button}
        disabled={!agree} // Disable the button if the terms are not agreed
        color='#316B8C' // Optional: Customize the button color
      >
        Accept
      </Button>
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
    // borderColor: "blue",
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:50
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
  container: {
    flex: 1,
backgroundColor: 'rgb(222, 213, 205)',
},
scrollView: {
margin: 20,
},
heading: {
fontSize: 22,
fontWeight: 'bold',
marginBottom: 10,
},
text: {
fontSize: 16,
marginBottom: 10,
},
sectionTitle: {
fontSize: 18,
fontWeight: 'bold',
},
acceptContainer: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
padding: 10,
},
checkbox: {
margin: 8,
},
label: {
fontSize: 16,
},
button: {
backgroundColor: '#316B8C',
padding: 15,
margin: 10,
alignItems: 'center',
borderRadius: 5,
},
buttonText: {
color: 'white',
fontSize: 18,
},
buttonDisabled: {
backgroundColor: '#aaa', // A gray color to indicate the button is disabled
},


});

export default Terms;
