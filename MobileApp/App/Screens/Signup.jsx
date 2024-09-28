import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform , alert} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import { auth } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const scale = isWeb ? 0.8 : 1;


const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [location, setLocation] = useState({ city: '', province: '', address: '' });

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Location Permission Required',
        'This app requires location permissions to function correctly. Please allow access to continue.',
        [
          { text: 'Cancel', onPress: () => console.log('Permission denied'), style: 'cancel' },
          { text: 'Allow', onPress: () => askPermissionAgain() },
        ],
        { cancelable: false }
      );
    } else {
      getLocationDetails();
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);
  
  const askPermissionAgain = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      getLocationDetails();
    } else {
      // User has denied the permission again, handle accordingly
      Alert.alert('Permission Denied', 'Unfortunately, you will not be able to use this app without granting location access. You need to go to settings > App permissions > Location > Allow');
    }
  };
  
  const getLocationDetails = async () => {
    let loc = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  
    if (address.length > 0) {
      setLocation({
        city: address[0].city || '',
        province: address[0].region || '',
        address: `${address[0].name || ''}, ${address[0].street || ''}, ${address[0].city}, ${address[0].region}`.trim(),
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    }
  };

  const handleSignUp = async () => {
    await fetchLocation(); // Ensure location is fetched before proceeding.
  
    let errorMessages = [];
  
    // Validation checks for all fields.
    if (!username.trim()) errorMessages.push("Username is missing.");
    if (!email.trim()) errorMessages.push("Email is missing.");
    else if (!/\S+@\S+\.\S+/.test(email)) errorMessages.push("Invalid email format.");
    if (!password) errorMessages.push("Password is missing.");
    else if (password.length < 6) errorMessages.push("Password must be at least 6 characters long.");
    if (!mobileNumber.trim()) errorMessages.push("Mobile number is missing.");
    else if (!(/^\+92\d{10}$/.test(mobileNumber) || /^\d{11}$/.test(mobileNumber))) errorMessages.push("Mobile number must be in +92 followed by 10 digits or a normal 11-digit format.");
  
    if (errorMessages.length > 0) {
      Alert.alert("Signup Error", errorMessages.join('\n'));
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // User created, now save the user data including the location.
        const db = getDatabase();
        const userId = userCredential.user.uid; // Unique user ID from Firebase Authentication.
        const fullAddress = location.address; // Full address in one line.
  
        set(ref(db, `users/Customer/${userId}`), { // Use `userId` for unique user entry.
          username: username,
          email: email,
          mobileNumber: mobileNumber,
          location: {
            address: fullAddress,
            city: location.city,
            province: location.province,
            latitude: location.latitude, // Add latitude
            longitude: location.longitude // Add longitude
          }
        })
        .then(() => {
          navigation.navigate('CustomerTabs'); // Navigate or handle post-sign-up logic.
        })
        .catch((error) => {
          console.error("Error writing user data to Realtime Database:", error);
        });
        if (isChecked) {
          // Save credentials if "Remember Me" is checked
          await AsyncStorage.setItem('@savedEmail', email);
          await AsyncStorage.setItem('@savedPassword', password);
        }
      })
      
      .catch(error => {
        Alert.alert("Signup Error", error.message);
      });
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{" Create your"}</Text>
          <Text style={styles.text}>{" Account"}</Text>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={setUsername} // Update the username state
              value={username}
            />
            <FontAwesome
              style={styles.icon}
              name="user-o"
              size={16}
              color="#9e9e9e"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={setEmail} // Update the email state
              value={email}
            />
            <FontAwesome
              style={styles.icon}
              name="envelope-o"
              size={18}
              color="#9e9e9e"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={secureTextEntry}
              onChangeText={setPassword} // Update the password state
              value={password}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.iconEye} // Adjust this if you're keeping the eye icon for toggling password visibility
            >
              <FontAwesome
                name={secureTextEntry ? "eye-slash" : "eye"}
                size={27}
                color="#9e9e9e"
              />
            </TouchableOpacity>
            <FontAwesome
              style={styles.icon}
              name="lock"
              size={18}
              color="#9e9e9e"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              onChangeText={setMobileNumber} // Update the mobile number state
              value={mobileNumber}
            />
            <FontAwesome
              style={styles.icon}
              name="mobile-phone"
              size={18}
              color="#9e9e9e"
            />
          </View>
          <View style={styles.inputWrapper}>
            <View style={styles.checkboxWrapper}>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <FontAwesome
                  style={styles.checkbox}
                  name={isChecked ? "check-square-o" : "square-o"}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>
            <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
              <Text style={styles.signupButtonText}>Sign up</Text>
            </TouchableOpacity>

          </View>

        </View>
        <View style={styles.signInWrapper}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInLink}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "violet",
    padding: isWeb ? '5%' : '3%', // Adjust padding for web
    // borderWidth: 5,
    backgroundColor: "rgb(222, 213, 205)",
  },
  iconEye: {
    position: "absolute",
    right: 20,
    marginTop:20
  },
  text: {
    color: "black",
    fontSize: 40 * scale,
    fontWeight: "bold",
    textAlign: "center",
  },
  textWrapper: {
    marginBottom: 20 * scale,
    flex: 0.4,
    marginTop: 100,
    // borderColor: "pink",
    // borderWidth: 3,
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    // flex: 0.21,
    // borderColor: "blue",
    // borderWidth: 1,
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 25,
    left: 20,
  },
  input: {
    paddingLeft: 40,
    height: 50,
    width: "95%",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
    borderRadius: 15,
    fontSize: 15,
    color: "#000",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  formWrapper: {
    flex: 0.45,
    marginTop: 30,
    // borderColor: "red",
    // borderWidth: 3,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    marginBottom: 40,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 15,
    color: "black",
  },
  signupButton: {
    width: '95%',
    borderRadius: 25,
    backgroundColor: 'rgba(44, 139, 139, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  signupButtonText: {
    padding: 15,
    color: 'white',
    fontSize: 16,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#9e9e9e',
  },
  separatorText: {
    marginHorizontal: 10,
    color: 'black',
  },
  thrdpartyLoginAPI_wrapper: {
    flex: 0.1,
    // borderColor: "yellow",
    // borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  mangIcon: {
    borderWidth: 0.8,
    borderColor: '#f6f6f6',
    // marginVertical: 8,
    width: 80,
    height: 60,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "fff",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  signInWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  signInText: {
    fontSize: 16,
    color: 'black',
  },
  signInLink: {
    fontSize: 16,
    color: 'rgba(44, 139, 139, 0.85)',
  },
});
export default Signup;